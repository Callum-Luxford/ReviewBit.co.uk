export default function FeatureCard({
  image,
  alt = "",
  windowTitle = "",
  accent = "green",
  imageClassName = "",
}) {
  return (
    <div
      className={[
        "feature-visual-shell",
        `feature-visual-shell--${accent}`,
      ].join(" ")}
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
