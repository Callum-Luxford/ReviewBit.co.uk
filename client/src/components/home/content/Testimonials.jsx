import TestimonialCard from "../../ui/TestimonialCard";

const topRowTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "TECH_LEAD",
    quote:
      "The terminal aesthetic combined with powerful analytics makes this the ultimate review platform for tech professionals.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "PRODUCT_MANAGER",
    quote:
      "ReviewBit transformed our product research process. The verification system is unmatched in the industry.",
    avatar: "",
    accent: "cyan",
  },
  {
    id: 3,
    name: "Alex Thompson",
    role: "STARTUP_FOUNDER",
    quote:
      "Finally, a review platform that speaks our language. The cyberpunk design and powerful features are perfect.",
    avatar: "",
    accent: "green",
  },
];

const bottomRowTestimonials = [
  {
    id: 4,
    name: "Ryan Delk",
    role: "FOUNDER_OPERATOR",
    quote:
      "The setup was straightforward and the review flow feels far more polished than the tools we used before.",
    avatar: "",
    accent: "green",
  },
  {
    id: 5,
    name: "Fabrizio Rinaldi",
    role: "GROWTH_LEAD",
    quote:
      "It gives us a cleaner way to guide happy customers into leaving feedback without adding friction to the process.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 6,
    name: "Jonathan Simcoe",
    role: "AGENCY_OWNER",
    quote:
      "A smart interface, clear flow, and a much stronger first impression for clients looking to collect reviews properly.",
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
            <div className="terminal-section-pill mb-4">
              <div className="terminal-section-pill-dots">
                <span className="terminal-section-pill-dot bg-red-400" />
                <span className="terminal-section-pill-dot bg-yellow-400" />
                <span className="terminal-section-pill-dot bg-green-400" />
              </div>
              <span>trust_stream.log</span>
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
