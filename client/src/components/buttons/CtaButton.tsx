import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const base =
  "relative inline-flex items-center justify-center gap-2 px-2 py-1.5 rounded-md font-medium transition-all duration-300 ease-out focus:outline-none";

const variants = {
  primary: `
    bg-[rgba(8,12,32,0.7)]
    text-white
    border border-white/50
  `,
  secondary: `
    gradient-border
    text-white
    bg-[rgba(8,12,32,0.6)]
    backdrop-blur-md 
  `,
} as const;
type Variant = keyof typeof variants;

const sizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl",
  xxxl: "text-3xl",
} as const;
type Size = keyof typeof sizes;

type ButtonType = "button" | "submit" | "reset";

type CTAButtonProps = {
  to?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: ButtonType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: CTAButtonProps) {
  const v = variants[variant] ?? variants.primary;
  const s = sizes[size] ?? sizes.md;
  const classes = `${base} ${v} ${s} ${className}`;

  // Link mode (simple + clean)
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  // Button mode (forward normal button props)
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
