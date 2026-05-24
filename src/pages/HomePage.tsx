import { useEffect, useState } from "react";
import { AuditForm } from "@/components/AuditForm";
import { AuditResults } from "@/components/AuditResults";
import { Hero } from "@/components/Hero";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SharePreviewCard } from "@/components/SharePreviewCard";
import { runAudit } from "@/lib/audit/engine";
import { requestSummary, saveAudit } from "@/lib/api/client";
import { loadDraft, saveDraft } from "@/lib/storage/localAudit";
import { buildFallbackSummary } from "@/lib/summary/aiSummary";
import type { AuditInput, AuditResult } from "@/types/audit";

const defaultInput: AuditInput = {
  teamSize: 5,
  useCase: "coding",
  tools: [
    {
      toolId: "cursor",
      plan: "Business",
      monthlySpend: 200,
      seats: 4,
    },
    {
      toolId: "chatgpt",
      plan: "Team",
      monthlySpend: 150,
      seats: 3,
    },
  ],
};

export function HomePage() {
  const [input, setInput] = useState<AuditInput>(() => loadDraft() ?? defaultInput);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [summary, setSummary] = useState("");
  const [auditId, setAuditId] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    saveDraft(input);
  }, [input]);

  async function handleRunAudit() {
    const audit = runAudit(input);
    const fallbackSummary = buildFallbackSummary(audit);
    setError("");
    setResult(audit);
    setSummary(fallbackSummary);
    setIsSaving(true);

    try {
      const aiSummary = await requestSummary(audit);
      setSummary(aiSummary || fallbackSummary);

      const saved = await saveAudit(input, audit, aiSummary || fallbackSummary);
      setAuditId(saved.auditId);
      setPublicUrl(saved.publicUrl);
      setSummary(saved.summary);
    } catch (runError) {
      setSummary(fallbackSummary);
      setPublicUrl("");
      setAuditId("");
      setError(
        runError instanceof Error
          ? `${runError.message}. The audit still ran locally, but backend save failed.`
          : "The audit ran locally, but the backend save failed.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="page-shell__backdrop" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Hero />
      <AuditForm
        value={input}
        onChange={setInput}
        onSubmit={handleRunAudit}
      />

      {result ? (
        <>
          {error ? <section className="panel error-banner">{error}</section> : null}
          <AuditResults result={result} summary={summary} isLoadingSummary={isSaving} />
          {publicUrl ? <SharePreviewCard publicUrl={publicUrl} /> : null}
          {auditId ? <LeadCaptureForm auditId={auditId} /> : null}
        </>
      ) : null}
    </main>
  );
}
