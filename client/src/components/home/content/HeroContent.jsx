import { Link } from "react-router-dom";
import TerminalWindow from "../../ui/TerminalWindow";

function HeroContent() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-40">
      {/* terminal background */}
      <div className="terminal-hero-bg">
        <div className="terminal-hero-grid absolute inset-0" />
        <div className="terminal-hero-scanline" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          {/* command pill */}
          <div className="terminal-command-pill mb-8">
            $ init --premium-reviews
          </div>

          {/* hero title */}
          <h1 className="terminal-hero-title max-w-[1400px]">
            Boost Your Reviews
            <span className="terminal-hero-accent mt-2">
              With less effort
              <span className="terminal-cursor-block" />
            </span>
          </h1>

          {/* copy */}
          <p className="terminal-hero-copy mt-6">
            Let customers scan, leave a review, and grow your reputation in
            seconds.
          </p>

          {/* ctas */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/signup" className="terminal-hero-btn-primary">
              <span>▶</span>
              <span>./start_reviewing</span>
            </Link>

            <Link to="/login" className="terminal-hero-btn-secondary">
              <span>▣</span>
              <span>Read_Docs</span>
            </Link>
          </div>

          {/* terminal window */}
          <TerminalWindow />
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
