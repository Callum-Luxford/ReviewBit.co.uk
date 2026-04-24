import HeroContent from "../components/home/content/HeroContent";
import TimelineFeature from "../components/home/content/TimelinesFeature";
import HowItWorks from "../components/home/content/HowItWorks";
import StartToday from "../components/home/content/StartToday";
import ProofStrip from "../components/home/content/ProofStrip";
import Testimonials from "../components/home/content/Testimonials";
import Pricing from "../components/home/content/Pricing";
import Features from "../components/home/content/Features";
import GridBand from "../components/layout/GridBand";

function Home() {
  return (
    <section className="relative overflow-x-clip">
      <HeroContent />

      <GridBand className="rb-grid-band--no-border-top" />

      <HowItWorks />

      <GridBand size="md" />

      <Features />

      <GridBand size="md" />

      <ProofStrip />

      {/* <Testimonials /> */}

      <GridBand size="md" />

      <Pricing />

      <GridBand size="lg" />

      <div className="max-w-[1400px] mx-auto w-full px-4">
        <StartToday />
      </div>
    </section>
  );
}

export default Home;
