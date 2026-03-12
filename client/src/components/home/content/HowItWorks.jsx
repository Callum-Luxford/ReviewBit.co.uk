import HowItWorksCard from "../../ui/HowItWorksCard";
import phoneQrImage from "../../../assets/icons/phone-qr-code.png";
import customerExpImage from "../../../assets/icons/customer-experience.png";
import ratingImage from "../../../assets/icons/rating.png";
function HowItWorks() {
  return (
    <section className="section grid gap-8">
      {/* Heading */}
      <div className="flex flex-col gap-2 mb-16 text-center">
        <h1 className="text-text_clr_1 text-4xl">How It Works</h1>
        <h2 className="text-text_clr_3 text-xl">
          Designed to help businesses collect more positive reviews without
          chasing customers or manual follow-ups.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <HowItWorksCard image={phoneQrImage} title="Scan QR or open link">
          Customers scan the QR code from your card or click the link sent to
          their phone.
        </HowItWorksCard>

        <HowItWorksCard image={customerExpImage} title="Select Experience">
          Customer rates their experience as either positive or reports an
          issue.
        </HowItWorksCard>

        <HowItWorksCard image={ratingImage} title="Leave a Review">
          Happy customers go to Google. Unhappy cusomters provide private
          feedback.
        </HowItWorksCard>
      </div>
    </section>
  );
}

export default HowItWorks;
