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

export interface LeadPayload {
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  honeypot?: string;
}

export interface StoredAudit {
  id: string;
  shareId: string;
  createdAt: string;
  input: AuditInput;
  result: AuditResult;
  summary: string;
}

export interface StoredLead {
  id: string;
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  createdAt: string;
}

export interface PublicAuditReport {
  shareId: string;
  createdAt: string;
  input: AuditInput;
  result: AuditResult;
  summary: string;
}

export interface DatabaseShape {
  audits: StoredAudit[];
  leads: StoredLead[];
}
