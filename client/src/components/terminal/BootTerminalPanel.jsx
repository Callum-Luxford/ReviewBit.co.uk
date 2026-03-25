import BootLog from "./BootLog";

export default function BootTerminalPanel({
  logLines,
  logHeaderRight,
  progress,
  spinnerFrame,
  eyebrow = "Initialising",
  ascii,
  copy,
  statusLabel,
  mobileLogBreakpointClass = "md:hidden",
  desktopLogClassName = "app-boot-terminal-surface hidden md:block",
  centerClassName = "app-boot-center",
  outerWrapClassName = "",
  panelClassName = "app-boot-panel",
  screenClassName = "app-boot-screen",
  glowClassName = "app-boot-bg__glow",
  washClassName = "app-boot-bg__wash",
  vignetteClassName = "app-boot-bg__vignette",
  eyebrowClassName = "app-boot-panel__eyebrow",
  asciiClassName = "",
  spinnerLabelClassName = "app-boot-panel__spinner-label",
  copyClassName = "app-boot-panel__copy",
  progressClassName = "app-boot-progress",
  progressFillClassName = "app-boot-progress__fill",
  metaLabelClassName = "app-boot-panel__meta-label",
  metaValueClassName = "app-boot-panel__meta-value",
}) {
  const panel = (
    <div className={panelClassName}>
      <div className={mobileLogBreakpointClass}>
        <BootLog
          progress={progress}
          lines={logLines}
          headerRight={logHeaderRight}
        />
      </div>

      <div className="app-boot-panel__header">
        <div className="min-w-0">
          <p className={eyebrowClassName}>{eyebrow}</p>

          <pre
            className={[
              "app-boot-panel__ascii",
              "mt-3 max-w-full overflow-visible font-mono text-[5px] leading-[0.9] sm:text-[6px] sm:leading-[0.9] md:text-[8px] md:leading-[0.95] lg:text-[12px] lg:leading-[1.05] xl:text-[16px] xl:leading-[1]",
              asciiClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {ascii}
          </pre>
        </div>

        <div className="app-boot-panel__spinner-wrap">
          <span className={spinnerLabelClassName}>boot</span>
          <span className="app-boot-spinner-frame">{spinnerFrame}</span>
        </div>
      </div>

      <div className={copyClassName}>{copy}</div>

      <div className={progressClassName}>
        <div
          className={progressFillClassName}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="app-boot-panel__meta">
        <span className={metaLabelClassName}>{statusLabel}</span>
        <span className={metaValueClassName}>{Math.round(progress)}%</span>
      </div>
    </div>
  );

  return (
    <div className={screenClassName}>
      <div className="app-boot-bg">
        <div className="terminal-hero-bg">
          <div className="terminal-hero-grid absolute inset-0" />
          <div className="terminal-hero-scanline" />
        </div>

        <div className={glowClassName} />

        <div className={desktopLogClassName}>
          <BootLog
            progress={progress}
            lines={logLines}
            headerRight={logHeaderRight}
          />
        </div>

        <div className={washClassName} />
        <div className={vignetteClassName} />
      </div>

      <div className={centerClassName}>
        {outerWrapClassName ? (
          <div className={outerWrapClassName}>{panel}</div>
        ) : (
          panel
        )}
      </div>
    </div>
  );
}
