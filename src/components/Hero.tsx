export function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <p className="eyebrow">Credex Assignment Build</p>
        <h1>Find the AI spend your startup should stop paying.</h1>
        <p className="lede">
          Enter the tools your team uses, see where your stack is oversized, and get a
          clear monthly and annual savings estimate in minutes.
        </p>
        <div className="hero__signals">
          <span>No login required</span>
          <span>Shareable audit URLs</span>
          <span>Email gate after value</span>
        </div>
      </div>

      <div className="hero__aside">
        <div className="hero-stat">
          <strong>8</strong>
          <span>AI tool families covered in the MVP input flow</span>
        </div>
        <div className="hero-stat">
          <strong>Rule-based</strong>
          <span>Audit math stays deterministic so recommendations remain finance-defensible</span>
        </div>
        <div className="hero-stat hero-stat--accent">
          <strong>Credex fit</strong>
          <span>High-savings audits can roll directly into discounted credit conversations</span>
        </div>
      </div>
    </section>
  );
}
