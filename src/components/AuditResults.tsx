import { formatCurrency } from "@/lib/audit/helpers";
import type { AuditResult } from "@/types/audit";
import { RecommendationCard } from "./RecommendationCard";

interface AuditResultsProps {
  result: AuditResult;
  summary: string;
}

export function AuditResults({ result, summary }: AuditResultsProps) {
  return (
    <section className="panel results">
      <div className="results__hero">
        <div>
          <p className="eyebrow">Estimated savings</p>
          <h2>{formatCurrency(result.totals.monthlySavings)} per month</h2>
          <p>{formatCurrency(result.totals.annualSavings)} per year</p>
        </div>
        <p className="lead-message">{result.leadMessage}</p>
      </div>

      <div className="summary-box">
        <p className="eyebrow">Personalized summary</p>
        <p>{summary}</p>
      </div>

      <div className="recommendation-grid">
        {result.recommendations.map((recommendation) => (
          <RecommendationCard
            key={`${recommendation.toolId}-${recommendation.currentPlan}`}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}
