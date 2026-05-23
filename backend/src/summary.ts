import type { AuditResult } from "./types.js";

function buildFallbackSummary(result: AuditResult): string {
  if (result.totals.monthlySavings <= 0) {
    return "Your current AI stack looks efficient for the team profile you entered, so the best move is to hold steady and revisit pricing only when usage or headcount changes.";
  }

  return `This audit suggests you could save about $${result.totals.monthlySavings} per month by rightsizing plans, reducing duplicated tooling, and using discounted credits when you are paying meaningfully above benchmark retail pricing. The largest opportunities come from the tools flagged below, and the recommendations aim to preserve the core workflow your team already relies on.`;
}

export async function generateSummary(result: AuditResult): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return buildFallbackSummary(result);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
        max_tokens: 180,
        messages: [
          {
            role: "user",
            content: `Write a concise 90-120 word founder-facing summary of this AI spend audit. Emphasize defensible savings, not hype. Audit JSON: ${JSON.stringify(result)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return buildFallbackSummary(result);
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((entry) => entry.type === "text")?.text?.trim();
    return text || buildFallbackSummary(result);
  } catch {
    return buildFallbackSummary(result);
  }
}
