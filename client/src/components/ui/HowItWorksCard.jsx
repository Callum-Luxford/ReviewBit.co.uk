export default function HowItWorksCard({
  image,
  title,
  children,
  accent = "terminal-card-green",
  step = "STEP_01",
}) {
  return (
    <article className={["terminal-card-shell", accent].join(" ")}>
      <div className="terminal-how-card-inner">
        <div className="terminal-how-icon-wrap">
          <div
            className="terminal-how-icon"
            style={{ "--icon-mask": `url(${image})` }}
          />
        </div>

        <div className="terminal-card-kicker">{step}</div>

        <h3 className="terminal-how-title">{title}</h3>

        <p className="terminal-how-copy">{children}</p>
      </div>
    </article>
  );
}
