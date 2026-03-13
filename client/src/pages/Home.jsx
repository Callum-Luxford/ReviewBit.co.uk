import HeroContent from "../components/home/content/HeroContent";
import TimelineFeature from "../components/home/content/TimelinesFeature";
import HowItWorks from "../components/home/content/HowItWorks";
import StartToday from "../components/home/content/StartToday";
import ProofStrip from "../components/home/content/ProofStrip";
import Testimonials from "../components/home/content/Testimonials";

function Home() {
  return (
    <section className="relative overflow-x-clip">
      {/* HeroSection */}
      <HeroContent />

      {/* Proof Strip */}
      <ProofStrip />

      {/* Testimonials */}
      <Testimonials />

      {/* How it Works */}
      <HowItWorks />
      
      {/* constrained sections after hero */}
      <div className="max-w-[1400px] mx-auto w-full px-4">
        {/* Start Today */}
        <StartToday />
      </div>
    </section>
  );
}

export default Home;
