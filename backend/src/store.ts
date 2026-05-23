import fs from "node:fs";
import path from "node:path";
import { getSupabaseClient } from "./supabase.js";
import type { DatabaseShape, PublicAuditReport, StoredAudit, StoredLead } from "./types.js";

const dataDir = path.resolve(process.cwd(), "backend", "data");
const dbPath = path.join(dataDir, "db.json");

function ensureDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    const initial: DatabaseShape = { audits: [], leads: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
  }
}

function readDb(): DatabaseShape {
  ensureDb();
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw) as DatabaseShape;
}

function writeDb(data: DatabaseShape) {
  ensureDb();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function saveAudit(audit: StoredAudit): Promise<StoredAudit> {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("audits").insert({
      id: audit.id,
      share_id: audit.shareId,
      created_at: audit.createdAt,
      input: audit.input,
      result: audit.result,
      summary: audit.summary,
    });

    if (error) {
      throw new Error(`Supabase audit insert failed: ${error.message}`);
    }

    return audit;
  }

  const db = readDb();
  db.audits.unshift(audit);
  writeDb(db);
  return audit;
}

export async function saveLead(lead: StoredLead): Promise<StoredLead> {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      id: lead.id,
      audit_id: lead.auditId,
      email: lead.email,
      company_name: lead.companyName ?? null,
      role: lead.role ?? null,
      team_size: lead.teamSize ?? null,
      created_at: lead.createdAt,
    });

    if (error) {
      throw new Error(`Supabase lead insert failed: ${error.message}`);
    }

    return lead;
  }

  const db = readDb();
  db.leads.unshift(lead);
  writeDb(db);
  return lead;
}

export async function getPublicReport(shareId: string): Promise<PublicAuditReport | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("audits")
      .select("share_id, created_at, input, result, summary")
      .eq("share_id", shareId)
      .maybeSingle();

    if (error) {
      throw new Error(`Supabase report fetch failed: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      shareId: data.share_id,
      createdAt: data.created_at,
      input: data.input as StoredAudit["input"],
      result: data.result as StoredAudit["result"],
      summary: data.summary,
    };
  }

  const db = readDb();
  const audit = db.audits.find((entry) => entry.shareId === shareId);
  if (!audit) {
    return null;
  }

  return {
    shareId: audit.shareId,
    createdAt: audit.createdAt,
    input: audit.input,
    result: audit.result,
    summary: audit.summary,
  };
}

export async function getAuditById(auditId: string): Promise<StoredAudit | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("audits")
      .select("id, share_id, created_at, input, result, summary")
      .eq("id", auditId)
      .maybeSingle();

    if (error) {
      throw new Error(`Supabase audit lookup failed: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      shareId: data.share_id,
      createdAt: data.created_at,
      input: data.input as StoredAudit["input"],
      result: data.result as StoredAudit["result"],
      summary: data.summary,
    };
  }

  const db = readDb();
  return db.audits.find((entry) => entry.id === auditId) ?? null;
}
