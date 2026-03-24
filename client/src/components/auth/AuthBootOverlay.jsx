import { useMemo } from "react";

const SPINNER_FRAMES = ["/", "—", "\\", "|"];

const CONFIG = {
  login: {
    headerRight: "REVIEWBIT ACCESS BOOT",
    eyebrow: "Initialising",
    titleAscii: String.raw`██╗      ██████╗  ██████╗ ██╗███╗   ██╗
██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
██║     ██║   ██║██║   ██║██║██║╚██╗██║
███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝`,
    copy: "Opening workspace access...",
    statusLabel: "status: access",
    logLines: [
      "[SYS] reviewbit.access :: bootstrap requested",
      "[AUTH] verifying operator credentials .... OK",
      "[NET] resolving secure gateway route ..... OK",
      "[FS ] loading access manifest ............ OK",
      "[UI ] mounting operator viewport ......... OK",
      "[MOD] linking control system core ........ OK",
      "[KEY] session token channel standby ...... OK",
      "[BOOT] operator access online ............ READY",
    ],
  },
  signup: {
    headerRight: "REVIEWBIT WORKSPACE BOOT",
    eyebrow: "Initialising",
    titleAscii: String.raw`███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝`,
    copy: "Provisioning ReviewBit workspace...",
    statusLabel: "status: workspace",
    logLines: [
      "[SYS] reviewbit.workspace :: bootstrap requested",
      "[AUTH] preparing registration gateway .... OK",
      "[NET] resolving secure signup route ...... OK",
      "[FS ] loading workspace manifest ......... OK",
      "[UI ] mounting business setup viewport ... OK",
      "[MOD] linking routing modules ............ OK",
      "[NODE] workspace registry standby ........ OK",
      "[BOOT] workspace creation ready .......... READY",
    ],
  },
};

function BootLog({ progress, lines, headerRight }) {
  const visibleCount = Math.max(
    1,
    Math.min(lines.length, Math.floor((progress / 100) * (lines.length + 2))),
  );

  return (
    <div className="app-boot-log">
      <div className="app-boot-log__header">
        <span>SYSTEM LOG v2.4.1</span>
        <span>{headerRight}</span>
      </div>

      <div className="app-boot-log__body">
        {lines.map((line, index) => {
          const isVisible = index < visibleCount;
          const isCurrent = index === visibleCount - 1 && progress < 100;

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

        <p className="app-boot-log__line app-boot-log__cursor-line">
          <span className="app-boot-log__prompt">{">"}</span>
          <span className="app-boot-log__cursor-block" />
        </p>
      </div>
    </div>
  );
}

function getSpinnerFrame(progress = 0) {
  const index = Math.floor(progress / 6) % SPINNER_FRAMES.length;
  return SPINNER_FRAMES[index];
}

function AuthBootOverlay({ open, mode = "login", progress = 0 }) {
  const view = useMemo(() => {
    return mode === "signup" ? CONFIG.signup : CONFIG.login;
  }, [mode]);

  if (!open) return null;

  return (
    <div className="auth-theme-screen fixed inset-0 z-[12000] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="terminal-hero-bg">
          <div className="terminal-hero-grid absolute inset-0" />
          <div className="terminal-hero-scanline" />
        </div>

        <div className="auth-theme-glow pointer-events-none absolute inset-0" />

        <div className="app-boot-terminal-surface">
          <BootLog
            progress={progress}
            lines={view.logLines}
            headerRight={view.headerRight}
          />
        </div>

        <div className="auth-theme-wash pointer-events-none absolute inset-0" />
        <div className="auth-theme-vignette pointer-events-none absolute inset-0" />
      </div>

      <div className="auth-boot-center relative z-[3] flex h-screen items-center justify-center px-3 sm:px-6">
        <div className="auth-theme-panel auth-boot-panel app-boot-panel w-full max-w-[58rem]">
          <div className="auth-boot-mobile-log-wrap md:hidden">
            <BootLog
              progress={progress}
              lines={view.logLines}
              headerRight={view.headerRight}
            />
          </div>

          <div className="app-boot-panel__header">
            <div className="min-w-0">
              <p className="auth-theme-eyebrow app-boot-panel__eyebrow">
                {view.eyebrow}
              </p>

              <pre className="auth-theme-ascii app-boot-panel__ascii">
                {view.titleAscii}
              </pre>
            </div>

            <div className="app-boot-panel__spinner-wrap">
              <span className="auth-theme-spinner-label app-boot-panel__spinner-label">
                boot
              </span>
              <span className="app-boot-spinner-frame">
                {getSpinnerFrame(progress)}
              </span>
            </div>
          </div>

          <div className="auth-theme-copy app-boot-panel__copy">
            {view.copy}
          </div>

          <div className="auth-theme-progress app-boot-progress">
            <div
              className="auth-theme-progress-fill app-boot-progress__fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="app-boot-panel__meta">
            <span className="auth-theme-meta-label app-boot-panel__meta-label">
              {view.statusLabel}
            </span>
            <span className="auth-theme-meta-value app-boot-panel__meta-value">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBootOverlay;
