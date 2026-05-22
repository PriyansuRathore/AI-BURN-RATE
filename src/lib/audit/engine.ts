import type { AuditInput, AuditResult } from "@/types/audit";
import { recommendForTool } from "./rules";

export function runAudit(input: AuditInput): AuditResult {
  const recommendations = input.tools.map((tool) => recommendForTool(input, tool));
  const currentMonthlySpend = input.tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
  const recommendedMonthlySpend = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.recommendedSpend,
    0,
  );
  const monthlySavings = Math.max(currentMonthlySpend - recommendedMonthlySpend, 0);
  const annualSavings = monthlySavings * 12;

  const leadMessage =
    monthlySavings > 500
      ? "There is enough spend here to justify a Credex consultation."
      : monthlySavings < 100
        ? "Your stack looks fairly lean already. We can still notify you when a better optimization appears."
        : "There are practical savings here without disrupting the team too heavily.";

  return {
    input,
    recommendations,
    totals: {
      currentMonthlySpend,
      recommendedMonthlySpend,
      monthlySavings,
      annualSavings,
    },
    leadMessage,
  };
}
