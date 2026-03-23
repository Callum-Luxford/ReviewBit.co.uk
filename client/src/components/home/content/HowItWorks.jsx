import HowItWorksCard from "../../ui/HowItWorksCard";
import phoneQrImage from "../../../assets/icons/phone-qr-code.png";
import customerExpImage from "../../../assets/icons/customer-experience.png";
import ratingImage from "../../../assets/icons/rating.png";
import TerminalPill from "../../ui/TerminalPill";

function HowItWorks() {
  return (
    <section className="section bg-theme_clr_2">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="flex flex-col items-center">
          <TerminalPill label="flow.log" />

          <div className="mt-8 text-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle mt-4">
              A simple review flow that guides happy customers to Google and
              routes issues privately before they become public.
            </p>
          </div>

          <div className="mt-14 grid w-full gap-6 md:grid-cols-3">
            <HowItWorksCard
              image={phoneQrImage}
              title="Scan QR or open link"
              step="STEP_01"
              accent="terminal-card-cyan"
            >
              Customers scan the QR code on your card or open the direct link
              you send them after a completed job.
            </HowItWorksCard>

            <HowItWorksCard
              image={customerExpImage}
              title="Select experience"
              step="STEP_02"
              accent="terminal-card-purple"
            >
              They choose whether their experience was positive or whether they
              need help, keeping the flow quick and friction-free.
            </HowItWorksCard>

            <HowItWorksCard
              image={ratingImage}
              title="Leave a review"
              step="STEP_03"
              accent="terminal-card-green"
            >
              Happy customers are sent to Google, while unhappy customers are
              redirected into a private feedback route for follow-up.
            </HowItWorksCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
