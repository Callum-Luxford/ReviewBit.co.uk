export default function FeatureCard({
  image,
  alt = "",
  windowTitle = "",
  accent = "green",
  imageClassName = "",
}) {
  const accentMap = {
    green: "0, 255, 102",
    cyan: "0, 217, 255",
    purple: "139, 92, 246",
  };

  const accentRgb = accentMap[accent] || "255, 255, 255";

  return (
    <div
      className="feature-visual-shell"
      style={{ "--feature-accent-rgb": accentRgb }}
    >
      <div className="feature-visual-topbar">
        <div className="feature-visual-dots">
          <span />
          <span />
          <span />
        </div>

        <span className="feature-visual-title">{windowTitle}</span>
      </div>

      <div className="feature-visual-body">
        <div className="feature-card-image-wrap">
          <img
            src={image}
            alt={alt}
            className={["feature-card-image", imageClassName].join(" ").trim()}
          />
        </div>
      </div>
    </div>
  );
}
