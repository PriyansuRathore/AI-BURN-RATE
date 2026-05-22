interface SharePreviewCardProps {
  shareId: string;
}

export function SharePreviewCard({ shareId }: SharePreviewCardProps) {
  const shareUrl = `${window.location.origin}/results/${shareId}`;

  return (
    <section className="panel share-card">
      <div className="panel__header">
        <h2>Shareable result URL</h2>
        <p>This public view should strip private lead details and keep the stack + savings visible.</p>
      </div>
      <code>{shareUrl}</code>
    </section>
  );
}
