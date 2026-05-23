import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuditResults } from "@/components/AuditResults";
import { fetchPublicReport } from "@/lib/api/client";
import type { PublicAuditReport } from "@/types/audit";

export function PublicReportPage() {
  const { shareId } = useParams();
  const [report, setReport] = useState<PublicAuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadReport() {
      if (!shareId) {
        setError("Missing share id.");
        setLoading(false);
        return;
      }

      try {
        const nextReport = await fetchPublicReport(shareId);
        if (!cancelled) {
          setReport(nextReport);
          setError("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Could not load report.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadReport();

    return () => {
      cancelled = true;
    };
  }, [shareId]);

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">Public report</p>
        <h1>Shared AI spend audit</h1>
        {loading ? <p>Loading report...</p> : null}
        {error ? <p>{error}</p> : null}
        {report ? (
          <>
            <p>
              Generated on <code>{new Date(report.createdAt).toLocaleString()}</code>
            </p>
            <AuditResults result={report.result} summary={report.summary} />
          </>
        ) : null}
      </section>
    </main>
  );
}
