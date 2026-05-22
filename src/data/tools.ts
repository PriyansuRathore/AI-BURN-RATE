import type { ToolCatalogEntry } from "@/types/audit";

export const toolCatalog: ToolCatalogEntry[] = [
  {
    id: "cursor",
    label: "Cursor",
    vendor: "Cursor",
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
  },
  {
    id: "github-copilot",
    label: "GitHub Copilot",
    vendor: "GitHub",
    plans: ["Individual", "Business", "Enterprise"],
  },
  {
    id: "claude",
    label: "Claude",
    vendor: "Anthropic",
    plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    vendor: "OpenAI",
    plans: ["Plus", "Team", "Enterprise", "API direct"],
  },
  {
    id: "anthropic-api",
    label: "Anthropic API",
    vendor: "Anthropic",
    plans: ["API direct"],
  },
  {
    id: "openai-api",
    label: "OpenAI API",
    vendor: "OpenAI",
    plans: ["API direct"],
  },
  {
    id: "gemini",
    label: "Gemini",
    vendor: "Google",
    plans: ["Pro", "Ultra", "API"],
  },
  {
    id: "windsurf",
    label: "Windsurf",
    vendor: "Codeium",
    plans: ["Free", "Pro", "Teams", "Enterprise"],
  },
];
