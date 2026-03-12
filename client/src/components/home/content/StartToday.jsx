import CTAButton from "../../buttons/CtaButton";
export default function StartToday() {
  return (
    <section className="section">
      {/* Heading */}
      <div className="flex flex-col gap-2 mb-16 text-center">
        <h1 className="text-text_clr_1 text-4xl">
          Start Gathering Feedback Today
        </h1>
        <h2 className="text-text_clr_3 text-xl">
          Send automated review requests and boost your Google reviews.
        </h2>
      </div>
      
      <div>
        <div className="cta-btns flex gap-2 justify-center">
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
    </section>
  );
}
