import { useState } from "react";
import { submitLead } from "@/lib/api/client";

interface LeadCaptureFormProps {
  auditId: string;
}

export function LeadCaptureForm({ auditId }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [statusText, setStatusText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="panel panel--accent">
      <div className="panel__header panel__header--split">
        <div>
          <p className="eyebrow">Capture the report</p>
          <h2>Save this audit</h2>
          <p>Email gate happens after value is shown, just like the brief asked.</p>
        </div>
        <div className="mini-note">
          <strong>What gets saved</strong>
          <span>Your email and optional company context, tied to the audit id already created in the backend.</span>
        </div>
      </div>
      {submitted ? (
        <p className="success-message">{statusText}</p>
      ) : (
        <form
          className="lead-form"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            setError("");

            try {
              const result = await submitLead({
                auditId,
                email,
                companyName: companyName || undefined,
                role: role || undefined,
                teamSize: teamSize ? Number(teamSize) : undefined,
                honeypot: "",
              });

              setSubmitted(true);
              setStatusText(
                result.emailStatus.delivered
                  ? "Audit saved and confirmation email sent."
                  : "Audit saved. Email delivery is not configured yet, but the lead was captured.",
              );
            } catch (submissionError) {
              setError(
                submissionError instanceof Error
                  ? submissionError.message
                  : "Could not save your lead right now.",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Company name
            <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
          </label>
          <label>
            Role
            <input value={role} onChange={(event) => setRole(event.target.value)} />
          </label>
          <label>
            Team size
            <input
              type="number"
              min="1"
              value={teamSize}
              onChange={(event) => setTeamSize(event.target.value)}
            />
          </label>
          <label className="honeypot" aria-hidden="true">
            Leave blank
            <input tabIndex={-1} autoComplete="off" />
          </label>
          {error ? <p className="error-message">{error}</p> : null}
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Email me this audit"}
          </button>
        </form>
      )}
    </section>
  );
}
