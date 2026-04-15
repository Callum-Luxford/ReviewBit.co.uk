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

      <div className="rb-hero__inner">
        <div className="rb-hero__badge">
          <span className="rb-hero__badge-dot" />
          New: Automated Review Routing
        </div>

        <h1 className="rb-hero__title">
          <span className="rb-hero__title-line">Turn feedback into</span>
          <span className="rb-hero__accent">
            <ReactTyped
              strings={["Better Reviews", "Faster Growth", "Smart Automation"]}
              typeSpeed={48}
              backSpeed={28}
              backDelay={2600}
              loop
            />
          </span>
        </h1>

        <p className="rb-hero__copy">
          Automatically route happy customers to public review sites while
          capturing negative feedback privately. Protect your reputation and
          grow your business.
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
      </div>
    </section>
  );
}

export default HeroContent;
