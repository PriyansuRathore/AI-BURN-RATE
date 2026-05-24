interface SharePreviewCardProps {
  publicUrl: string;
}

export function SharePreviewCard({ publicUrl }: SharePreviewCardProps) {
  return (
    <section className="panel panel--share share-card">
      <div className="panel__header panel__header--split">
        <div>
          <p className="eyebrow">Viral loop</p>
          <h2>Shareable result URL</h2>
          <p>This public view strips private lead details and keeps the stack + savings visible.</p>
        </div>
        <div className="mini-note">
          <strong>Share behavior</strong>
          <span>Use this public link for screenshots, feedback requests, and founder-to-founder comparison.</span>
        </div>
      </div>
      <div className="share-card__body">
        <code>{publicUrl}</code>
      </div>
    </section>
  );
}
