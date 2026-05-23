interface SharePreviewCardProps {
  publicUrl: string;
}

export function SharePreviewCard({ publicUrl }: SharePreviewCardProps) {
  return (
    <section className="panel share-card">
      <div className="panel__header">
        <h2>Shareable result URL</h2>
        <p>This public view should strip private lead details and keep the stack + savings visible.</p>
      </div>
      <code>{publicUrl}</code>
    </section>
  );
}
