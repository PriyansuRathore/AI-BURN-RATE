import type { AuditInput } from "@/types/audit";

const STORAGE_KEY = "ai-burn-rate-audit";

export function loadDraft(): AuditInput | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuditInput;
  } catch {
    return null;
  }
}

export function saveDraft(input: AuditInput): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
}
