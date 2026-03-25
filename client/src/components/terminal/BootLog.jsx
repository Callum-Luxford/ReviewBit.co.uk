function getVisibleCount({ lines, progress, step }) {
  if (typeof progress === "number") {
    return Math.max(
      1,
      Math.min(lines.length, Math.floor((progress / 100) * (lines.length + 2))),
    );
  }

  if (typeof step === "number") {
    return Math.max(1, Math.min(lines.length, step + 1));
  }

  return 1;
}

function isCurrentLine({ index, visibleCount, progress, step }) {
  if (index !== visibleCount - 1) return false;

  if (typeof progress === "number") {
    return progress < 100;
  }

  if (typeof step === "number") {
    return step < 4;
  }

  return false;
}

export default function BootLog({
  lines = [],
  headerRight = "",
  progress,
  step,
  compact = false,
  cursorLineClassName = "",
}) {
  const visibleCount = getVisibleCount({ lines, progress, step });

  return (
    <div className={`app-boot-log ${compact ? "login-mobile-log" : ""}`.trim()}>
      <div className="app-boot-log__header">
        <span>SYSTEM LOG v2.4.1</span>
        <span>{headerRight}</span>
      </div>

      <div className="app-boot-log__body">
        {lines.map((line, index) => {
          const isVisible = index < visibleCount;
          const isCurrent = isCurrentLine({
            index,
            visibleCount,
            progress,
            step,
          });

          return (
            <p
              key={line}
              className={[
                "app-boot-log__line",
                isVisible ? "app-boot-log__line--visible" : "",
                isCurrent ? "app-boot-log__line--current" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="app-boot-log__prompt">{">"}</span>
              <span>{line}</span>
            </p>
          );
        })}

        <p
          className={[
            "app-boot-log__line",
            "app-boot-log__cursor-line",
            cursorLineClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="app-boot-log__prompt">{">"}</span>
          <span className="app-boot-log__cursor-block" />
        </p>
      </div>
    </div>
  );
}
