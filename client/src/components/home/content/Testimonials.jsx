import TestimonialCard from "../../ui/TestimonialCard";
import TerminalPill from "../../ui/TerminalPill";

const topRowTestimonials = [
  {
    id: 1,
    name: "James Carter",
    role: "OPERATIONS_MANAGER",
    quote:
      "Setup took a few minutes and the review flow just worked. We started collecting verified feedback the same day.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 2,
    name: "Daniel Hughes",
    role: "PRODUCT_MANAGER",
    quote:
      "We needed a simple way to capture customer reviews after onboarding. This made the process automatic.",
    avatar: "",
    accent: "cyan",
  },
  {
    id: 3,
    name: "Oliver Bennett",
    role: "SMALL_BUSINESS_OWNER",
    quote:
      "We added the QR flow to our checkout and reviews started coming in almost immediately.",
    avatar: "",
    accent: "green",
  },
];

const bottomRowTestimonials = [
  {
    id: 4,
    name: "Tom Walker",
    role: "BUSINESS_OWNER",
    quote:
      "The setup took minutes and the automation handled the rest. It’s easily the simplest review system we’ve used.",
    avatar: "",
    accent: "green",
  },
  {
    id: 5,
    name: "Mark Reynolds",
    role: "MARKETING_MANAGER",
    quote:
      "We wanted a cleaner way to ask happy customers for feedback. This removed the friction completely.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 6,
    name: "Chris Patel",
    role: "AGENCY_OWNER",
    quote:
      "We rolled it out for a few clients and the difference was immediate. Much easier to guide customers into leaving reviews.",
    avatar: "",
    accent: "cyan",
  },
];

export default function Testimonials() {
  const topTrack = [...topRowTestimonials, ...topRowTestimonials];
  const bottomTrack = [...bottomRowTestimonials, ...bottomRowTestimonials];

  return (
    <section className="section testimonials-section bg-theme_clr_1">
      {/* terminal background */}
      <div className="testimonial-hero-bg">
        <div className="testimonial-hero-grid absolute inset-0" />
        {/* <div className="testimonial-hero-scanline" /> */}
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="testimonials-section__inner">
          <div className="testimonials-section__heading">
            <div className="mb-8">
              <TerminalPill label="trust_stream.log" />
            </div>

            <h2 className="testimonials-section__title">USER_TESTIMONIALS</h2>

            <p className="testimonials-section__copy">
              Here’s what early users are saying about the ReviewBit experience.
            </p>
          </div>

          <div className="testimonials-marquee">
            <div className="testimonials-marquee__viewport">
              <div className="testimonials-marquee__track testimonials-marquee__track--left">
                {topTrack.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-top-${index}`}
                    name={testimonial.name}
                    role={testimonial.role}
                    quote={testimonial.quote}
                    avatar={testimonial.avatar}
                    accent={testimonial.accent}
                  />
                ))}
              </div>
            </div>

            <div className="testimonials-marquee__viewport">
              <div className="testimonials-marquee__track testimonials-marquee__track--right">
                {bottomTrack.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-bottom-${index}`}
                    name={testimonial.name}
                    role={testimonial.role}
                    quote={testimonial.quote}
                    avatar={testimonial.avatar}
                    accent={testimonial.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
