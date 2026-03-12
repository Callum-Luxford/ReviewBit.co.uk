import type { ReactNode } from "react";
import { useId } from "react";

type HexCardProps = {
  children?: ReactNode;
  className?: string;
  size?: number;
  strokeWidth?: number;

  /**
   * Controls how wide the "safe area" is inside the hex (percentage of the card).
   * Smaller = more padding from angled edges.
   */
  contentWidthPct?: number; // default 74
};

const HEX_CLIP_PATH =
  "polygon(50% 2%, 98% 25%, 98% 75%, 50% 98%, 2% 75%, 2% 25%)";

function HexCard({
  children,
  className = "",
  size = 200,
  strokeWidth = 1.5,
  contentWidthPct = 74,
}: HexCardProps) {
  // Unique per instance so multiple HexCards on a page don’t clash gradient IDs
  const uid = useId();
  const gradId = `hexGradient-${uid}`;

  return (
    <div style={{ width: size, height: size }} className={`relative ${className}`}>
      {/* Outline */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
          >
            <stop offset="0%" stopColor="rgba(59, 160, 175, 1)" />
            <stop offset="100%" stopColor="rgba(82, 37, 165, 1)" />
          </linearGradient>
        </defs>

        <polygon
          points="50 2, 98 25, 98 75, 50 98, 2 75, 2 25"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content mask: clips everything to a hex so it can never bleed outside */}
      {children ? (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{
            WebkitClipPath: HEX_CLIP_PATH,
            clipPath: HEX_CLIP_PATH,
            overflow: "hidden",
          }}
        >
          {/* Safe area: keeps content away from angled edges */}
          <div
            className="text-center break-words [overflow-wrap:anywhere]"
            style={{
              width: `${contentWidthPct}%`,
            }}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HexCard;

