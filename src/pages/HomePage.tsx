import { useEffect, useState } from "react";
import { AuditForm } from "@/components/AuditForm";
import { AuditResults } from "@/components/AuditResults";
import { Hero } from "@/components/Hero";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SharePreviewCard } from "@/components/SharePreviewCard";
import { runAudit } from "@/lib/audit/engine";
import { loadDraft, saveDraft } from "@/lib/storage/localAudit";
import { createShareId } from "@/lib/share/slug";
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
  const [shareId, setShareId] = useState("");

  useEffect(() => {
    saveDraft(input);
  }, [input]);

  return (
    <main className="page-shell">
      <Hero />
      <AuditForm
        value={input}
        onChange={setInput}
        onSubmit={() => {
          const audit = runAudit(input);
          setResult(audit);
          setShareId(createShareId());
        }}
      />

      {result ? (
        <>
          <AuditResults result={result} summary={buildFallbackSummary(result)} />
          <SharePreviewCard shareId={shareId} />
          <LeadCaptureForm />
        </>
      ) : null}
    </main>
  );
}
