import CTAButton from "../buttons/CtaButton";

export default function PricingCard({
  name,
  price,
  billing = "/month",
  features = [],
  cta = "GET_STARTED",
  accent = "green",
  featured = false,
  onClick,
}) {
  return (
    <article
      className={[
        "terminal-card-shell",
        "terminal-pricing-card",
        featured
          ? accent === "purple"
            ? "terminal-card-purple"
            : accent === "cyan"
              ? "terminal-card-cyan"
              : "terminal-card-green"
          : accent === "purple"
            ? "terminal-card-purple"
            : accent === "cyan"
              ? "terminal-card-cyan"
              : "terminal-card-green",
        featured ? "terminal-pricing-card-featured" : "",
      ].join(" ")}
    >
      <div className="terminal-pricing-card-inner">
        <div className="terminal-card-kicker">{name}</div>

        <div className="terminal-pricing-price-wrap">
          {price === "Custom" ? (
            <h3 className="terminal-pricing-price terminal-pricing-price-custom">
              {price}
            </h3>
          ) : (
            <div className="terminal-pricing-price-row">
              <h3 className="terminal-pricing-price">{price}</h3>
              <span className="terminal-pricing-billing">{billing}</span>
            </div>
          )}
        </div>

        <ul className="terminal-pricing-feature-list">
          {features.map((feature) => (
            <li key={feature} className="terminal-pricing-feature-item">
              <span className="terminal-pricing-feature-check">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <CTAButton
            type="button"
            accent={accent}
            size="md"
            mode={featured ? "solid" : "hover-fill"}
            className="w-full uppercase tracking-[0.14em]"
            onClick={onClick}
          >
            {cta}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
