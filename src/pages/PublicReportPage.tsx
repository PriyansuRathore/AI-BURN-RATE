import { useParams } from "react-router-dom";

export function PublicReportPage() {
  const { shareId } = useParams();

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">Public report</p>
        <h1>Share view coming next</h1>
        <p>
          This route is wired and ready for backend-backed public audit retrieval.
          Current placeholder share id: <code>{shareId}</code>
        </p>
      </section>
    </main>
  );
}
