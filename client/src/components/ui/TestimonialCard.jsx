export default function TestimonialCard({
  name,
  role,
  quote,
  accent = "green",
}) {
  const accentMap = {
    green: "0, 255, 102",
    cyan: "0, 217, 255",
    purple: "139, 92, 246",
  };

  const accentRgb = accentMap[accent] || "255, 255, 255";
  const formattedRole = role.replaceAll("_", " ");

  return (
    <article
      className="testimonial-card"
      style={{ "--testimonial-accent-rgb": accentRgb }}
    >
      <div className="testimonial-card__topbar">
        <div className="testimonial-card__dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <span className="testimonial-card__terminal-title">
          reviewBit.user.log
        </span>
      </div>

      <div className="testimonial-card__inner">
        <div className="testimonial-card__header">
          <div className="testimonial-card__meta">
            <p
              className={`testimonial-card__tag testimonial-card__tag--${accent}`}
            >
              {formattedRole}
            </p>

            <h3 className="testimonial-card__name">{name}</h3>
          </div>
        </div>

        <p className="testimonial-card__quote">“{quote}”</p>
      </div>
    </article>
  );
}
