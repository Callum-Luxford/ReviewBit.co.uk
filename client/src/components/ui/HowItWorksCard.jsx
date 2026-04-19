export default function HowItWorksCard({
  icon,
  title,
  children,
  accent = "terminal-card-green",
  chapter = "CHAPTER 01",
  bullets = [],
  variant = "content",
}) {
  if (variant === "visual") {
    return (
      <article
        className={["rb-how-card", "rb-how-card--visual", accent].join(" ")}
      >
        <div className="rb-how-card__visual-shell">
          <div className="rb-how-card__visual-glow" />
          <div className="rb-how-card__visual-frame">
            <div className="rb-how-card__visual-placeholder" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={[
        "rb-how-card",
        "rb-how-card--content",
        "rb-how-card--content-static",
        accent,
      ].join(" ")}
    >
      <div className="rb-how-card__chapter-wrap">
        <span className="rb-how-card__chapter-dot">
          <span
            className="rb-how-card__chapter-icon"
            style={{ "--icon-mask": `url(${icon})` }}
            aria-hidden="true"
          />
        </span>

        <span className="rb-how-card__chapter">{chapter}</span>
      </div>

      <h3 className="rb-how-card__title">{title}</h3>

      <p className="rb-how-card__copy">{children}</p>

      {bullets.length > 0 && (
        <ul className="rb-how-card__list">
          {bullets.map((bullet) => (
            <li key={bullet} className="rb-how-card__list-item">
              <span className="rb-how-card__list-dot" />
              <span className="rb-how-card__list-text">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}