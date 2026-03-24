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

      <div className="relative z-[3] flex h-screen items-center justify-center px-3 sm:px-6">
        <div className="auth-theme-panel w-full max-w-[58rem] rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="auth-theme-eyebrow text-[11px] uppercase tracking-[0.32em]">
                {view.eyebrow}
              </p>

              <pre className="auth-theme-ascii mt-3 max-w-full overflow-hidden font-mono text-[6px] leading-[0.9] sm:text-[13px] sm:leading-[1.05]">
                {view.titleAscii}
              </pre>
            </div>

            <div className="flex shrink-0 items-center gap-3 pt-2 font-mono">
              <span className="auth-theme-spinner-label text-sm">boot</span>
              <span className="app-boot-spinner-frame">
                {getSpinnerFrame(progress)}
              </span>
            </div>
          </div>

          <div className="auth-theme-copy mb-4 font-mono text-sm">
            {view.copy}
          </div>

          <div className="auth-theme-progress relative h-3 w-full overflow-hidden rounded-full border">
            <div
              className="auth-theme-progress-fill h-full rounded-full transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-sm">
            <span className="auth-theme-meta-label">{view.statusLabel}</span>
            <span className="auth-theme-meta-value">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBootOverlay;
