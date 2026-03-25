import { Link } from "react-router-dom";
import CTAButton from "../../components/buttons/CtaButton";
import { ReactTyped } from "react-typed";
import { useMemo, useState } from "react";
import AuthTerminalShell from "../../components/auth/AuthTerminalShell";

const SIGNUP_LINES = {
  status1: "> registry.status :: ready",
  status2: "> workspace.node :: awaiting_input",
  command: "> WORKSPACE.CREATE()",
  copy: "Create your ReviewBit workspace and start collecting reviews.",
};

const SIGNUP_BOOT_LINES = [
  "[SYS] reviewbit.workspace :: bootstrap requested",
  "[AUTH] preparing registration gateway ...... OK",
  "[NET] resolving secure signup route ........ OK",
  "[FS ] reading workspace manifest ........... OK",
  "[UI ] mounting registry viewport ........... OK",
  "[MOD] linking routing modules .............. OK",
  "[NODE] workspace creation standby ......... OK",
  "[BOOT] workspace registry ready ............ READY",
];

function Signup() {
  const [step, setStep] = useState(0);

  const showForm = step >= 4;

  const spinnerFrame = useMemo(() => {
    const frames = ["/", "—", "\\", "|"];
    return frames[step % frames.length];
  }, [step]);

  const leftContent = (
    <>
      <div className="auth-theme-copy font-mono text-sm">
        <p className="min-h-[1.5rem]">
          {step === 0 ? (
            <ReactTyped
              strings={["> registry.status :: "]}
              typeSpeed={1}
              backSpeed={0}
              loop={false}
              showCursor
              cursorChar="_"
              onComplete={() => setStep(1)}
            />
          ) : (
            <>
              <span>{"> registry.status :: "}</span>
              <span className="auth-online">ready</span>
            </>
          )}
        </p>

        <p className="min-h-[1.5rem]">
          {step === 1 ? (
            <ReactTyped
              strings={[SIGNUP_LINES.status2]}
              typeSpeed={1}
              backSpeed={0}
              loop={false}
              showCursor
              cursorChar="_"
              onComplete={() => setStep(2)}
            />
          ) : step >= 2 ? (
            <span>{SIGNUP_LINES.status2}</span>
          ) : (
            <span className="opacity-0">{SIGNUP_LINES.status2}</span>
          )}
        </p>
      </div>

      <div className="space-y-3 pt-4">
        <div className="auth-theme-divider h-px" />

        <p className="auth-theme-command font-mono text-sm uppercase tracking-[0.12em]">
          {step === 2 ? (
            <ReactTyped
              strings={[SIGNUP_LINES.command]}
              typeSpeed={1}
              backSpeed={0}
              loop={false}
              showCursor
              cursorChar="_"
              onComplete={() => setStep(3)}
            />
          ) : step >= 3 ? (
            <span>{SIGNUP_LINES.command}</span>
          ) : (
            <span className="opacity-0">{SIGNUP_LINES.command}</span>
          )}
        </p>

        <div className="auth-theme-copy min-h-[3.5rem] font-mono text-sm leading-7">
          {step === 3 ? (
            <ReactTyped
              strings={[SIGNUP_LINES.copy]}
              typeSpeed={1}
              backSpeed={0}
              loop={false}
              showCursor
              cursorChar="_"
              onComplete={() => setStep(4)}
            />
          ) : step >= 4 ? (
            <span>{SIGNUP_LINES.copy}</span>
          ) : (
            <span className="opacity-0">{SIGNUP_LINES.copy}</span>
          )}
        </div>
      </div>
    </>
  );

  const formContent = (
    <>
      <form className="auth-form">
        <div className="auth-form__row">
          <label htmlFor="businessName" className="auth-form__label">
            business_name
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Your business name"
            className="auth-form__input"
          />
        </div>

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
            placeholder="Create a password"
            className="auth-form__input"
          />
        </div>

        <div className="auth-form__row">
          <label htmlFor="confirmPassword" className="auth-form__label">
            confirm_access_key
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
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
            CREATE WORKSPACE
          </CTAButton>
        </div>
      </form>

      <p className="auth-form__footer">
        Already registered?{" "}
        <Link to="/login" className="auth-form__link">
          Login
        </Link>
      </p>
    </>
  );

  return (
    <AuthTerminalShell
      mode="signup"
      step={step}
      spinnerFrame={spinnerFrame}
      logLines={SIGNUP_BOOT_LINES}
      logHeaderRight="REVIEWBIT WORKSPACE REGISTRY"
      cursorLineClassName="login-mobile-cursor"
      ascii={String.raw`███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝`}
      sectionLabel="Workspace Registry"
      leftContent={leftContent}
      formContent={formContent}
      showForm={showForm}
    />
  );
}

export default Signup;
