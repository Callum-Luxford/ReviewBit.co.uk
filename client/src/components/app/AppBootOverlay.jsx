import { useEffect, useRef, useState } from "react";
import BootTerminalPanel from "../terminal/BootTerminalPanel";

const STORAGE_KEY = "reviewbit_app_boot_last_seen";
const BOOT_COOLDOWN_MS = 15 * 60 * 1;

const BOOT_LINES = [
  "[SYS] reviewbit.public :: bootstrap requested",
  "[MEM] allocating shell memory .............. OK",
  "[NET] resolving edge network route ......... OK",
  "[FS ] reading client manifest .............. OK",
  "[GPU] enabling terminal compositor ......... OK",
  "[UI ] mounting viewport frame .............. OK",
  "[MOD] linking review router core ........... OK",
  "[AUTH] handshake listener standby .......... OK",
  "[SCAN] scanline renderer active ............ OK",
  "[CACHE] cold boot registry primed .......... OK",
  "[ROUTE] validating public entrypoint ....... OK",
  "[LOG] command buffer attached .............. OK",
  "[CORE] heartbeat stable .................... OK",
  "[BOOT] reviewbit.public online ............. READY",
];

const SPINNER_FRAMES = ["/", "—", "\\", "|"];

function shouldShowBootNow() {
  if (typeof window === "undefined") return false;

  const lastSeen = Number(window.sessionStorage.getItem(STORAGE_KEY) || 0);
  const now = Date.now();

  return !lastSeen || now - lastSeen > BOOT_COOLDOWN_MS;
}

function AppBootScreen({ progress, spinnerFrame }) {
  return (
    <BootTerminalPanel
      logLines={BOOT_LINES}
      logHeaderRight="REVIEWBIT PUBLIC BOOT"
      progress={progress}
      spinnerFrame={spinnerFrame}
      eyebrow="Initialising"
      ascii={String.raw`██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗██████╗ ██╗████████╗
██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║██╔══██╗██║╚══██╔══╝
██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║██████╔╝██║   ██║
██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║██╔══██╗██║   ██║
██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝██████╔╝██║   ██║
╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═════╝ ╚═╝   ╚═╝`}
      copy="Loading workspace modules..."
      statusLabel="status: active"
      mobileLogBreakpointClass="app-boot-mobile-log-wrap md:hidden"
      desktopLogClassName="app-boot-terminal-surface hidden md:block"
    />
  );
}

export default function AppBootOverlay({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [showBoot, setShowBoot] = useState(() => shouldShowBootNow());
  const [progress, setProgress] = useState(0);
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  const progressIntervalRef = useRef(null);
  const spinnerIntervalRef = useRef(null);
  const finishTimeoutRef = useRef(null);

  useEffect(() => {
    setIsReady(true);

    if (!showBoot) return;

    let currentProgress = 0;

    spinnerIntervalRef.current = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 110);

    progressIntervalRef.current = setInterval(() => {
      if (currentProgress < 50) {
        currentProgress += Math.random() * 2 + 1;
      } else if (currentProgress < 85) {
        currentProgress += Math.random() * 1 + 0.4;
      } else {
        currentProgress += 0.15;
      }

      if (currentProgress >= 99) {
        currentProgress = 99;
        clearInterval(progressIntervalRef.current);
      }

      setProgress(Math.floor(currentProgress));
    }, 140);

    finishTimeoutRef.current = setTimeout(() => {
      clearInterval(progressIntervalRef.current);
      clearInterval(spinnerIntervalRef.current);
      setProgress(100);

      window.sessionStorage.setItem(STORAGE_KEY, String(Date.now()));

      setTimeout(() => setShowBoot(false), 350);
    }, 4400);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearInterval(spinnerIntervalRef.current);
      clearTimeout(finishTimeoutRef.current);
    };
  }, [showBoot]);

  useEffect(() => {
    if (!showBoot) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [showBoot]);

  if (!isReady) return null;

  return (
    <>
      {!showBoot && children}
      {showBoot && (
        <AppBootScreen
          progress={progress}
          spinnerFrame={SPINNER_FRAMES[spinnerIndex]}
        />
      )}
    </>
  );
}
