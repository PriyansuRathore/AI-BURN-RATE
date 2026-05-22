import { useCasePreferredAlternatives } from "@/data/pricing";
import { toolCatalog } from "@/data/tools";
import type { AuditInput, ToolRecommendation, ToolSpendInput } from "@/types/audit";
import { getPlanPrice } from "./helpers";

const smallerPlanByTool: Partial<Record<ToolSpendInput["toolId"], string>> = {
  cursor: "Pro",
  "github-copilot": "Individual",
  claude: "Pro",
  chatgpt: "Plus",
  gemini: "Pro",
  windsurf: "Pro",
};

const nonEnterprisePlanByTool: Partial<Record<ToolSpendInput["toolId"], string>> = {
  cursor: "Business",
  "github-copilot": "Business",
  claude: "Team",
  chatgpt: "Team",
  gemini: "Pro",
  windsurf: "Teams",
};

function buildKeepRecommendation(tool: ToolSpendInput): ToolRecommendation {
  return {
    toolId: tool.toolId,
    currentPlan: tool.plan,
    currentSpend: tool.monthlySpend,
    recommendedPlan: tool.plan,
    recommendedSpend: tool.monthlySpend,
    action: "keep",
    monthlySavings: 0,
    annualSavings: 0,
    reason: "Your current plan looks aligned with the team size and use case you entered.",
  };
}

export function recommendForTool(input: AuditInput, tool: ToolSpendInput): ToolRecommendation {
  const catalogEntry = toolCatalog.find((entry) => entry.id === tool.toolId);
  if (!catalogEntry) {
    return buildKeepRecommendation(tool);
  }

  const seatPrice = getPlanPrice(tool.toolId, tool.plan);
  const expectedRetail = seatPrice * Math.max(tool.seats, 1);
  const alternative = useCasePreferredAlternatives[input.useCase];

  if (tool.seats <= 2 && (tool.plan === "Business" || tool.plan === "Team")) {
    const recommendedPlan = smallerPlanByTool[tool.toolId] ?? tool.plan;
    const recommendedSpend = getPlanPrice(tool.toolId, recommendedPlan) * Math.max(tool.seats, 1);
    const monthlySavings = Math.max(tool.monthlySpend - recommendedSpend, 0);
    return {
      toolId: tool.toolId,
      currentPlan: tool.plan,
      currentSpend: tool.monthlySpend,
      recommendedPlan,
      recommendedSpend,
      action: "downgrade",
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason: "Small teams usually do not need the admin overhead of a team plan if individual seats cover the same daily workflow.",
    };
  }

  if (tool.plan === "Enterprise" && tool.seats < 10) {
    const recommendedPlan = nonEnterprisePlanByTool[tool.toolId] ?? tool.plan;
    const recommendedSpend = getPlanPrice(tool.toolId, recommendedPlan) * Math.max(tool.seats, 1);
    const monthlySavings = Math.max(tool.monthlySpend - recommendedSpend, 0);
    return {
      toolId: tool.toolId,
      currentPlan: tool.plan,
      currentSpend: tool.monthlySpend,
      recommendedPlan,
      recommendedSpend,
      action: "downgrade",
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason: "Enterprise plans usually pay off only when you need procurement, security review, or broad policy control across a larger org.",
    };
  }

  if (
    alternative.toolId !== tool.toolId &&
    tool.monthlySpend > alternative.monthlyPrice * Math.max(tool.seats, 1) * 1.8
  ) {
    const recommendedSpend = alternative.monthlyPrice * Math.max(tool.seats, 1);
    const monthlySavings = Math.max(tool.monthlySpend - recommendedSpend, 0);
    return {
      toolId: tool.toolId,
      currentPlan: tool.plan,
      currentSpend: tool.monthlySpend,
      recommendedPlan: `${toolCatalog.find((entry) => entry.id === alternative.toolId)?.label} ${alternative.plan}`,
      recommendedSpend,
      action: "switch",
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason: alternative.reason,
    };
  }

  if (expectedRetail > 0 && tool.monthlySpend >= expectedRetail * 1.2) {
    const creditedSpend = Math.round(tool.monthlySpend * 0.8);
    const monthlySavings = tool.monthlySpend - creditedSpend;
    return {
      toolId: tool.toolId,
      currentPlan: tool.plan,
      currentSpend: tool.monthlySpend,
      recommendedPlan: `${tool.plan} via credits`,
      recommendedSpend: creditedSpend,
      action: "credits",
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason: "You appear to be paying above benchmark retail, which makes discounted credit procurement worth evaluating.",
    };
  }

  return buildKeepRecommendation(tool);
}
