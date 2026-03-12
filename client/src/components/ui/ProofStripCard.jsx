export default function ProofStripCard({
  title,
  children,
  className = "",
  accent = "terminal-card-green",
  eyebrow = "STEP_01",
  metaLeft = "256 signals",
  metaRight = "Review Ops",
}) {
  return (
    <article className={["terminal-card-shell", accent, className].join(" ")}>
      <div className="terminal-card-inner">
        <div className="terminal-card-kicker">{eyebrow}</div>

        <h3 className="terminal-card-title">{title}</h3>

        <p className="terminal-card-copy">{children}</p>

        <div className="terminal-card-meta">
          <span>{metaLeft}</span>
          <span>{metaRight}</span>
        </div>
      </div>
    </article>
  );
}
