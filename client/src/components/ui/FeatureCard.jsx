export default function FeatureCard({
  image,
  alt = "",
  windowTitle = "",
  accent = "green",
  imageClassName = "",
}) {
  const accentMap = {
    green: {
      rgb: "255, 162, 92",
      className: "feature-visual-shell--green",
    },
    cyan: {
      rgb: "90, 156, 181",
      className: "feature-visual-shell--cyan",
    },
    purple: {
      rgb: "127, 85, 177",
      className: "feature-visual-shell--purple",
    },
  };

  const accentConfig = accentMap[accent] || {
    rgb: "255, 162, 92",
    className: "feature-visual-shell--green",
  };

  return (
    <div
      className={["feature-visual-shell", accentConfig.className].join(" ")}
      style={{ "--feature-accent-rgb": accentConfig.rgb }}
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