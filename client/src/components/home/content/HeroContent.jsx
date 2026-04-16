// ===== VERTICLE STACKING ======
// ===== VERTICLE STACKING ======
// ===== VERTICLE STACKING ======

// import { Link } from "react-router-dom";
// import { ReactTyped } from "react-typed";
// import TerminalWindow from "../../ui/TerminalWindow";
// import CTAButton from "../../buttons/CtaButton";

// function HeroContent() {
//   return (
//     <section className="relative isolate overflow-hidden px-4 pb-16 pt-40">
//       {/* terminal background */}
//       <div className="terminal-hero-bg">
//         <div className="terminal-hero-grid absolute inset-0" />
//         <div className="terminal-hero-scanline" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-[1400px]">
//         <div className="mx-auto flex max-w-[1100px] gap-8 flex-col items-center text-center">
//           {/* command pill */}
//           <div className="terminal-command-pill">
//             $ init --premium-reviews
//           </div>

//           {/* hero title */}
//           <h1 className="terminal-hero-title max-w-[1400px]">
//             Boost Your Reviews
//             <span className="terminal-hero-accent mt-2">
//               <ReactTyped
//                 strings={["With Less Effort", "Less Hassle", "On Autopilot"]}
//                 typeSpeed={50}
//                 backSpeed={35}
//                 backDelay={2000}
//                 loop
//               />
//             </span>
//           </h1>

//           {/* copy */}
//           <p className="terminal-hero-copy">
//             Let customers scan, leave a review, and grow your reputation in
//             seconds.
//           </p>

//           {/* ctas */}
//           <div className="flex flex-col items-center gap-4 sm:flex-row">
//             <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
//               ▶ Start Exploring
//             </CTAButton>

//             <CTAButton to="/login" accent="purple" mode="hover-fill">
//               ▣ Watch Demo
//             </CTAButton>
//           </div>

//           {/* terminal window */}
//           <TerminalWindow />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroContent;

// ===== SIDEBYSIDE STACKING ======
// ===== SIDEBYSIDE STACKING ======
// ===== SIDEBYSIDE STACKING ======

import { ReactTyped } from "react-typed";
import CTAButton from "../../buttons/CtaButton";

function HeroContent() {
  return (
    <section className="rb-hero border-b border-white/10">
      <div className="rb-hero__bg" />
      <div className="rb-hero__grid" />
      <div className="rb-hero__scanline" />

      <div className="rb-hero__decor rb-hero__decor--left" aria-hidden="true" />
      <div
        className="rb-hero__decor rb-hero__decor--right"
        aria-hidden="true"
      />

      <div
        className="rb-hero__floating rb-hero__floating--top"
        aria-hidden="true"
      >
        <span className="rb-hero__floating-dot rb-hero__floating-dot--tertiary" />
        Smart routing live
      </div>

      <div
        className="rb-hero__floating rb-hero__floating--middle"
        aria-hidden="true"
      >
        <span className="rb-hero__floating-dot rb-hero__floating-dot--primary" />
        Follow-up queued
      </div>

      <div
        className="rb-hero__floating rb-hero__floating--bottom"
        aria-hidden="true"
      >
        <span className="rb-hero__floating-dot rb-hero__floating-dot--secondary" />
        Private feedback captured
      </div>

      <div className="rb-hero__inner">
        <div className="rb-hero__content">
          <div className="rb-hero__left">
            <div className="rb-hero__badge">
              <span className="rb-hero__badge-dot" />
              New: Automated Review Routing
            </div>

            <h1 className="rb-hero__title">
              <span className="rb-hero__title-line">
                Turn customer sentiment into
              </span>
              <span className="rb-hero__accent">
                <ReactTyped
                  strings={["Smarter Flow", "Better Reviews", "Faster Growth"]}
                  typeSpeed={48}
                  backSpeed={28}
                  backDelay={2600}
                  loop
                />
              </span>
            </h1>

            <p className="rb-hero__copy">
              ReviewBit helps you route happy customers toward public reviews,
              capture private feedback before it spreads, and automate the
              follow-up flow that keeps your reputation moving forward.
            </p>

            <div className="rb-hero__feature-list-box">
              <div className="rb-hero__feature-list">
                <div className="rb-hero__feature-item">
                  <span className="rb-hero__feature-dot rb-hero__feature-dot--primary" />
                  Route positive customers to Google and other review platforms
                </div>

                <div className="rb-hero__feature-item">
                  <span className="rb-hero__feature-dot rb-hero__feature-dot--secondary" />
                  Capture complaints privately so your team can respond first
                </div>

                <div className="rb-hero__feature-item">
                  <span className="rb-hero__feature-dot rb-hero__feature-dot--tertiary" />
                  Trigger reminders automatically when customers do not respond
                </div>
              </div>
            </div>

            <div className="rb-hero__actions">
              <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
                Start Free Trial
              </CTAButton>

              <CTAButton to="/login" accent="purple" mode="hover-fill">
                ▶ See Demo
              </CTAButton>
            </div>

            <p className="rb-hero__note">
              14-day free trial. No credit card required.
            </p>

            <div className="rb-hero__trust-row">
              <div className="rb-hero__trust-pill">
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--primary" />
                Public review routing
              </div>

              <div className="rb-hero__trust-pill">
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--secondary" />
                Private feedback capture
              </div>

              <div className="rb-hero__trust-pill">
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--tertiary" />
                Automated follow-up ready
              </div>
            </div>
          </div>

          <div className="rb-hero__right" aria-hidden="true">
            <div className="rb-hero-visual">
              <div className="rb-hero-visual__incoming rb-hero-visual__incoming--one" />
              <div className="rb-hero-visual__incoming rb-hero-visual__incoming--two" />
              <div className="rb-hero-visual__incoming rb-hero-visual__incoming--three" />

              <div className="rb-hero-visual__trail rb-hero-visual__trail--one" />
              <div className="rb-hero-visual__trail rb-hero-visual__trail--two" />
              <div className="rb-hero-visual__trail rb-hero-visual__trail--three" />

              <div className="rb-hero-visual__node rb-hero-visual__node--one" />
              <div className="rb-hero-visual__node rb-hero-visual__node--two" />
              <div className="rb-hero-visual__node rb-hero-visual__node--three" />
              <div className="rb-hero-visual__node rb-hero-visual__node--four" />

              <div className="rb-hero-visual__orbit" />

              <div className="rb-hero-visual__card rb-hero-visual__card--feedback">
                <div className="rb-hero-visual__card-label">
                  Incoming review
                </div>
                <div className="rb-hero-visual__feedback-title">
                  Customer sentiment detected
                </div>
                <p className="rb-hero-visual__feedback-copy">
                  “Amazing service. Fast response and really helpful from start
                  to finish.”
                </p>

                <div className="rb-hero-visual__signal-row">
                  <span className="rb-hero-visual__signal rb-hero-visual__signal--positive">
                    Positive
                  </span>
                  <span className="rb-hero-visual__signal rb-hero-visual__signal--primary">
                    Public review
                  </span>
                </div>
              </div>

              <div className="rb-hero-visual__card rb-hero-visual__card--engine">
                <div className="rb-hero-visual__engine-icon">✦</div>
                <div className="rb-hero-visual__engine-title">
                  ReviewBit Engine
                </div>
                <div className="rb-hero-visual__engine-subtitle">
                  Analyse → classify → route → follow up
                </div>

                <div className="rb-hero-visual__engine-bars">
                  <div className="rb-hero-visual__engine-bar">
                    <span>Positive intent</span>
                    <div className="rb-hero-visual__engine-track">
                      <div className="rb-hero-visual__engine-fill rb-hero-visual__engine-fill--primary" />
                    </div>
                  </div>

                  <div className="rb-hero-visual__engine-bar">
                    <span>Private recovery</span>
                    <div className="rb-hero-visual__engine-track">
                      <div className="rb-hero-visual__engine-fill rb-hero-visual__engine-fill--secondary" />
                    </div>
                  </div>

                  <div className="rb-hero-visual__engine-bar">
                    <span>Follow-up automation</span>
                    <div className="rb-hero-visual__engine-track">
                      <div className="rb-hero-visual__engine-fill rb-hero-visual__engine-fill--tertiary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rb-hero-visual__card rb-hero-visual__card--result">
                <div className="rb-hero-visual__result-kicker">
                  Resolved action
                </div>
                <div className="rb-hero-visual__result-title">
                  Google review request sent
                </div>
                <div className="rb-hero-visual__result-meta">
                  5★ customer routed successfully
                </div>
              </div>

              <div className="rb-hero-visual__card rb-hero-visual__card--metric">
                <div className="rb-hero-visual__metric-number">+38%</div>
                <div className="rb-hero-visual__metric-label">
                  More public reviews in 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
