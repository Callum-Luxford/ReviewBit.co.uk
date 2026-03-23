import TestimonialCard from "../../ui/TestimonialCard";
import TerminalPill from "../../ui/TerminalPill";

const topRowTestimonials = [
  {
    id: 1,
    name: "After a Completed Job",
    role: "SERVICE_WORKFLOW",
    quote:
      "Send customers directly to your review page immediately after a job is finished using a QR code or link.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 2,
    name: "At Checkout",
    role: "IN_STORE_FLOW",
    quote:
      "Display a QR code at the counter so satisfied customers can quickly leave a review before they leave.",
    avatar: "",
    accent: "cyan",
  },
  {
    id: 3,
    name: "Post-Purchase Follow Up",
    role: "AUTOMATION",
    quote:
      "Automatically send review requests after a purchase or booking to capture feedback at the right moment.",
    avatar: "",
    accent: "green",
  },
];

const bottomRowTestimonials = [
  {
    id: 4,
    name: "Client Onboarding",
    role: "AGENCY_USE",
    quote:
      "Agencies can integrate review flows into onboarding to help clients build trust from day one.",
    avatar: "",
    accent: "green",
  },
  {
    id: 5,
    name: "Event-Based Feedback",
    role: "EVENT_CAPTURE",
    quote:
      "Capture reviews instantly at events, appointments, or services while the experience is still fresh.",
    avatar: "",
    accent: "purple",
  },
  {
    id: 6,
    name: "Multi-Location Businesses",
    role: "SCALING",
    quote:
      "Manage and direct customers to the correct review pages across multiple locations with ease.",
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

            <h2 className="section-title">How Businesses Use ReviewBit</h2>

            <p className="section-subtitle mt-4">
              Real-world ways businesses use ReviewBit to capture more reviews
              and feedback.
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
