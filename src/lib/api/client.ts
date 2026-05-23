import type { AuditInput, AuditResult, LeadPayload, PublicAuditReport, SaveAuditResponse } from "@/types/audit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorBody?.error ?? "Request failed");
  }

  return (await response.json()) as T;
}

export async function requestSummary(result: AuditResult): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  });

  const data = await parseJson<{ summary: string }>(response);
  return data.summary;
}

export async function saveAudit(input: AuditInput, result: AuditResult, summary?: string) {
  const response = await fetch(`${API_BASE_URL}/api/audits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, result, summary }),
  });

  return parseJson<SaveAuditResponse>(response);
}

export async function fetchPublicReport(shareId: string) {
  const response = await fetch(`${API_BASE_URL}/api/reports/${shareId}`);
  return parseJson<PublicAuditReport>(response);
}

export async function submitLead(payload: LeadPayload) {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{ ok: boolean; leadId: string; emailStatus: { delivered: boolean; mode: string; detail: string } }>(
    response,
  );
}
