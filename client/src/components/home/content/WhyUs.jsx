import HexCard from "../../ui/HexCard";
import WhyUsCard from "../../ui/WhyUsCard";
import qrIcon from "../../../assets/icons/qr-code.png";
import anywhereIcon from "../../../assets/icons/anywhere.png";
import settingIcon from "../../../assets/icons/setting.png";

export default function WhyUs() {
  return (
    <section data-glow="bl" className="section mt-40">
      <div className="grid gap-6 md:grid-cols-3">
        <WhyUsCard image={qrIcon} title="Turn Scans into Reviews">
          Customers scan → tap → review. Zero friction. Higher completion.
        </WhyUsCard>

        <WhyUsCard image={anywhereIcon} title="Works Anywhere">
          Table tents, receipts, emails, windows. One QR — many touchpoints.
        </WhyUsCard>

        <WhyUsCard image={settingIcon} title="Simple Setup">
          Create → print → scan. No apps. No training. No nonsense.
        </WhyUsCard>
      </div>
    </section>
  );
}
