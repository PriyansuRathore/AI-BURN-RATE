export type ToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type PricingUnit = "seat" | "workspace" | "usage";

export interface ToolCatalogEntry {
  id: ToolId;
  label: string;
  plans: string[];
  vendor: string;
}

export interface ToolSpendInput {
  toolId: ToolId;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  teamSize: number;
  useCase: UseCase;
  tools: ToolSpendInput[];
}

export interface ToolRecommendation {
  toolId: ToolId;
  currentPlan: string;
  currentSpend: number;
  recommendedPlan: string;
  recommendedSpend: number;
  action: "keep" | "downgrade" | "switch" | "credits";
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}

export interface AuditTotals {
  currentMonthlySpend: number;
  recommendedMonthlySpend: number;
  monthlySavings: number;
  annualSavings: number;
}

export interface AuditResult {
  input: AuditInput;
  recommendations: ToolRecommendation[];
  totals: AuditTotals;
  leadMessage: string;
}
