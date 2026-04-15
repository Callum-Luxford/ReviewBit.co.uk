import { Link } from "react-router-dom";
import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from "react";

const base =
  "relative inline-flex items-center justify-center rounded-md border font-medium transition-all duration-300 ease-out focus:outline-none";

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
} as const;

type Accent = keyof typeof accents;
type Size = keyof typeof sizes;
type Mode = "outline" | "hover-fill" | "solid" | "solid-hover-outline";

type CTAButtonProps = {
  to?: string;
  children: ReactNode;
  accent?: Accent;
  size?: Size;
  mode?: Mode;
  className?: string;
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton({
  to,
  children,
  accent = "green",
  size = "md",
  mode = "outline",
  className = "",
  type = "button",
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

  const sharedClasses = "border-[var(--btn-border)]";
  const charcoalBg = "bg-[rgba(24,25,29,0.9)]";

  const outlineClasses = `${charcoalBg} text-[var(--btn-text)]`;

  const hoverFillClasses = `${charcoalBg} text-[var(--btn-text)] hover:bg-[var(--btn-bg)] hover:text-black hover:shadow-[0_0_18px_var(--btn-glow)]`;

  const solidClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_18px_var(--btn-glow)]";

  const solidHoverOutlineClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_18px_var(--btn-glow)] hover:bg-[rgba(24,25,29,0.9)] hover:text-[var(--btn-text)]";

  const modeClasses =
    mode === "solid"
      ? solidClasses
      : mode === "hover-fill"
        ? hoverFillClasses
        : mode === "solid-hover-outline"
          ? solidHoverOutlineClasses
          : outlineClasses;

  const classes = `${base} ${s} ${sharedClasses} ${modeClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} style={cssVars}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} style={cssVars} {...props}>
      {children}
    </button>
  );
}