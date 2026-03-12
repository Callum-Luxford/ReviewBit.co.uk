import CTAButton from "../../buttons/CtaButton";
import heroImage from "../../../assets/images/phone-qr-scan.png";
import bgImage from "../../../assets/images/background-1.png";
import ParticlesBackground from "../../effects/ParticlesBackground";

function HeroContent() {
  return (
    <section className="hero-section py-12 relative isolate z-10 overflow-hidden pt-24 px-4">
      {/* Full-width hero background */}
      {/* <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,76,255,0.16)_0%,rgba(56,40,150,0.10)_34%,rgba(0,0,0,0)_72%)]"
        style={{
          top: "clamp(-220px, -18vw, -80px)",
          width: "clamp(520px, 88vw, 1280px)",
          height: "clamp(320px, 54vw, 780px)",
          filter: "blur(clamp(70px, 8vw, 120px))",
        }}
      /> */}

      {/* <img
        src={bgImage}
        className="absolute w-full h-full top-0 left-0"
      ></img> */}

      {/* Hero content */}
      <div className="hero-content relative z-10 grid grid-cols-1 gap-6 items-center">
        <div className="grid-left min-w-0 flex flex-col gap-4 text-center mx-auto w-full max-w-[1200px]">
          <h1 className="text-4xl md:text-8xl font-bold mt-20 text-text_clr_1">
            More Reviews. Less Effort.
          </h1>

          <p className="text-xl md:text-2xl text-text_clr_1">
            Let customers scan, review, and boost your reputation in seconds.
          </p>

          <div className="cta-btns flex gap-2 justify-center items-center">
            <CTAButton
              to="/signup"
              variant="primary"
              size="md"
              className="md:text-xl"
            >
              Get Started
            </CTAButton>

            <CTAButton
              to="/login"
              variant="secondary"
              size="md"
              className="md:text-xl"
            >
              Business Login
            </CTAButton>
          </div>
        </div>

        <div className="grid-right relative flex justify-center">
          <div className="relative w-full max-w-[1200px] aspect-[10/7] md:aspect-[10/6]">
            {/* Image + particles share the same centered wrapper */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="relative w-full max-w-[980px]">
                {/* Particles stage */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 64% at 50% 52%, black 12%, rgba(0,0,0,0.82) 34%, rgba(0,0,0,0.35) 58%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 70% 64% at 50% 52%, black 12%, rgba(0,0,0,0.82) 34%, rgba(0,0,0,0.35) 58%, transparent 100%)",
                  }}
                >
                  <ParticlesBackground />
                </div>

                {/* Image */}
                <img
                  src={heroImage}
                  alt="reviewbear flow"
                  className="relative z-10 w-full h-auto object-contain opacity-95"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 60% 56% at 50% 46%, black 12%, rgba(0,0,0,0.9) 32%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.15) 66%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 60% 56% at 50% 46%, black 12%, rgba(0,0,0,0.9) 32%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.15) 66%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
