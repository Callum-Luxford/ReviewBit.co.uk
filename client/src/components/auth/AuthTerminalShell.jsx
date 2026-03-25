import { Link } from "react-router-dom";
import BootLog from "../terminal/BootLog";

function AuthTerminalNav({ mode }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-6">
      <Link
        to="/"
        className="auth-theme-link-primary inline-flex items-center gap-3 font-mono text-sm transition"
      >
        <span className="auth-theme-link-accent">{">_"}</span>
        <span>ReviewBit.co.uk</span>
      </Link>

      <div className="flex items-center gap-4 font-mono text-sm">
        <Link
          to="/login"
          className={`${
            mode === "login"
              ? "auth-theme-link-active"
              : "auth-theme-link-secondary"
          } transition`}
        >
          Login
        </Link>

        <span className="auth-theme-link-divider">/</span>

        <Link
          to="/signup"
          className={`${
            mode === "signup"
              ? "auth-theme-link-active"
              : "auth-theme-link-secondary"
          } transition`}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default function AuthTerminalShell({
  mode,
  step,
  spinnerFrame,
  logLines,
  logHeaderRight,
  ascii,
  sectionLabel,
  leftContent,
  formContent,
  showForm,
  cursorLineClassName = "",
}) {
  return (
    <section className="auth-theme-screen relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="terminal-hero-bg">
          <div className="terminal-hero-grid absolute inset-0" />
          <div className="terminal-hero-scanline" />
        </div>

        <div className="auth-theme-glow pointer-events-none absolute inset-0" />

        <div className="app-boot-terminal-surface hidden lg:block">
          <BootLog
            step={step}
            lines={logLines}
            headerRight={logHeaderRight}
            cursorLineClassName={cursorLineClassName}
          />
        </div>

        <div className="auth-theme-wash pointer-events-none absolute inset-0" />
        <div className="auth-theme-vignette pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-[3] mx-auto flex min-h-screen w-full items-start justify-center px-5 py-6 sm:px-8 sm:py-8 lg:items-center">
        <div className="login-terminal-shell w-full max-w-[900px]">
          <AuthTerminalNav mode={mode} />

          <div className="login-terminal-center login-terminal-frame">
            <div className="login-terminal-mobile-log-wrap lg:hidden">
              <BootLog
                step={step}
                compact
                lines={logLines}
                headerRight={logHeaderRight}
                cursorLineClassName={cursorLineClassName}
              />
            </div>

            <div className="login-terminal-content">
              <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
                <div className="min-w-0">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="auth-theme-eyebrow text-[11px] uppercase tracking-[0.32em]">
                        Initialising
                      </p>

                      <pre className="auth-theme-ascii mt-3 max-w-full overflow-visible font-mono text-[6px] leading-[0.9] sm:text-[12px] sm:leading-[1.05]">
                        {ascii}
                      </pre>
                    </div>

                    <div className="hidden shrink-0 items-center gap-3 pt-2 font-mono lg:flex">
                      <span className="auth-theme-spinner-label text-sm">
                        boot
                      </span>
                      <span className="app-boot-spinner-frame">
                        {spinnerFrame}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <p className="auth-theme-section-label font-mono text-[11px] uppercase tracking-[0.28em]">
                        {sectionLabel}
                      </p>

                      {leftContent}
                    </div>
                  </div>
                </div>

                <div
                  className={`self-start lg:self-center transition-all duration-500 ${
                    showForm
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between lg:hidden">
                    <span className="auth-theme-spinner-label font-mono text-sm">
                      boot
                    </span>
                    <span className="app-boot-spinner-frame">
                      {spinnerFrame}
                    </span>
                  </div>

                  {formContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
