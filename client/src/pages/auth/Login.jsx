import { Link } from "react-router-dom";
import CTAButton from "../../components/buttons/CtaButton";
import { ReactTyped } from "react-typed";
import { useMemo, useState } from "react";

const LOGIN_LINES = {
  status1: "> gateway.status :: online",
  status2: "> operator.session :: awaiting_credentials",
  command: "> ACCESS.LOGIN()",
  copy: "Enter your credentials to access your ReviewBit workspace.",
};

const LOGIN_BOOT_LINES = [
  "[SYS] reviewbit.access :: bootstrap requested",
  "[AUTH] verifying operator gateway .......... OK",
  "[NET] resolving secure route ............... OK",
  "[FS ] reading access manifest .............. OK",
  "[UI ] mounting operator viewport ........... OK",
  "[MOD] linking workspace controls ........... OK",
  "[KEY] credential listener standby .......... OK",
  "[BOOT] operator access ready ............... READY",
];

function BootLog({ step, compact = false }) {
  const visibleCount = Math.max(1, Math.min(LOGIN_BOOT_LINES.length, step + 1));

  return (
    <div className={`app-boot-log ${compact ? "login-mobile-log" : ""}`}>
      <div className="app-boot-log__header">
        <span>SYSTEM LOG v2.4.1</span>
        <span>REVIEWBIT ACCESS TERMINAL</span>
      </div>

      <div className="app-boot-log__body">
        {LOGIN_BOOT_LINES.map((line, index) => {
          const isVisible = index < visibleCount;
          const isCurrent = index === visibleCount - 1 && step < 4;

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

function AuthTerminalNav() {
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
        <Link to="/login" className="auth-theme-link-active transition">
          Login
        </Link>

        <span className="auth-theme-link-divider">/</span>

        <Link to="/signup" className="auth-theme-link-secondary transition">
          Signup
        </Link>
      </div>
    </div>
  );
}

function Login() {
  const [step, setStep] = useState(0);

  const showForm = step >= 4;

  const spinnerFrame = useMemo(() => {
    const frames = ["/", "—", "\\", "|"];
    return frames[step % frames.length];
  }, [step]);

  return (
    <section className="auth-theme-screen relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="terminal-hero-bg">
          <div className="terminal-hero-grid absolute inset-0" />
          <div className="terminal-hero-scanline" />
        </div>

        <div className="auth-theme-glow pointer-events-none absolute inset-0" />

        <div className="app-boot-terminal-surface hidden lg:block">
          <BootLog step={step} />
        </div>

        <div className="auth-theme-wash pointer-events-none absolute inset-0" />
        <div className="auth-theme-vignette pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-[3] mx-auto flex min-h-screen w-full items-start justify-center px-5 py-6 sm:px-8 sm:py-8 lg:items-center">
        <div className="login-terminal-shell w-full max-w-[900px]">
          <AuthTerminalNav />

          <div className="login-terminal-center login-terminal-frame">
            <div className="login-terminal-mobile-log-wrap lg:hidden">
              <BootLog step={step} compact />
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
                        {String.raw`██╗      ██████╗  ██████╗ ██╗███╗   ██╗
██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
██║     ██║   ██║██║   ██║██║██║╚██╗██║
███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝`}
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
                        Access Node
                      </p>

                      <div className="auth-theme-copy font-mono text-sm">
                        <p className="min-h-[1.5rem]">
                          {step === 0 ? (
                            <ReactTyped
                              strings={["> gateway.status :: "]}
                              typeSpeed={1}
                              backSpeed={0}
                              loop={false}
                              showCursor
                              cursorChar="_"
                              onComplete={() => setStep(1)}
                            />
                          ) : (
                            <>
                              <span>{"> gateway.status :: "}</span>
                              <span className="auth-online">online</span>
                            </>
                          )}
                        </p>

                        <p className="min-h-[1.5rem]">
                          {step === 1 ? (
                            <ReactTyped
                              strings={[LOGIN_LINES.status2]}
                              typeSpeed={1}
                              backSpeed={0}
                              loop={false}
                              showCursor
                              cursorChar="_"
                              onComplete={() => setStep(2)}
                            />
                          ) : step >= 2 ? (
                            <span>{LOGIN_LINES.status2}</span>
                          ) : (
                            <span className="opacity-0">
                              {LOGIN_LINES.status2}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="auth-theme-divider h-px" />

                      <p className="auth-theme-command font-mono text-sm uppercase tracking-[0.12em]">
                        {step === 2 ? (
                          <ReactTyped
                            strings={[LOGIN_LINES.command]}
                            typeSpeed={1}
                            backSpeed={0}
                            loop={false}
                            showCursor
                            cursorChar="_"
                            onComplete={() => setStep(3)}
                          />
                        ) : step >= 3 ? (
                          <span>{LOGIN_LINES.command}</span>
                        ) : (
                          <span className="opacity-0">
                            {LOGIN_LINES.command}
                          </span>
                        )}
                      </p>

                      <div className="auth-theme-copy min-h-[3.5rem] font-mono text-sm leading-7">
                        {step === 3 ? (
                          <ReactTyped
                            strings={[LOGIN_LINES.copy]}
                            typeSpeed={1}
                            backSpeed={0}
                            loop={false}
                            showCursor
                            cursorChar="_"
                            onComplete={() => setStep(4)}
                          />
                        ) : step >= 4 ? (
                          <span>{LOGIN_LINES.copy}</span>
                        ) : (
                          <span className="opacity-0">{LOGIN_LINES.copy}</span>
                        )}
                      </div>
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

                  <form className="auth-form">
                    <div className="auth-form__row">
                      <label htmlFor="email" className="auth-form__label">
                        operator_email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@business.com"
                        className="auth-form__input"
                      />
                    </div>

                    <div className="auth-form__row">
                      <label htmlFor="password" className="auth-form__label">
                        access_key
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="auth-form__input"
                      />
                    </div>

                    <div className="auth-form__submit-wrap">
                      <CTAButton
                        type="submit"
                        accent="green"
                        mode="hover-fill"
                        className="bg-transparent"
                      >
                        LOGIN
                      </CTAButton>
                    </div>

                    <button type="button" className="auth-form__recovery">
                      Password recovery
                    </button>
                  </form>

                  <p className="auth-form__footer">
                    No active workspace?{" "}
                    <Link to="/signup" className="auth-form__link">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
