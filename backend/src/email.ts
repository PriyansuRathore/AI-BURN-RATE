import type { StoredAudit, StoredLead } from "./types.js";

export async function sendAuditConfirmation(audit: StoredAudit, lead: StoredLead) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resendKey || !from) {
    return {
      delivered: false,
      mode: "skipped",
      detail: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [lead.email],
      subject: "Your AI spend audit is ready",
      html: `<p>Your audit is saved.</p><p>Estimated monthly savings: $${audit.result.totals.monthlySavings}</p><p>Share link: ${process.env.APP_PUBLIC_URL ?? "http://localhost:5173"}/results/${audit.shareId}</p>`,
    }),
  });

  return {
    delivered: response.ok,
    mode: "resend",
    detail: response.ok ? "Email accepted by Resend" : `Resend returned ${response.status}`,
  };
}
