import { useEffect, useRef, useState } from "react";
import HowItWorksCard from "../../ui/HowItWorksCard";
import phoneQrImage from "../../../assets/icons/phone-qr-code.png";
import customerExpImage from "../../../assets/icons/customer-experience.png";
import ratingImage from "../../../assets/icons/rating.png";
import TerminalPill from "../../ui/TerminalPill";

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    title: "Intercept Friction Before It Becomes Public.",
    copy: "Our Smart Routing engine identifies sentiment in real time. Unhappy customers are instantly connected to your support team, while positive experiences are guided into the public review flow.",
    bullets: ["Sentiment-Based Redirection", "Instant Internal Notifications"],
    icon: customerExpImage,
    accent: "terminal-card-green",
    side: "left",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    title: "Physical World, Digital Precision.",
    copy: "Bridge the gap with Dynamic QR Tech. Print it once, update the destination forever. Track exactly which table, shelf, or agent generated each interaction with granular location intelligence.",
    bullets: ["Dynamic Link Management", "High-Resolution Print Ready"],
    icon: phoneQrImage,
    accent: "terminal-card-purple",
    side: "right",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    title: "Data That Drives the Bottom Line.",
    copy: "Stop guessing why people love or leave you. ReviewBit's predictive analytics surface the recurring themes in your customer feedback, giving you a roadmap for operational improvement.",
    bullets: ["Theme Detection", "Operational Insight Mapping"],
    icon: ratingImage,
    accent: "terminal-card-green",
    side: "left",
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function HowItWorks() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [progressPx, setProgressPx] = useState(0);

  useEffect(() => {
    const updateLineProgress = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();

      const viewportCenter = window.innerHeight * 0.5;
      const timelineTopInViewport = timelineRect.top;
      const timelineHeight = timelineRect.height;

      const rawProgress = viewportCenter - timelineTopInViewport;
      const clampedProgress = clamp(rawProgress, 0, timelineHeight);

      if (sectionRect.top > viewportCenter) {
        setProgressPx(0);
        return;
      }

      if (sectionRect.bottom <= viewportCenter) {
        setProgressPx(timelineHeight);
        return;
      }

      setProgressPx(clampedProgress);
    };

    updateLineProgress();

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateLineProgress();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateLineProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateLineProgress);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSteps((prev) => {
          const next = new Set(prev);

          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.stepIndex);

            if (entry.isIntersecting) {
              next.add(index);
            }
          });

          return [...next];
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateActiveStep = () => {
      if (!stepRefs.current.length) return;

      const triggerY = window.innerHeight * 0.5;
      let currentActive = 0;

      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        const rect = step.getBoundingClientRect();
        const rowTop = rect.top;
        const rowBottom = rect.bottom;

        if (rowTop <= triggerY && rowBottom >= triggerY) {
          currentActive = index;
        } else if (rowTop <= triggerY) {
          currentActive = index;
        }
      });

      setActiveStep(currentActive);
    };

    updateActiveStep();

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveStep();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rb-how grid-canvas grid-canvas--flow bg-theme_clr_1"
      style={{ "--rb-how-progress-px": `${progressPx}px` }}
    >
      <div className="rb-how__inner">
        <div className="rb-how__heading">
          <TerminalPill label="flow.log" />

          <div className="mt-8 text-center">
            <h2 className="section-title">The Intelligent Ecosystem</h2>
            <p className="section-subtitle mt-4">
              Three core pillars of intelligence designed to intercept friction
              and amplify satisfaction across every customer touchpoint.
            </p>
          </div>
        </div>

        <div ref={timelineRef} className="rb-how__timeline">
          <div className="rb-how__line" aria-hidden="true">
            <span className="rb-how__line-track" />
            <span className="rb-how__line-fill" />
          </div>

          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isVisible = visibleSteps.includes(index);

            return (
              <div
                key={step.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                data-step-index={index}
                className={[
                  "rb-how__row",
                  step.side === "right"
                    ? "rb-how__row--right"
                    : "rb-how__row--left",
                  isVisible ? "is-visible" : "",
                  activeStep === index ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="rb-how__col rb-how__col--visual">
                  <HowItWorksCard accent={step.accent} variant="visual" />
                </div>

                <div className="rb-how__col rb-how__col--content">
                  <HowItWorksCard
                    title={step.title}
                    accent={step.accent}
                    variant="content"
                    chapter={step.chapter}
                    bullets={step.bullets}
                    icon={step.icon}
                  >
                    {step.copy}
                  </HowItWorksCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
