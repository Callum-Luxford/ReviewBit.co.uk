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

  const laneGap = 18; // adjust this freely
  const halfGap = laneGap / 2;

  const getPointSet = (rect) => {
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;

    return {
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

  return cards.slice(0, -1).map((card, index) => {
    const nextCard = cards[index + 1];

    const currentPoints = getPointSet(card.getBoundingClientRect());
    const nextPoints = getPointSet(nextCard.getBoundingClientRect());

    const start = currentPoints.bottomCenter;
    const end = nextPoints.topCenter;

    const midY = (start.y + end.y) / 2;
    const goingRight = end.x > start.x;

    // Mirror the X lanes depending on horizontal direction
    const greenStartX = goingRight ? start.x + halfGap : start.x - halfGap;
    const blueStartX = goingRight ? start.x - halfGap : start.x + halfGap;

    const greenEndX = goingRight ? end.x + halfGap : end.x - halfGap;
    const blueEndX = goingRight ? end.x - halfGap : end.x + halfGap;

    // Keep the horizontal lanes vertically separated
    const greenY = midY - halfGap;
    const blueY = midY + halfGap;

    const pathA = [
      `M ${greenStartX} ${start.y}`,
      `V ${greenY}`,
      `H ${greenEndX}`,
      `V ${end.y}`,
    ].join(" ");

    const pathB = [
      `M ${blueStartX} ${start.y}`,
      `V ${blueY}`,
      `H ${blueEndX}`,
      `V ${end.y}`,
    ].join(" ");

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

    return {
      pathA,
      pathB,
      dotsA,
      dotsB,
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
          <path
            d={item.pathA}
            className="feature-circuit-track-glow feature-circuit-track-glow--a"
          />
          <path
            d={item.pathB}
            className="feature-circuit-track-glow feature-circuit-track-glow--b"
          />

          <path
            d={item.pathA}
            className="feature-circuit-track feature-circuit-track--a"
          />
          <path
            d={item.pathB}
            className="feature-circuit-track feature-circuit-track--b"
          />

          {item.dotsA.map((dot, dotIndex) => (
            <circle
              key={`a-dot-${dotIndex}`}
              cx={dot.x}
              cy={dot.y}
              r="3.5"
              className="feature-circuit-static-dot feature-circuit-static-dot--a"
            />
          ))}

          {item.dotsB.map((dot, dotIndex) => (
            <circle
              key={`b-dot-${dotIndex}`}
              cx={dot.x}
              cy={dot.y}
              r="3.5"
              className="feature-circuit-static-dot feature-circuit-static-dot--b"
            />
          ))}

          <circle
            r="2.2"
            className="feature-circuit-runner feature-circuit-runner--a"
          >
            <animateMotion
              dur="1s"
              repeatCount="indefinite"
              path={item.pathA}
            />
          </circle>

          <circle
            r="2.2"
            className="feature-circuit-runner feature-circuit-runner--b"
          >
            <animateMotion
              dur="1s"
              begin="0.1s"
              repeatCount="indefinite"
              path={item.pathB}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function Features() {
  const pipelineRef = useRef(null);

  return (
    <section className="section bg-theme_clr_1 feature-section">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="flex flex-col items-center">
          <TerminalPill label="features.sys" />

          <div className="mt-8 text-center">
            <h2 className="terminal-proof-title">ReviewBit Features</h2>
            <p className="terminal-proof-copy mt-4">
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
