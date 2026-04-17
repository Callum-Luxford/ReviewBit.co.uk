import { useEffect, useMemo, useState } from "react";

const ORBITS = [
  {
    id: "outer",
    rx: 170,
    ry: 54,
    rotate: -10,
    speed: 0.0016,
    start: 0.2,
    color: "var(--accent-primary)",
    glow: "rgba(var(--accent-primary-rgb), 0.22)",
    stroke: "rgba(var(--accent-primary-rgb), 0.34)",
    nodeRadius: 6,
  },
  {
    id: "mid",
    rx: 132,
    ry: 42,
    rotate: 8,
    speed: -0.0021,
    start: 1.9,
    color: "var(--accent-secondary)",
    glow: "rgba(var(--accent-secondary-rgb), 0.2)",
    stroke: "rgba(var(--accent-secondary-rgb), 0.3)",
    nodeRadius: 5,
  },
  {
    id: "inner",
    rx: 98,
    ry: 30,
    rotate: -16,
    speed: 0.0026,
    start: 4.1,
    color: "var(--accent-tertiary)",
    glow: "rgba(var(--accent-tertiary-rgb), 0.18)",
    stroke: "rgba(var(--accent-tertiary-rgb), 0.28)",
    nodeRadius: 4.5,
  },
];

const CENTER = { x: 260, y: 250 };
const ORB_RADIUS = 78;
const SCENE_SCALE = 1.8;

const VIEWBOX_PADDING = 56;
const VIEWBOX_SIZE = 520 + VIEWBOX_PADDING * 2;
const VIEWBOX_MIN = -VIEWBOX_PADDING;

/*
  We keep the rings split into back/front segments so the 3D effect stays.
  Using butt caps removes the tiny seam dots you saw with round caps.
*/
const FRONT_START = 0;
const FRONT_END = Math.PI;
const BACK_START = Math.PI;
const BACK_END = Math.PI * 2;

function rotatePoint(x, y, cx, cy, degrees) {
  const rad = (degrees * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;

  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

function pointOnEllipse(cx, cy, rx, ry, angle, rotate) {
  const x = cx + rx * Math.cos(angle);
  const y = cy + ry * Math.sin(angle);
  return rotatePoint(x, y, cx, cy, rotate);
}

function ellipseArcPath(cx, cy, rx, ry, rotate, startAngle, endAngle) {
  const start = pointOnEllipse(cx, cy, rx, ry, startAngle, rotate);
  const end = pointOnEllipse(cx, cy, rx, ry, endAngle, rotate);

  const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
  const sweepFlag = 1;

  return [
    `M ${start.x} ${start.y}`,
    `A ${rx} ${ry} ${rotate} ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`,
  ].join(" ");
}

function buildOrbitState(t) {
  return ORBITS.map((orbit) => {
    const angle = orbit.start + t * orbit.speed;

    const point = pointOnEllipse(
      CENTER.x,
      CENTER.y,
      orbit.rx,
      orbit.ry,
      angle,
      orbit.rotate,
    );

    return {
      ...orbit,
      angle,
      point,
      isFront: Math.sin(angle) > 0,
    };
  });
}

function renderNode(node, keyPrefix) {
  return (
    <g
      key={`${node.id}-${keyPrefix}`}
      opacity="0.94"
      filter="url(#rb-node-glow)"
    >
      <circle
        cx={node.point.x}
        cy={node.point.y}
        r={node.nodeRadius * 2.65}
        fill={node.glow}
      />
      <circle
        cx={node.point.x}
        cy={node.point.y}
        r={node.nodeRadius}
        fill={node.color}
      />
    </g>
  );
}

export default function ReviewOrbitCore({ className = "" }) {
  const [orbitState, setOrbitState] = useState(() => buildOrbitState(0));
  const [spinOffset, setSpinOffset] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;

      setOrbitState(buildOrbitState(elapsed));

      /*
        Faster than before so the orb actually reads as moving,
        but still slow enough to stay premium/subtle.
      */
      setSpinOffset((elapsed * 0.018) % 120);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const backNodes = useMemo(
    () => orbitState.filter((node) => !node.isFront),
    [orbitState],
  );

  const frontNodes = useMemo(
    () => orbitState.filter((node) => node.isFront),
    [orbitState],
  );

  return (
    <div className={`review-orbit-core ${className}`}>
      <svg
        viewBox={`${VIEWBOX_MIN} ${VIEWBOX_MIN} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="review-orbit-core__svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="rb-orb-fill" cx="34%" cy="26%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.99)" />
            <stop offset="10%" stopColor="rgba(255,245,235,0.97)" />
            <stop offset="24%" stopColor="rgba(255,217,186,0.94)" />
            <stop offset="46%" stopColor="rgba(255,170,98,0.96)" />
            <stop offset="67%" stopColor="rgba(201,108,46,0.99)" />
            <stop offset="84%" stopColor="rgba(66,33,16,1)" />
            <stop offset="100%" stopColor="rgba(8,8,9,1)" />
          </radialGradient>

          <radialGradient id="rb-orb-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,245,235,0.50)" />
            <stop offset="36%" stopColor="rgba(255,214,180,0.22)" />
            <stop offset="68%" stopColor="rgba(255,162,92,0.08)" />
            <stop offset="100%" stopColor="rgba(255,162,92,0)" />
          </radialGradient>

          <radialGradient id="rb-floor-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,162,92,0.30)" />
            <stop offset="34%" stopColor="rgba(255,162,92,0.14)" />
            <stop offset="62%" stopColor="rgba(255,162,92,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="rb-scene-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,162,92,0.09)" />
            <stop offset="36%" stopColor="rgba(255,162,92,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id="rb-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          <filter id="rb-blur-md" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <filter
            id="rb-node-glow"
            x="-240%"
            y="-240%"
            width="580%"
            height="580%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="rb-orb-surface-blur"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
          >
            <feGaussianBlur stdDeviation="6.5" />
          </filter>

          <clipPath id="rb-orb-clip">
            <circle cx={CENTER.x} cy={CENTER.y} r={ORB_RADIUS} />
          </clipPath>

          <pattern
            id="rb-orb-band-pattern-main"
            patternUnits="userSpaceOnUse"
            width="120"
            height="160"
            x="0"
            y="0"
          >
            <ellipse
              cx="18"
              cy="42"
              rx="54"
              ry="5.5"
              fill="rgba(255,236,220,0.11)"
            />
            <ellipse
              cx="62"
              cy="56"
              rx="66"
              ry="6.5"
              fill="rgba(255,182,116,0.10)"
            />
            <ellipse
              cx="104"
              cy="70"
              rx="72"
              ry="6.5"
              fill="rgba(116,44,18,0.14)"
            />
            <ellipse
              cx="32"
              cy="86"
              rx="64"
              ry="6.5"
              fill="rgba(255,218,192,0.08)"
            />
            <ellipse
              cx="88"
              cy="102"
              rx="60"
              ry="6.5"
              fill="rgba(90,34,14,0.14)"
            />
            <ellipse
              cx="48"
              cy="118"
              rx="70"
              ry="6.5"
              fill="rgba(255,168,96,0.10)"
            />
            <ellipse
              cx="108"
              cy="134"
              rx="56"
              ry="5.5"
              fill="rgba(255,232,212,0.08)"
            />
          </pattern>

          <pattern
            id="rb-orb-band-pattern-secondary"
            patternUnits="userSpaceOnUse"
            width="120"
            height="160"
            x="0"
            y="0"
          >
            <ellipse
              cx="14"
              cy="58"
              rx="38"
              ry="4.5"
              fill="rgba(255,255,255,0.045)"
            />
            <ellipse
              cx="64"
              cy="84"
              rx="46"
              ry="4.5"
              fill="rgba(62,24,10,0.10)"
            />
            <ellipse
              cx="112"
              cy="108"
              rx="40"
              ry="4.5"
              fill="rgba(255,214,188,0.04)"
            />
          </pattern>
        </defs>

        <g
          transform={`translate(${CENTER.x} ${CENTER.y}) scale(${SCENE_SCALE}) translate(${-CENTER.x} ${-CENTER.y})`}
        >
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="140"
            fill="url(#rb-scene-glow)"
            filter="url(#rb-blur-lg)"
            opacity="0.85"
          />

          <ellipse
            cx={CENTER.x}
            cy={CENTER.y + 118}
            rx="94"
            ry="18"
            fill="url(#rb-floor-glow)"
            filter="url(#rb-blur-md)"
            opacity="0.95"
          />

          {/* BACK RING SEGMENTS */}
          {ORBITS.map((orbit) => (
            <path
              key={`${orbit.id}-back`}
              d={ellipseArcPath(
                CENTER.x,
                CENTER.y,
                orbit.rx,
                orbit.ry,
                orbit.rotate,
                BACK_START,
                BACK_END,
              )}
              fill="none"
              stroke={orbit.stroke}
              strokeWidth="1.55"
              strokeLinecap="butt"
              opacity="0.94"
            />
          ))}

          {/* BACK NODES */}
          {backNodes.map((node) => renderNode(node, "back-node"))}

          {/* ORB */}
          <g>
            {/* main solid body */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={ORB_RADIUS}
              fill="url(#rb-orb-fill)"
            />

            {/* seamless axial spin using true SVG patterns */}
            <g clipPath="url(#rb-orb-clip)">
              <g opacity="0.62" filter="url(#rb-orb-surface-blur)">
                <rect
                  x={CENTER.x - ORB_RADIUS - 140 - spinOffset}
                  y={CENTER.y - ORB_RADIUS - 26}
                  width={ORB_RADIUS * 2 + 280}
                  height={ORB_RADIUS * 2 + 52}
                  fill="url(#rb-orb-band-pattern-main)"
                />
              </g>

              <g opacity="0.34" filter="url(#rb-orb-surface-blur)">
                <rect
                  x={CENTER.x - ORB_RADIUS - 140 - spinOffset * 0.78}
                  y={CENTER.y - ORB_RADIUS - 26}
                  width={ORB_RADIUS * 2 + 280}
                  height={ORB_RADIUS * 2 + 52}
                  fill="url(#rb-orb-band-pattern-secondary)"
                />
              </g>

              {/* stronger wrap shading so the movement reads as sphere rotation */}
              <ellipse
                cx={CENTER.x - 54}
                cy={CENTER.y}
                rx="22"
                ry="90"
                fill="rgba(255,255,255,0.02)"
                filter="url(#rb-orb-surface-blur)"
                opacity="0.18"
              />
              <ellipse
                cx={CENTER.x + 62}
                cy={CENTER.y}
                rx="40"
                ry="94"
                fill="rgba(0,0,0,0.28)"
                filter="url(#rb-orb-surface-blur)"
                opacity="0.98"
              />
            </g>

            {/* subtle dark body pass so nodes behind do not show through */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={ORB_RADIUS - 1}
              fill="rgba(0,0,0,0.10)"
              opacity="0.22"
            />

            {/* outer rim */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={ORB_RADIUS - 4}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              opacity="0.22"
            />

            {/* softened highlight */}
            <ellipse
              cx={CENTER.x - 18}
              cy={CENTER.y - 26}
              rx="18"
              ry="14"
              fill="rgba(255,255,255,0.18)"
              filter="url(#rb-blur-md)"
              opacity="0.42"
            />

            {/* very soft core glow only */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="12"
              fill="url(#rb-orb-core)"
              opacity="0.12"
            />
          </g>

          {/* FRONT RING SEGMENTS */}
          {ORBITS.map((orbit) => (
            <path
              key={`${orbit.id}-front`}
              d={ellipseArcPath(
                CENTER.x,
                CENTER.y,
                orbit.rx,
                orbit.ry,
                orbit.rotate,
                FRONT_START,
                FRONT_END,
              )}
              fill="none"
              stroke={orbit.stroke}
              strokeWidth="1.55"
              strokeLinecap="butt"
              opacity="0.94"
            />
          ))}

          {/* FRONT NODES */}
          {frontNodes.map((node) => renderNode(node, "front-node"))}
        </g>
      </svg>
    </div>
  );
}
