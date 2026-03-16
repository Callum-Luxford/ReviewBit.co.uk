export default function TerminalPill({ label }) {
  return (
    <div className="terminal-section-pill">
      <div className="terminal-section-pill-dots">
        <span
          className="terminal-section-pill-dot"
          style={{ backgroundColor: "#ff5f57" }}
        />
        <span
          className="terminal-section-pill-dot"
          style={{ backgroundColor: "#febc2e" }}
        />
        <span
          className="terminal-section-pill-dot"
          style={{ backgroundColor: "#28c840" }}
        />
      </div>

      <span>{label}</span>
    </div>
  );
}
