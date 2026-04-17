import { ReactTyped } from "react-typed";
import CTAButton from "../../buttons/CtaButton";
import SolarOrbits from "../../../components/ui/SolarOrbits"

function HeroContent() {
  return (
    <section className="rb-hero border-b border-white/10">
      <div className="rb-hero__bg" />
      <div className="rb-hero__grid" />
      {/* <div className="rb-hero__scanline" /> */}

      <div className="rb-hero__decor rb-hero__decor--left" aria-hidden="true" />
      <div
        className="rb-hero__decor rb-hero__decor--right"
        aria-hidden="true"
      />

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

            {/* <SolarOrbits size={1500} />` */}

            <div className="rb-hero-visual rb-hero-visual--orb-scene">
              <div className="rb-hero-visual__scene-glow" />
              <div className="rb-hero-visual__scene-glow rb-hero-visual__scene-glow--secondary" />

              <div className="rb-hero-orb-system">
                <div className="rb-hero-orb-shadow" />
                <div className="rb-hero-orb-wrap">
                  <div className="rb-hero-orb">
                    <div className="rb-hero-orb__core" />
                    <div className="rb-hero-orb__halo" />
                  </div>
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