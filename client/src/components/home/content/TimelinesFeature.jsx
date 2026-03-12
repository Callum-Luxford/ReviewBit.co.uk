import sectionImage from "../../../assets/images/timeline-image.png";

function Step({ number, title, children }) {
  return (
    <div className="flex gap-6 items-start">
      {/* Circle */}
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-theme_clr_3 text-white font-semibold shrink-0">
        {number}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-text_clr_1 text-xl font-semibold">{title}</h3>
        <p className="text-text_clr_3 mt-1">{children}</p>
      </div>
    </div>
  );
}

export default function TimelineFeature() {
  return (
    <section className="section mt-40">
      {/* Heading */}
      <div className="flex flex-col gap-2 mb-16">
        <h1 className="text-text_clr_1 text-4xl">
          Send Review Requests on Autopilot.
        </h1>
        <h2 className="text-text_clr_3 text-xl">
          For every completed job, send a review request automatically.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div className="flex flex-col gap-12">
          <Step number="1" title="Add Customer">
            Just enter the customer's name and email — no complex forms.
          </Step>

          <Step number="2" title="We Send the Link">
            ReviewBear automatically sends a review request via SMS and email
            after the job is done.
          </Step>

          <Step number="3" title="Reviews Roll In">
            Watch as happy customers leave your business more Google reviews.
          </Step>
        </div>

        {/* RIGHT */}
        <div className="self-start">
          <img
            src={sectionImage}
            alt="Review automation"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
