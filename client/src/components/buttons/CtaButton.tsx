import { Link } from "react-router-dom";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
} from "react";

const base =
  "relative inline-flex items-center justify-center border text-md transition-all duration-300 ease-out focus:outline-none focus-visible:outline-none active:scale-100 active:translate-y-0";

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3 text-lg",
  xl: "px-6 py-3.5 text-xl",
  xxl: "px-7 py-4 text-2xl",
  xxxl: "px-8 py-5 text-3xl",
} as const;

const accents = {
  green: {
    border: "rgba(255,162,92,0.28)",
    text: "#ffa25c",
    bg: "#ffa25c",
    glow: "rgba(255,162,92,0.22)",
  },
  cyan: {
    border: "rgba(90,156,181,0.28)",
    text: "#5a9cb5",
    bg: "#5a9cb5",
    glow: "rgba(90,156,181,0.22)",
  },
  purple: {
    border: "rgba(127,85,177,0.28)",
    text: "#7f55b1",
    bg: "#7f55b1",
    glow: "rgba(127,85,177,0.22)",
  },
  neutral: {
    border: "rgba(255,255,255,0.1)",
    text: "rgba(247,245,242,0.85)",
    bg: "rgba(255,255,255,0.025)",
    glow: "rgba(255,255,255,0.08)",
  },
} as const;

type Accent = keyof typeof accents;
type Size = keyof typeof sizes;
type Mode =
  | "outline"
  | "hover-fill"
  | "solid"
  | "solid-hover-outline"
  | "paired-switch";

type PairState = "active" | "inactive";

type CTAButtonProps = {
  to?: string;
  children: ReactNode;
  accent?: Accent;
  size?: Size;
  mode?: Mode;
  pairState?: PairState;
  className?: string;
  type?: "button" | "submit" | "reset";
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton({
  to,
  children,
  accent = "green",
  size = "md",
  mode = "outline",
  pairState = "inactive",
  className = "",
  type = "button",
  onMouseEnter,
  onMouseLeave,
  ...props
}: CTAButtonProps) {
  const palette = accents[accent] ?? accents.green;
  const s = sizes[size] ?? sizes.md;

  const cssVars = {
    "--btn-bg": palette.bg,
    "--btn-text": palette.text,
    "--btn-border": palette.border,
    "--btn-glow": palette.glow,
  } as CSSProperties;

  const sharedClasses = "border-[var(--btn-border)] select-none";
  const charcoalBg = "bg-[rgba(24,25,29,0.9)]";

  const outlineClasses = `${charcoalBg} text-[var(--btn-text)]`;

  const hoverFillClasses = `${charcoalBg} text-[var(--btn-text)] hover:bg-[var(--btn-bg)] hover:text-black hover:shadow-[0_0_18px_var(--btn-glow)]`;

  const solidClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_18px_var(--btn-glow)]";

  const solidHoverOutlineClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_18px_var(--btn-glow)] hover:bg-[rgba(24,25,29,0.9)] hover:text-[var(--btn-text)]";

  const pairedSwitchClasses =
    pairState === "active"
      ? "bg-[var(--accent-primary)] text-[#111111] border-[rgba(var(--accent-primary-rgb),0.3)] shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.07)]"
      : "bg-[rgba(255,255,255,0.025)] text-[rgba(247,245,242,0.85)] border-[rgba(255,255,255,0.1)] shadow-none";

  const modeClasses =
    mode === "solid"
      ? solidClasses
      : mode === "hover-fill"
        ? hoverFillClasses
        : mode === "solid-hover-outline"
          ? solidHoverOutlineClasses
          : mode === "paired-switch"
            ? pairedSwitchClasses
            : outlineClasses;

  const classes = `${base} ${s} ${sharedClasses} ${modeClasses} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        style={cssVars}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={cssVars}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
