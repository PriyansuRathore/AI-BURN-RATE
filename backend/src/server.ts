import "dotenv/config";
import cors from "cors";
import express from "express";
import { nanoid } from "nanoid";
import { z } from "zod";
import { sendAuditConfirmation } from "./email.js";
import { isRateLimited } from "./rateLimit.js";
import { generateSummary } from "./summary.js";
import { getAuditById, getPublicReport, saveAudit, saveLead } from "./store.js";
import type { AuditResult } from "./types.js";

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(
  cors({
    origin: process.env.APP_PUBLIC_URL?.split(",") ?? true,
  }),
);
app.use(express.json({ limit: "1mb" }));

const toolIdSchema = z.enum([
  "cursor",
  "github-copilot",
  "claude",
  "chatgpt",
  "anthropic-api",
  "openai-api",
  "gemini",
  "windsurf",
]);

const toolInputSchema = z.object({
  toolId: toolIdSchema,
  plan: z.string(),
  monthlySpend: z.number().nonnegative(),
  seats: z.number().int().positive(),
});

const auditInputSchema = z.object({
  teamSize: z.number().int().positive(),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
  tools: z.array(toolInputSchema).min(1),
});

const auditResultSchema: z.ZodType<AuditResult> = z.object({
  input: auditInputSchema,
  recommendations: z.array(
    z.object({
      toolId: toolIdSchema,
      currentPlan: z.string(),
      currentSpend: z.number(),
      recommendedPlan: z.string(),
      recommendedSpend: z.number(),
      action: z.enum(["keep", "downgrade", "switch", "credits"]),
      monthlySavings: z.number(),
      annualSavings: z.number(),
      reason: z.string(),
    }),
  ),
  totals: z.object({
    currentMonthlySpend: z.number(),
    recommendedMonthlySpend: z.number(),
    monthlySavings: z.number(),
    annualSavings: z.number(),
  }),
  leadMessage: z.string(),
});

const createAuditSchema = z.object({
  input: auditInputSchema,
  result: auditResultSchema,
  summary: z.string().optional(),
});

const createLeadSchema = z.object({
  auditId: z.string().min(1),
  email: z.email(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().int().positive().optional(),
  honeypot: z.string().optional(),
});

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/summary", async (request, response) => {
  const parsed = auditResultSchema.safeParse(request.body?.result);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid audit result payload" });
    return;
  }

  const summary = await generateSummary(parsed.data);
  response.json({ summary });
});

app.post("/api/audits", async (request, response) => {
  const parsed = createAuditSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid audit payload" });
    return;
  }

  const summary = parsed.data.summary || (await generateSummary(parsed.data.result));
  const audit = await saveAudit({
    id: nanoid(12),
    shareId: nanoid(10),
    createdAt: new Date().toISOString(),
    input: parsed.data.input,
    result: parsed.data.result,
    summary,
  });

  response.status(201).json({
    auditId: audit.id,
    shareId: audit.shareId,
    summary: audit.summary,
    publicUrl: `${process.env.APP_PUBLIC_URL ?? "http://localhost:5173"}/results/${audit.shareId}`,
  });
});

app.get("/api/reports/:shareId", async (request, response) => {
  const report = await getPublicReport(request.params.shareId);
  if (!report) {
    response.status(404).json({ error: "Report not found" });
    return;
  }

  response.json(report);
});

app.post("/api/leads", async (request, response) => {
  const parsed = createLeadSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid lead payload" });
    return;
  }

  if (parsed.data.honeypot) {
    response.status(400).json({ error: "Spam detected" });
    return;
  }

  const ipKey = request.ip ?? "unknown";
  if (isRateLimited(ipKey) || isRateLimited(parsed.data.email.toLowerCase(), 3)) {
    response.status(429).json({ error: "Too many submissions. Try again later." });
    return;
  }

  const audit = await getAuditById(parsed.data.auditId);
  if (!audit) {
    response.status(404).json({ error: "Audit not found" });
    return;
  }

  const lead = await saveLead({
    id: nanoid(12),
    auditId: parsed.data.auditId,
    email: parsed.data.email,
    companyName: parsed.data.companyName,
    role: parsed.data.role,
    teamSize: parsed.data.teamSize,
    createdAt: new Date().toISOString(),
  });

  const emailStatus = await sendAuditConfirmation(audit, lead);
  response.status(201).json({
    ok: true,
    leadId: lead.id,
    emailStatus,
  });
});

app.listen(port, () => {
  console.log(`AI Burn Rate backend listening on http://localhost:${port}`);
});
