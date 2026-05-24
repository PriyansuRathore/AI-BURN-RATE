import { toolCatalog } from "@/data/tools";
import { formatCurrency } from "@/lib/audit/helpers";
import type { ToolRecommendation } from "@/types/audit";

interface RecommendationCardProps {
  recommendation: ToolRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const label = toolCatalog.find((entry) => entry.id === recommendation.toolId)?.label ?? recommendation.toolId;
  const actionLabel =
    recommendation.action === "keep"
      ? "Keep"
      : recommendation.action === "downgrade"
        ? "Downgrade"
        : recommendation.action === "switch"
          ? "Switch"
          : "Use credits";

  return (
    <article className={`recommendation-card recommendation-card--${recommendation.action}`}>
      <div className="recommendation-card__top">
        <div>
          <p className="eyebrow">{label}</p>
          <h3>{actionLabel}</h3>
        </div>
        <strong className="recommendation-card__savings">
          {formatCurrency(recommendation.monthlySavings)}/mo saved
        </strong>
      </div>
      <p>
        {recommendation.currentPlan} at {formatCurrency(recommendation.currentSpend)} to{" "}
        {recommendation.recommendedPlan} at {formatCurrency(recommendation.recommendedSpend)}.
      </p>
      <p>{recommendation.reason}</p>
    </article>
  );
}
