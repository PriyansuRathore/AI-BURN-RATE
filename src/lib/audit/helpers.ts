import { pricingCatalog } from "@/data/pricing";
import type { ToolId } from "@/types/audit";

export function getPlanPrice(toolId: ToolId, plan: string): number {
  const price = pricingCatalog[toolId].find((entry) => entry.plan === plan);
  return price?.monthlyPrice ?? 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
