import type { AuditResult } from "@/types/audit";

export function buildFallbackSummary(result: AuditResult): string {
  if (result.totals.monthlySavings <= 0) {
    return "Your current AI stack looks reasonably efficient for the size and use case you described, so the recommendation is to keep the setup stable and recheck pricing when your team or usage changes.";
  }

  return `You are currently spending ${result.totals.currentMonthlySpend} per month on AI tooling, and this audit estimates that you could trim roughly ${result.totals.monthlySavings} per month without losing core capability. The biggest gains come from rightsizing plan tiers, consolidating overlapping tools, and evaluating discounted credits when retail pricing is materially above benchmark.`;
}
