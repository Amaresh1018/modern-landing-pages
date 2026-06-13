import { Navbar } from "@/components/ui/navbar";
import { SplineSceneBasic } from "@/components/ui/demo";
import { Features } from "@/components/ui/features";
import { Partners } from "@/components/ui/partners";
import { HtsSimulator } from "@/components/ui/hts-simulator";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation bar */}
      <Navbar />

      {/* Hero section wrapping SplineSceneBasic */}
      <section id="hero" className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
        {/* Glowing aura background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplineSceneBasic />
        </div>
      </section>

      {/* Features section (Pillars) */}
      <section id="services">
        <Features />
      </section>

      {/* Partners Marquee Banner */}
      <Partners />

      {/* High-Throughput Screening Simulator Animation section */}
      <section id="simulator">
        <HtsSimulator />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

