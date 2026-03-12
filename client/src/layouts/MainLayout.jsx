import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import SiteBackground from "../components/background/SiteBackground";
import ParticlesBackground from "../components/effects/ParticlesBackground";

function MainLayout() {
  return (
    <div className="min-h-screen app-shell">
      {/* <ParticlesBackground /> */}
      {/* <ParticlesBackground originId="hero-particles-origin" /> */}

      {/* Background */}
      {/* <SiteBackground /> */}
      <div className="glow-clip" aria-hidden="true">
        <div className="glow-layer">
          <div className="glow glow--tr" />
          <div className="glow glow--bl" />
          <div className="glow glow--br" />

          {/* new ones */}
          <div className="glow glow--midl" />
          <div className="glow glow--midr" />
          <div className="glow glow--lowl" />
        </div>
      </div>

      {/* Header for the layout applies to all sub pages */}
      <Header />

      {/* Main constrained content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Footer for the layout applies to all sub pages */}
      <Footer />
    </div>
  );
}

export default MainLayout;
