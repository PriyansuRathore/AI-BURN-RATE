import { describe, expect, it } from "vitest";
import { runAudit } from "./engine";
import type { AuditInput } from "@/types/audit";

function buildInput(overrides?: Partial<AuditInput>): AuditInput {
  return {
    teamSize: 4,
    useCase: "coding",
    tools: [
      {
        toolId: "cursor",
        plan: "Business",
        monthlySpend: 160,
        seats: 4,
      },
    ],
    ...overrides,
  };
}

describe("runAudit", () => {
  it("downgrades small teams off team plans when individual plans fit", () => {
    const result = runAudit(
      buildInput({
        tools: [
          {
            toolId: "chatgpt",
            plan: "Team",
            monthlySpend: 60,
            seats: 2,
          },
        ],
      }),
    );

    expect(result.recommendations[0].action).toBe("downgrade");
    expect(result.recommendations[0].recommendedPlan).toBe("Plus");
    expect(result.totals.monthlySavings).toBeGreaterThan(0);
  });

  it("downgrades enterprise when seat count is too small", () => {
    const result = runAudit(
      buildInput({
        tools: [
          {
            toolId: "cursor",
            plan: "Enterprise",
            monthlySpend: 240,
            seats: 3,
          },
        ],
      }),
    );

    expect(result.recommendations[0].action).toBe("downgrade");
    expect(result.recommendations[0].recommendedPlan).toBe("Business");
  });

  it("recommends switching when a much cheaper alternative fits the use case", () => {
    const result = runAudit(
      buildInput({
        tools: [
          {
            toolId: "claude",
            plan: "Max",
            monthlySpend: 220,
            seats: 1,
          },
        ],
      }),
    );

    expect(result.recommendations[0].action).toBe("switch");
    expect(result.recommendations[0].monthlySavings).toBeGreaterThan(0);
  });

  it("recommends credits when current spend is materially above benchmark retail", () => {
    const result = runAudit(
      buildInput({
        tools: [
          {
            toolId: "github-copilot",
            plan: "Business",
            monthlySpend: 120,
            seats: 4,
          },
        ],
      }),
    );

    expect(result.recommendations[0].action).toBe("credits");
    expect(result.recommendations[0].recommendedPlan).toContain("credits");
  });

  it("keeps plans when the setup already looks efficient", () => {
    const result = runAudit(
      buildInput({
        tools: [
          {
            toolId: "github-copilot",
            plan: "Individual",
            monthlySpend: 20,
            seats: 2,
          },
        ],
      }),
    );

    expect(result.recommendations[0].action).toBe("keep");
    expect(result.totals.monthlySavings).toBe(0);
  });
});
