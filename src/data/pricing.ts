import type { ToolId, UseCase } from "@/types/audit";

export interface PlanPrice {
  plan: string;
  monthlyPrice: number;
  notes: string;
}

export const pricingCatalog: Record<ToolId, PlanPrice[]> = {
  cursor: [
    { plan: "Hobby", monthlyPrice: 0, notes: "Free tier for solo testing" },
    { plan: "Pro", monthlyPrice: 20, notes: "Strong fit for individual builders" },
    { plan: "Business", monthlyPrice: 40, notes: "Admin controls for teams" },
    { plan: "Enterprise", monthlyPrice: 60, notes: "Assumed floor for enterprise seat pricing" },
  ],
  "github-copilot": [
    { plan: "Individual", monthlyPrice: 10, notes: "Best fit for one-off dev seats" },
    { plan: "Business", monthlyPrice: 19, notes: "Team management and policy controls" },
    { plan: "Enterprise", monthlyPrice: 39, notes: "Enterprise governance assumption" },
  ],
  claude: [
    { plan: "Free", monthlyPrice: 0, notes: "Low-volume individual access" },
    { plan: "Pro", monthlyPrice: 20, notes: "Single power user" },
    { plan: "Max", monthlyPrice: 100, notes: "Heavy single-user workload assumption" },
    { plan: "Team", monthlyPrice: 30, notes: "Per-seat collaboration plan" },
    { plan: "Enterprise", monthlyPrice: 60, notes: "Enterprise floor assumption" },
    { plan: "API direct", monthlyPrice: 120, notes: "Placeholder API spend benchmark" },
  ],
  chatgpt: [
    { plan: "Plus", monthlyPrice: 20, notes: "Best fit for solo use" },
    { plan: "Team", monthlyPrice: 30, notes: "Best fit for small groups" },
    { plan: "Enterprise", monthlyPrice: 60, notes: "Enterprise seat floor assumption" },
    { plan: "API direct", monthlyPrice: 120, notes: "Placeholder API spend benchmark" },
  ],
  "anthropic-api": [
    { plan: "API direct", monthlyPrice: 120, notes: "Placeholder API spend benchmark" },
  ],
  "openai-api": [
    { plan: "API direct", monthlyPrice: 120, notes: "Placeholder API spend benchmark" },
  ],
  gemini: [
    { plan: "Pro", monthlyPrice: 20, notes: "General solo use" },
    { plan: "Ultra", monthlyPrice: 125, notes: "Premium individual tier assumption" },
    { plan: "API", monthlyPrice: 100, notes: "Placeholder API spend benchmark" },
  ],
  windsurf: [
    { plan: "Free", monthlyPrice: 0, notes: "Light exploration" },
    { plan: "Pro", monthlyPrice: 15, notes: "Solo engineer fit" },
    { plan: "Teams", monthlyPrice: 30, notes: "Shared collaboration tier assumption" },
    { plan: "Enterprise", monthlyPrice: 55, notes: "Enterprise floor assumption" },
  ],
};

export const useCasePreferredAlternatives: Record<UseCase, { toolId: ToolId; plan: string; monthlyPrice: number; reason: string }> = {
  coding: {
    toolId: "github-copilot",
    plan: "Individual",
    monthlyPrice: 10,
    reason: "Coding-heavy teams can often cover baseline completion needs with a cheaper code assistant.",
  },
  writing: {
    toolId: "chatgpt",
    plan: "Plus",
    monthlyPrice: 20,
    reason: "Writing-focused teams usually need strong general-purpose chat more than multi-seat coding tools.",
  },
  data: {
    toolId: "claude",
    plan: "Pro",
    monthlyPrice: 20,
    reason: "Data-heavy workflows often benefit from a smaller number of high-context analyst seats.",
  },
  research: {
    toolId: "claude",
    plan: "Pro",
    monthlyPrice: 20,
    reason: "Research tasks tend to fit a smaller set of premium individual seats well.",
  },
  mixed: {
    toolId: "chatgpt",
    plan: "Team",
    monthlyPrice: 30,
    reason: "Mixed workflows often justify a flexible shared assistant instead of duplicated specialist tools.",
  },
};
