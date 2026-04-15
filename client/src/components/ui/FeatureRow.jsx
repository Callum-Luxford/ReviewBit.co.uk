import CTAButton from "../buttons/CtaButton";
import FeatureCard from "./FeatureCard";

export default function FeatureRow({
  title,
  copy,
  bullets = [],
  accent = "green",
  buttonText = "LEARN_MORE",
  buttonMode = "hover-fill",
  reverse = false,
  visualImage,
  visualAlt = "",
  visualTitle = "",
}) {
  return (
    <div
      className={[
        "feature-row",
        `feature-row--accent-${accent}`,
        reverse ? "feature-row--reverse" : "",
      ].join(" ")}
    >
      <div className="feature-row__content">
        <h3 className="feature-row__title">{title}</h3>
        <p className="feature-row__copy">{copy}</p>

        <ul className="feature-row__list">
          {bullets.map((item) => (
            <li key={item} className="feature-row__item">
              <span
                className={[
                  "feature-row__check",
                  `feature-row__check--${accent}`,
                ].join(" ")}
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="feature-row__cta">
          <CTAButton
            accent={accent}
            mode={buttonMode}
            size="md"
            type="button"
            className="feature-row__cta-btn uppercase tracking-[0.12em]"
          >
            {`> ${buttonText}`}
          </CTAButton>
        </div>
      </div>

      <div className="feature-row__visual-wrap">
        <FeatureCard
          image={visualImage}
          alt={visualAlt}
          windowTitle={visualTitle}
          accent={accent}
        />
      </div>
    </div>
  );
}