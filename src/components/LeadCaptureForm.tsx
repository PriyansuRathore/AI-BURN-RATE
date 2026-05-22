import { useState } from "react";

export function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Save this audit</h2>
        <p>Email gate happens after value is shown, just like the brief asked.</p>
      </div>
      {submitted ? (
        <p className="success-message">We would email the audit confirmation from the backend here.</p>
      ) : (
        <form
          className="lead-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
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
          <label className="honeypot" aria-hidden="true">
            Leave blank
            <input tabIndex={-1} autoComplete="off" />
          </label>
          <button className="button" type="submit">
            Email me this audit
          </button>
        </form>
      )}
    </section>
  );
}
