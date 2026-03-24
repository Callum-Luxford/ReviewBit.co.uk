import { useEffect, useRef, useState } from "react";

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

function BootLog({ progress }) {
  const visibleCount = Math.max(
    1,
    Math.min(
      BOOT_LINES.length,
      Math.floor((progress / 100) * (BOOT_LINES.length + 2)),
    ),
  );

  return (
    <div className="app-boot-log">
      <div className="app-boot-log__header">
        <span>SYSTEM LOG v2.4.1</span>
        <span>REVIEWBIT PUBLIC BOOT</span>
      </div>

      <div className="app-boot-log__body">
        {BOOT_LINES.map((line, index) => {
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

function AppBootScreen({ progress, spinnerFrame }) {
  return (
    <div className="app-boot-screen">
      <div className="app-boot-bg">
        <div className="terminal-hero-bg">
          <div className="terminal-hero-grid absolute inset-0" />
          <div className="terminal-hero-scanline" />
        </div>

        <div className="app-boot-bg__glow" />

        <div className="app-boot-terminal-surface hidden md:block">
          <BootLog progress={progress} />
        </div>

        <div className="app-boot-bg__wash" />
        <div className="app-boot-bg__vignette" />
      </div>

      <div className="app-boot-center">
        <div className="app-boot-panel">
          <div className="app-boot-mobile-log-wrap md:hidden">
            <BootLog progress={progress} compact />
          </div>
          <div className="app-boot-panel__header">
            <div className="min-w-0">
              <p className="app-boot-panel__eyebrow">Initialising</p>

              <pre className="app-boot-panel__ascii mt-3 max-w-full overflow-visible font-mono text-[5px] leading-[0.9] sm:text-[6px] sm:leading-[0.9] md:text-[8px] md:leading-[0.95] lg:text-[12px] lg:leading-[1.05] xl:text-[16px] xl:leading-[1]">
                {String.raw`██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗██████╗ ██╗████████╗
██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║██╔══██╗██║╚══██╔══╝
██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║██████╔╝██║   ██║
██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║██╔══██╗██║   ██║
██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝██████╔╝██║   ██║
╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═════╝ ╚═╝   ╚═╝`}
              </pre>
            </div>

            <div className="app-boot-panel__spinner-wrap">
              <span className="app-boot-panel__spinner-label">boot</span>
              <span className="app-boot-spinner-frame">{spinnerFrame}</span>
            </div>
          </div>

          <div className="app-boot-panel__copy">
            Loading workspace modules...
          </div>

          <div className="app-boot-progress">
            <div
              className="app-boot-progress__fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="app-boot-panel__meta">
            <span className="app-boot-panel__meta-label">status: active</span>
            <span className="app-boot-panel__meta-value">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppBootOverlay({ children }) {
  const [showBoot, setShowBoot] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  const progressIntervalRef = useRef(null);
  const spinnerIntervalRef = useRef(null);
  const finishTimeoutRef = useRef(null);

  useEffect(() => {
    const lastSeen = Number(sessionStorage.getItem(STORAGE_KEY) || 0);
    const now = Date.now();
    const shouldShow = !lastSeen || now - lastSeen > BOOT_COOLDOWN_MS;

    if (!shouldShow) return;

    setShowBoot(true);

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

      sessionStorage.setItem(STORAGE_KEY, String(Date.now()));

      setTimeout(() => setShowBoot(false), 350);
    }, 4400);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearInterval(spinnerIntervalRef.current);
      clearTimeout(finishTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showBoot) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [showBoot]);

  return (
    <>
      {children}
      {showBoot && (
        <AppBootScreen
          progress={progress}
          spinnerFrame={SPINNER_FRAMES[spinnerIndex]}
        />
      )}
    </>
  );
}
