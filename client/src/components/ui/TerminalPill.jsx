export default function TerminalPill({ label, accent = "primary" }) {
  return (
    <div className={["terminal-section-pill", `terminal-section-pill--${accent}`].join(" ")}>
      <span className="terminal-section-pill-indicator" aria-hidden="true" />
      <span className="terminal-section-pill-label">{label}</span>
    </div>
  );
}
