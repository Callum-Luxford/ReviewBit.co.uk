import CTAButton from "../../buttons/CtaButton";
export default function StartToday() {
  return (
    <section className="section">
      {/* Heading */}
      <div className="flex flex-col gap-2 mb-16 text-center">
        <h1 className="section-title">Start Gathering Feedback Today</h1>
        <h2 className="section-subtitle">
          Send automated review requests and boost your Google reviews.
        </h2>
      </div>

      <div>
        <div className="cta-btns flex gap-2 justify-center">
          <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
            GET_STARTED
          </CTAButton>

          <CTAButton to="/login" accent="purple" mode="hover-fill">
            LOGIN
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
