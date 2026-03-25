import { useMemo } from "react";
import BootTerminalPanel from "../terminal/BootTerminalPanel";

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
    <BootTerminalPanel
      screenClassName="auth-theme-screen fixed inset-0 z-[12000] overflow-hidden"
      desktopLogClassName="app-boot-terminal-surface hidden md:block"
      centerClassName="auth-boot-center relative z-[3] flex h-screen items-center justify-center px-3 sm:px-6"
      panelClassName="auth-theme-panel auth-boot-panel app-boot-panel w-full max-w-[58rem]"
      mobileLogBreakpointClass="auth-boot-mobile-log-wrap md:hidden"
      glowClassName="auth-theme-glow pointer-events-none absolute inset-0"
      washClassName="auth-theme-wash pointer-events-none absolute inset-0"
      vignetteClassName="auth-theme-vignette pointer-events-none absolute inset-0"
      eyebrowClassName="auth-theme-eyebrow app-boot-panel__eyebrow"
      asciiClassName="auth-theme-ascii"
      spinnerLabelClassName="auth-theme-spinner-label app-boot-panel__spinner-label"
      copyClassName="auth-theme-copy app-boot-panel__copy"
      progressClassName="auth-theme-progress app-boot-progress"
      progressFillClassName="auth-theme-progress-fill app-boot-progress__fill"
      metaLabelClassName="auth-theme-meta-label app-boot-panel__meta-label"
      metaValueClassName="auth-theme-meta-value app-boot-panel__meta-value"
      logLines={view.logLines}
      logHeaderRight={view.headerRight}
      progress={progress}
      spinnerFrame={getSpinnerFrame(progress)}
      eyebrow={view.eyebrow}
      ascii={view.titleAscii}
      copy={view.copy}
      statusLabel={view.statusLabel}
    />
  );
}

export default AuthBootOverlay;
