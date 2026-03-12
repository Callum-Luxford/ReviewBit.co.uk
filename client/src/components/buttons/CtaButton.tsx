import { Link } from "react-router-dom";
import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from "react";

const base =
  "relative inline-flex items-center justify-center gap-2 border font-medium transition-all duration-300 ease-out focus:outline-none";

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
    border: "var(--accent-green-border)",
    text: "var(--accent-green)",
    bg: "var(--accent-green)",
    glow: "var(--accent-green-glow)",
  },
  cyan: {
    border: "var(--accent-cyan-border)",
    text: "var(--accent-cyan)",
    bg: "var(--accent-cyan)",
    glow: "var(--accent-cyan-glow)",
  },
  purple: {
    border: "var(--accent-purple-border)",
    text: "var(--accent-purple)",
    bg: "var(--accent-purple)",
    glow: "var(--accent-purple-glow)",
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
  const palette = accents[accent];
  const s = sizes[size] ?? sizes.md;

  const cssVars = {
    "--btn-bg": palette.bg,
    "--btn-text": palette.text,
    "--btn-border": palette.border,
    "--btn-glow": palette.glow,
  } as CSSProperties;

  const sharedClasses = "border-[var(--btn-border)]";

  const outlineClasses = "bg-[rgba(8,12,32,0.45)] text-[var(--btn-text)]";

  const hoverFillClasses =
    "bg-[rgba(8,12,32,0.45)] text-[var(--btn-text)] hover:bg-[var(--btn-bg)] hover:text-black hover:shadow-[0_0_15px_var(--btn-glow)]";

  const solidClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_15px_var(--btn-glow)]";

  const solidHoverOutlineClasses =
    "bg-[var(--btn-bg)] text-black shadow-[0_0_18px_var(--btn-glow)] hover:bg-[rgba(8,12,32,0.45)] hover:text-[var(--btn-text)] hover:shadow-[0_0_15px_var(--btn-glow)]";

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
