import ProofStripCard from "../../ui/ProofStripCard";

export default function ProofStrip() {
  return (
    <section className="section bg-theme_clr_2 w-full">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        <div className="section-inner flex flex-col items-center">
          <div className="terminal-section-pill">
            <div className="terminal-section-pill-dots">
              <span
                className="terminal-section-pill-dot"
                style={{ backgroundColor: "#ff5f57" }}
              />
              <span
                className="terminal-section-pill-dot"
                style={{ backgroundColor: "#febc2e" }}
              />
              <span
                className="terminal-section-pill-dot"
                style={{ backgroundColor: "#28c840" }}
              />
            </div>

            <span>trending.log</span>
          </div>

          <div className="mt-8 text-center">
            <h2 className="terminal-proof-title">Trending Signals</h2>
            <p className="terminal-proof-copy mt-4">
              The most important review patterns businesses using Review.sh are
              focusing on right now.
            </p>
          </div>

          <div className="mt-14 grid w-full gap-6 md:grid-cols-3">
            <ProofStripCard
              accent="terminal-card-cyan"
              eyebrow="COLLECTION"
              title="Capture feedback faster"
              metaLeft="256 signals"
              metaRight="Collection"
            >
              Prompt happy customers at the right moment and increase the chance
              of getting valuable responses before intent fades.
            </ProofStripCard>

            <ProofStripCard
              accent="terminal-card-purple"
              eyebrow="AUTOMATION"
              title="Automate follow-ups"
              metaLeft="189 signals"
              metaRight="Automation"
            >
              Build a smart review flow that keeps nudging customers without
              adding extra manual work to your day-to-day process.
            </ProofStripCard>

            <ProofStripCard
              accent="terminal-card-green"
              eyebrow="REPUTATION"
              title="Spot risk before it spreads"
              metaLeft="342 signals"
              metaRight="Reputation"
            >
              Catch unhappy sentiment early and route issues privately before
              they turn into public negative reviews that damage trust.
            </ProofStripCard>
          </div>
        </div>
      </div>
    </section>
  );
}
