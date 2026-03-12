import HeroContent from "../components/home/content/HeroContent";
import TimelineFeature from "../components/home/content/TimelinesFeature";
import HowItWorks from "../components/home/content/HowItWorks";
import StartToday from "../components/home/content/StartToday";
import ProofStrip from "../components/home/content/ProofStrip";
import BackgroundDiamonds from "../components/background/BackgroundDiamonds";

function Home() {
  return (
    <section className="relative overflow-x-clip">
      {/* <BackgroundDiamonds
        diamondSide="right"
        ticksSide="left"
        showDiamond={true}
        showTicks
        showHlines
        showSlants
        showHlinesTopRight={false}
        showHlinesBottomLeft={true}
      /> */}

      {/* HeroSection */}
      <HeroContent />

      {/* constrained sections after hero */}
      <div className="max-w-[1400px] mx-auto w-full px-4">
        {/* Proof Strip */}
        <ProofStrip />

        {/* How it Works */}
        <TimelineFeature />

        {/* How it Works */}
        <HowItWorks />

        {/* Start Today */}
        <StartToday />
      </div>
    </section>
  );
}

export default Home;
