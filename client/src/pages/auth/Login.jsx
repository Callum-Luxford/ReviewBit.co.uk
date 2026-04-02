import { Link } from "react-router-dom";
import CTAButton from "../../components/buttons/CtaButton";
import { ReactTyped } from "react-typed";
import { useMemo, useState, useContext } from "react";
import AuthTerminalShell from "../../components/auth/AuthTerminalShell";
import { AuthContext } from "../../context/AuthContext";

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

function Login() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    
    try {
      await login({ email, password });
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

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
            <span className="opacity-0">{LOGIN_LINES.status2}</span>
          )}
        </p>
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
            <span className="opacity-0">{LOGIN_LINES.command}</span>
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
    </>
  );

  const formContent = (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__row">
          <label htmlFor="email" className="auth-form__label">
            operator_email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@business.com"
            className="auth-form__input"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
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
            onChange={(event) => setPassword(event.target.value)}
            value={password}
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
    </>
  );

  return (
    <AuthTerminalShell
      mode="login"
      step={step}
      spinnerFrame={spinnerFrame}
      logLines={LOGIN_BOOT_LINES}
      logHeaderRight="REVIEWBIT ACCESS TERMINAL"
      ascii={String.raw`██╗      ██████╗  ██████╗ ██╗███╗   ██╗
██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
██║     ██║   ██║██║   ██║██║██║╚██╗██║
███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝`}
      sectionLabel="Access Node"
      leftContent={leftContent}
      formContent={formContent}
      showForm={showForm}
    />
  );
}

export default Login;
