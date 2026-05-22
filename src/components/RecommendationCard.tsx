import { toolCatalog } from "@/data/tools";
import { formatCurrency } from "@/lib/audit/helpers";
import type { ToolRecommendation } from "@/types/audit";

interface RecommendationCardProps {
  recommendation: ToolRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const label = toolCatalog.find((entry) => entry.id === recommendation.toolId)?.label ?? recommendation.toolId;

  return (
    <article className="recommendation-card">
      <div className="recommendation-card__top">
        <div>
          <p className="eyebrow">{label}</p>
          <h3>{recommendation.action}</h3>
        </div>
        <strong>{formatCurrency(recommendation.monthlySavings)}/mo saved</strong>
      </div>
      <p>
        {recommendation.currentPlan} at {formatCurrency(recommendation.currentSpend)} to{" "}
        {recommendation.recommendedPlan} at {formatCurrency(recommendation.recommendedSpend)}.
      </p>
      <p>{recommendation.reason}</p>
    </article>
  );
}
