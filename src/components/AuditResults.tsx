import { formatCurrency } from "@/lib/audit/helpers";
import type { AuditResult } from "@/types/audit";
import { RecommendationCard } from "./RecommendationCard";

interface AuditResultsProps {
  result: AuditResult;
  summary: string;
  isLoadingSummary?: boolean;
}

export function AuditResults({ result, summary, isLoadingSummary }: AuditResultsProps) {
  return (
    <section className="panel panel--results results">
      <div className="results__hero">
        <div className="results__headline">
          <p className="eyebrow">Estimated savings</p>
          <h2>{formatCurrency(result.totals.monthlySavings)} per month</h2>
          <p>{formatCurrency(result.totals.annualSavings)} per year</p>
        </div>
        <div className="results__metric-stack">
          <div className="results__metric">
            <span>Current spend</span>
            <strong>{formatCurrency(result.totals.currentMonthlySpend)}/mo</strong>
          </div>
          <div className="results__metric">
            <span>Recommended spend</span>
            <strong>{formatCurrency(result.totals.recommendedMonthlySpend)}/mo</strong>
          </div>
          <div className="results__metric results__metric--message">
            <span>Readout</span>
            <strong>{result.leadMessage}</strong>
          </div>
        </div>
      </div>

      <div className="summary-box">
        <p className="eyebrow">Personalized summary</p>
        <p>{isLoadingSummary ? "Generating personalized summary..." : summary}</p>
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
