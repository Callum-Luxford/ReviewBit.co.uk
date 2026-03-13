export default function TestimonialCard({
  name,
  role,
  quote,
  avatar = "",
  accent,
}) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <article className={`testimonial-card testimonial-card--${accent}`}>
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
          <div className="testimonial-card__avatar-wrap">
            {avatar ? (
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="testimonial-card__avatar"
              />
            ) : (
              <div className="testimonial-card__avatar testimonial-card__avatar--fallback">
                {initial}
              </div>
            )}
          </div>

          <div className="testimonial-card__meta">
            <h3 className="testimonial-card__name">{name}</h3>

            <p
              className={`testimonial-card__role testimonial-card__role--${accent}`}
            >
              {role.replaceAll("_", " ")}
            </p>
          </div>
        </div>

        <p className="testimonial-card__quote">“{quote}”</p>
      </div>
    </article>
  );
}
