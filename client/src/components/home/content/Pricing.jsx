import PricingCard from "../../ui/PricingCard";
import TerminalPill from "../../ui/TerminalPill";

const pricingPlans = [
  {
    name: "ROOT",
    price: "£0",
    billing: "/month",
    accent: "green",
    cta: "[START_FREE]",
    features: [
      "QR review link",
      "Basic review routing",
      "Private feedback capture",
      "Simple insights dashboard",
      "1 business profile",
    ],
  },
  {
    name: "PRO",
    price: "£29",
    billing: "/month",
    accent: "purple",
    featured: true,
    cta: "[UPGRADE_PRO]",
    features: [
      "Unlimited review scans",
      "Smart review routing",
      "Google review redirect",
      "Feedback analytics dashboard",
      "Custom branding",
      "Priority support",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    accent: "cyan",
    cta: "[CONTACT_SALES]",
    features: [
      "White-label setup",
      "Advanced reporting",
      "Bespoke onboarding",
      "Priority assistance",
      "Custom implementation options",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="section bg-theme_clr_1">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="flex flex-col items-center">
           <TerminalPill label="pricing.sys" />

          <div className="mt-8 text-center">
            <h2 className="terminal-proof-title">Select Plan</h2>
            <p className="terminal-proof-copy mt-4">
              Simple pricing for businesses that want more reviews and better
              customer feedback without adding friction to the process.
            </p>
          </div>

          <div className="mt-14 grid w-full gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                billing={plan.billing}
                features={plan.features}
                cta={plan.cta}
                accent={plan.accent}
                featured={plan.featured}
                onClick={() => {
                  console.log(`Selected plan: ${plan.name}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
