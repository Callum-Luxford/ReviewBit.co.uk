import { useEffect, useRef } from "react";

function SolarOrbits({
  size = 640,
  top = "50%",
  left = "50%",
  right = "auto",
  bottom = "auto",
  translateX = "-50%",
  translateY = "-50%",
  className = "",
}) {
  const resolvedSize = typeof size === "number" ? `${size}px` : size;
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Restart all SVG animations
    const animations = svg.querySelectorAll("animateMotion");

    animations.forEach((anim) => {
      try {
        anim.beginElement();
      } catch (e) {
        // silent fail (Safari safety)
      }
    });
  }, []);

  return (
    <div
      className={`rb-solar ${className}`.trim()}
      aria-hidden="true"
      style={{
        width: resolvedSize,
        height: resolvedSize,
        top,
        left,
        right,
        bottom,
        transform: `translate(${translateX}, ${translateY})`,
      }}
    >
      <svg
        ref={svgRef}
        className="rb-solar__svg"
        viewBox="0 0 640 590"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id="rbSolarGlowOrange"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="rbSolarGlowBlue"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="rbSolarGlowPurple"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <path
            id="rb-solar-orbit-outer"
            d="
              M 525 305
              a 165 135 0 1 1 -330 0
              a 165 135 0 1 1 330 0
            "
          />
          <path
            id="rb-solar-orbit-middle"
            d="
              M 485 305
              a 125 100 0 1 1 -250 0
              a 125 100 0 1 1 250 0
            "
          />
          <path
            id="rb-solar-orbit-inner"
            d="
              M 448 305
              a 88 70 0 1 1 -176 0
              a 88 70 0 1 1 176 0
            "
          />
        </defs>

        <use
          href="#rb-solar-orbit-outer"
          className="rb-solar__ring rb-solar__ring--outer"
        />
        <use
          href="#rb-solar-orbit-middle"
          className="rb-solar__ring rb-solar__ring--middle"
        />
        <use
          href="#rb-solar-orbit-inner"
          className="rb-solar__ring rb-solar__ring--inner"
        />

        <circle
          className="rb-solar__dot rb-solar__dot--outer"
          r="4.5"
          filter="url(#rbSolarGlowOrange)"
        >
          <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
            <mpath href="#rb-solar-orbit-outer" />
          </animateMotion>
        </circle>

        <circle
          className="rb-solar__dot rb-solar__dot--middle"
          r="4.5"
          filter="url(#rbSolarGlowBlue)"
        >
          <animateMotion dur="13s" repeatCount="indefinite" rotate="auto">
            <mpath href="#rb-solar-orbit-middle" />
          </animateMotion>
        </circle>

        <circle
          className="rb-solar__dot rb-solar__dot--inner"
          r="4.5"
          filter="url(#rbSolarGlowPurple)"
        >
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#rb-solar-orbit-inner" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
}

export default SolarOrbits;
