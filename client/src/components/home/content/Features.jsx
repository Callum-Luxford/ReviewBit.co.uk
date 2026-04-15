import { useEffect, useMemo, useRef, useState } from "react";
import TerminalPill from "../../ui/TerminalPill";
import FeatureRow from "../../ui/FeatureRow";

const features = [
  {
    title: "Smart Review Routing",
    copy: "Automatically guide happy customers to Google while routing issues into a private feedback path before they go public.",
    bullets: [
      "Send positive responses to your review destination",
      "Route unhappy customers into private follow-up",
      "Keep the review flow fast and friction-free",
    ],
    accent: "purple",
    visualImage: "/images/features/routing-preview.webp",
    visualAlt: "Review routing interface preview",
    visualTitle: "routing.engine.sys",
    buttonText: "VIEW_ROUTING",
    reverse: false,
  },
  {
    title: "Dynamic QR Cards",
    copy: "Use printed QR cards or direct links to collect reviews wherever your business interacts with customers.",
    bullets: [
      "Great for counters, desks and takeaway bags",
      "Easy to share after a completed job",
      "Simple way to increase review requests consistently",
    ],
    accent: "green",
    visualImage: "/images/features/qr-preview.webp",
    visualAlt: "Dynamic QR card preview",
    visualTitle: "qr.card.node",
    buttonText: "CREATE_QR",
    reverse: true,
  },
  {
    title: "Private Feedback Capture",
    copy: "Collect internal feedback that only you can see, so you can fix issues before they become public negative reviews.",
    bullets: [
      "Capture concerns in a private form",
      "Resolve problems before reputation damage",
      "Build trust through better follow-up",
    ],
    accent: "cyan",
    visualImage: "/images/features/feedback-preview.webp",
    visualAlt: "Private feedback capture preview",
    visualTitle: "feedback.capture",
    buttonText: "CAPTURE_FEEDBACK",
    reverse: false,
  },
  {
    title: "Deep Analytics Dashboard",
    copy: "Track review flow performance, private feedback trends and overall customer sentiment from one simple dashboard.",
    bullets: [
      "Monitor review activity over time",
      "Spot issues and improvement opportunities",
      "See trends without digging through messages",
    ],
    accent: "green",
    visualImage: "/images/features/analytics-preview.webp",
    visualAlt: "Analytics dashboard preview",
    visualTitle: "analytics.dashboard",
    buttonText: "VIEW_ANALYTICS",
    reverse: true,
  },
];

function buildConnectorData(container, cards) {
  if (!container || cards.length < 2) return [];

  const containerRect = container.getBoundingClientRect();
  const isMobile = window.innerWidth < 768;

  const laneGap = isMobile ? 14 : 18;
  const halfGap = laneGap / 2;
  const mobileCenterOffset = laneGap;

  const getPointSet = (rect) => {
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;

    return {
      left,
      top,
      width,
      height,
      topCenter: {
        x: left + width * 0.5,
        y: top,
      },
      bottomCenter: {
        x: left + width * 0.5,
        y: top + height,
      },
    };
  };

  const buildRoundedElbowPath = ({
    startX,
    startY,
    endX,
    endY,
    laneY,
    radius,
  }) => {
    const verticalDirection = laneY > startY ? 1 : -1;
    const horizontalDirection = endX > startX ? 1 : -1;
    const finalVerticalDirection = endY > laneY ? 1 : -1;

    const safeRadius = Math.max(
      6,
      Math.min(
        radius,
        Math.abs(laneY - startY) / 2,
        Math.abs(endX - startX) / 2,
        Math.abs(endY - laneY) / 2,
      ),
    );

    const beforeFirstCornerY = laneY - safeRadius * verticalDirection;
    const afterFirstCornerX = startX + safeRadius * horizontalDirection;

    const beforeSecondCornerX = endX - safeRadius * horizontalDirection;
    const afterSecondCornerY = laneY + safeRadius * finalVerticalDirection;

    return [
      `M ${startX} ${startY}`,
      `L ${startX} ${beforeFirstCornerY}`,
      `Q ${startX} ${laneY} ${afterFirstCornerX} ${laneY}`,
      `L ${beforeSecondCornerX} ${laneY}`,
      `Q ${endX} ${laneY} ${endX} ${afterSecondCornerY}`,
      `L ${endX} ${endY}`,
    ].join(" ");
  };

  return cards.slice(0, -1).map((card, index) => {
    const nextCard = cards[index + 1];

    const current = getPointSet(card.getBoundingClientRect());
    const next = getPointSet(nextCard.getBoundingClientRect());

    if (isMobile) {
      const centerX = current.left + current.width * 0.5;
      const startY = current.top + current.height;
      const endY = next.top;

      const xA = centerX - mobileCenterOffset;
      const xB = centerX;
      const xC = centerX + mobileCenterOffset;

      const pathA = `M ${xA} ${startY} L ${xA} ${endY}`;
      const pathB = `M ${xB} ${startY} L ${xB} ${endY}`;
      const pathC = `M ${xC} ${startY} L ${xC} ${endY}`;

      const midY = startY + (endY - startY) * 0.5;

      return {
        pathA,
        pathB,
        pathC,
        dotsA: [
          { x: xA, y: midY - 10 },
          { x: xA, y: midY + 10 },
        ],
        dotsB: [
          { x: xB, y: midY - 10 },
          { x: xB, y: midY + 10 },
        ],
        dotsC: [
          { x: xC, y: midY - 10 },
          { x: xC, y: midY + 10 },
        ],
      };
    }

    const start = current.bottomCenter;
    const end = next.topCenter;

    const midY = (start.y + end.y) / 2;
    const goingRight = end.x > start.x;
    const cornerRadius = 18;

    const greenStartX = goingRight ? start.x + halfGap : start.x - halfGap;
    const blueStartX = goingRight ? start.x - halfGap : start.x + halfGap;

    const greenEndX = goingRight ? end.x + halfGap : end.x - halfGap;
    const blueEndX = goingRight ? end.x - halfGap : end.x + halfGap;

    const greenY = midY - halfGap;
    const blueY = midY + halfGap;

    const purpleStartX = goingRight
      ? greenStartX + laneGap
      : greenStartX - laneGap;

    const purpleEndX = goingRight ? greenEndX + laneGap : greenEndX - laneGap;

    const purpleY = greenY - laneGap;

    const pathA = buildRoundedElbowPath({
      startX: greenStartX,
      startY: start.y,
      endX: greenEndX,
      endY: end.y,
      laneY: greenY,
      radius: cornerRadius,
    });

    const pathB = buildRoundedElbowPath({
      startX: blueStartX,
      startY: start.y,
      endX: blueEndX,
      endY: end.y,
      laneY: blueY,
      radius: cornerRadius,
    });

    const pathC = buildRoundedElbowPath({
      startX: purpleStartX,
      startY: start.y,
      endX: purpleEndX,
      endY: end.y,
      laneY: purpleY,
      radius: cornerRadius,
    });

    const dotsA = [
      {
        x: greenStartX + (greenEndX - greenStartX) * 0.38,
        y: greenY,
      },
      {
        x: greenStartX + (greenEndX - greenStartX) * 0.68,
        y: greenY,
      },
    ];

    const dotsB = [
      {
        x: blueStartX + (blueEndX - blueStartX) * 0.38,
        y: blueY,
      },
      {
        x: blueStartX + (blueEndX - blueStartX) * 0.68,
        y: blueY,
      },
    ];

    const dotsC = [
      {
        x: purpleStartX + (purpleEndX - purpleStartX) * 0.38,
        y: purpleY,
      },
      {
        x: purpleStartX + (purpleEndX - purpleStartX) * 0.68,
        y: purpleY,
      },
    ];

    return {
      pathA,
      pathB,
      pathC,
      dotsA,
      dotsB,
      dotsC,
    };
  });
}

function FeatureCircuitOverlay({ containerRef }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const cards = Array.from(
        container.querySelectorAll(".feature-row__visual-wrap"),
      );

      setPaths(buildConnectorData(container, cards));
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(container);

    const cards = container.querySelectorAll(".feature-row__visual-wrap");
    cards.forEach((card) => resizeObserver.observe(card));

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef]);

  const viewBox = useMemo(() => {
    const el = containerRef.current;
    if (!el) return "0 0 100 100";
    return `0 0 ${el.offsetWidth} ${el.offsetHeight}`;
  }, [paths, containerRef]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const runnerRx = isMobile ? 14 : 22;
  const runnerRy = isMobile ? 1.6 : 2.1;

  const runnerDurA = isMobile ? "1.9s" : "1.35s";
  const runnerDurB = isMobile ? "1.9s" : "1.35s";
  const runnerDurC = isMobile ? "1.9s" : "1.35s";

  if (!paths.length) return null;

  return (
    <svg
      className="feature-circuit-overlay"
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((item, index) => (
        <g key={index}>
          <defs>
            <mask id={`feature-runner-mask-a-${index}`}>
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <path
                d={item.pathA}
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>

            <mask id={`feature-runner-mask-b-${index}`}>
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <path
                d={item.pathB}
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>

            <mask id={`feature-runner-mask-c-${index}`}>
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <path
                d={item.pathC}
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          </defs>

          <path
            d={item.pathA}
            className="feature-circuit-trace feature-circuit-trace--a feature-circuit-trace--glow"
          />
          <path
            d={item.pathB}
            className="feature-circuit-trace feature-circuit-trace--b feature-circuit-trace--glow"
          />
          <path
            d={item.pathC}
            className="feature-circuit-trace feature-circuit-trace--c feature-circuit-trace--glow"
          />

          <path
            d={item.pathA}
            className="feature-circuit-trace feature-circuit-trace--a feature-circuit-trace--base"
          />
          <path
            d={item.pathB}
            className="feature-circuit-trace feature-circuit-trace--b feature-circuit-trace--base"
          />
          <path
            d={item.pathC}
            className="feature-circuit-trace feature-circuit-trace--c feature-circuit-trace--base"
          />

          <path
            d={item.pathA}
            className="feature-circuit-trace feature-circuit-trace--a feature-circuit-trace--core"
          />
          <path
            d={item.pathB}
            className="feature-circuit-trace feature-circuit-trace--b feature-circuit-trace--core"
          />
          <path
            d={item.pathC}
            className="feature-circuit-trace feature-circuit-trace--c feature-circuit-trace--core"
          />

          {item.dotsA.map((dot, dotIndex) => (
            <circle
              key={`a-dot-${dotIndex}`}
              cx={dot.x}
              cy={dot.y}
              r="4.5"
              className="feature-circuit-static-dot feature-circuit-static-dot--a"
            />
          ))}

          {item.dotsB.map((dot, dotIndex) => (
            <circle
              key={`b-dot-${dotIndex}`}
              cx={dot.x}
              cy={dot.y}
              r="4.5"
              className="feature-circuit-static-dot feature-circuit-static-dot--b"
            />
          ))}

          {item.dotsC.map((dot, dotIndex) => (
            <circle
              key={`c-dot-${dotIndex}`}
              cx={dot.x}
              cy={dot.y}
              r="4.5"
              className="feature-circuit-static-dot feature-circuit-static-dot--c"
            />
          ))}

          <g mask={`url(#feature-runner-mask-a-${index})`}>
            <ellipse
              rx={runnerRx}
              ry={runnerRy}
              className="feature-circuit-runner feature-circuit-runner--a"
            >
              <animateMotion
                dur={runnerDurA}
                repeatCount="indefinite"
                rotate="auto"
                path={item.pathA}
              />
            </ellipse>
          </g>

          <g mask={`url(#feature-runner-mask-b-${index})`}>
            <ellipse
              rx={runnerRx}
              ry={runnerRy}
              className="feature-circuit-runner feature-circuit-runner--b"
            >
              <animateMotion
                dur={runnerDurB}
                begin="0.14s"
                repeatCount="indefinite"
                rotate="auto"
                path={item.pathB}
              />
            </ellipse>
          </g>

          <g mask={`url(#feature-runner-mask-c-${index})`}>
            <ellipse
              rx={runnerRx}
              ry={runnerRy}
              className="feature-circuit-runner feature-circuit-runner--c"
            >
              <animateMotion
                dur={runnerDurC}
                begin="0.28s"
                repeatCount="indefinite"
                rotate="auto"
                path={item.pathC}
              />
            </ellipse>
          </g>
        </g>
      ))}
    </svg>
  );
}

function Features() {
  const pipelineRef = useRef(null);

  return (
    <section className="section bg-theme_clr_4 feature-section">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="flex flex-col items-center">
          <TerminalPill label="features.sys" />

          <div className="mt-8 text-center">
            <h2 className="section-title">ReviewBit Features</h2>
            <p className="section-subtitle mt-4">
              A connected review pipeline that helps you collect feedback, route
              customers correctly and understand what is happening across your
              business.
            </p>
          </div>
        </div>

        <div ref={pipelineRef} className="feature-pipeline mt-16">
          <FeatureCircuitOverlay containerRef={pipelineRef} />

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={[
                "feature-pipeline__segment",
                index === features.length - 1
                  ? "feature-pipeline__segment--last"
                  : "",
              ].join(" ")}
            >
              <FeatureRow {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
