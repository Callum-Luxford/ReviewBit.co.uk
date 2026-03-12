import ProofStripCard from "../../ui/ProofStripCard";
import customerFeedbackImage from "../../../assets/icons/customer-feedback.png";
import automationImage from "../../../assets/icons/automation.png";
import favouriteImage from "../../../assets/icons/favorite.png";
export default function ProofStrip() {
  return (
    <section className="section mt-24 -mb-48">
      <div className="grid gap-6 md:grid-cols-3">
        <ProofStripCard
          className="md:translate-y-[-75px]"
          image={customerFeedbackImage}
          title={"Increase review response rates"}
        >
          Capture feedback before customers leave.
        </ProofStripCard>
        <ProofStripCard
          className="md:translate-y-[-25px]"
          image={automationImage}
          title={"Automate follow-ups"}
        >
          Smart reminders ensure no opportunity for feedback is missed.
        </ProofStripCard>
        <ProofStripCard
          className="md:translate-y-[25px]"
          image={favouriteImage}
          title={"Reduce negative public reviews"}
        >
          Protect your reputation by resolving issues privately first.
        </ProofStripCard>
      </div>
    </section>
  );
}
