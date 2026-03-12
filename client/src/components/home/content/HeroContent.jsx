import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import TerminalWindow from "../../ui/TerminalWindow";
import CTAButton from "../../buttons/CtaButton";

function HeroContent() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-40">
      {/* terminal background */}
      <div className="terminal-hero-bg">
        <div className="terminal-hero-grid absolute inset-0" />
        <div className="terminal-hero-scanline" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mx-auto flex max-w-[1100px] gap-8 flex-col items-center text-center">
          {/* command pill */}
          <div className="terminal-command-pill">
            $ init --premium-reviews
          </div>

          {/* hero title */}
          <h1 className="terminal-hero-title max-w-[1400px]">
            Boost Your Reviews
            <span className="terminal-hero-accent mt-2">
              <ReactTyped
                strings={["With Less Effort", "Less Hassle", "On Autopilot"]}
                typeSpeed={50}
                backSpeed={35}
                backDelay={2000}
                loop
              />
            </span>
          </h1>

          {/* copy */}
          <p className="terminal-hero-copy">
            Let customers scan, leave a review, and grow your reputation in
            seconds.
          </p>

          {/* ctas */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
              ▶ Start Exploring
            </CTAButton>

            <CTAButton to="/login" accent="purple" mode="hover-fill">
              ▣ Watch Demo
            </CTAButton>
          </div>

          {/* terminal window */}
          <TerminalWindow />
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
