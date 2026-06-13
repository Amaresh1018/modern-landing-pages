import { MolecularCanvas } from "@/components/ui/molecular-canvas";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-slate-950/[0.96] border-white/5 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#22d3ee"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <div className="inline-flex max-w-fit items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-4 uppercase tracking-wider">
            AI-POWERED INSILICO SCIENCE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight leading-[1.15]">
            Discover, Innovate & Accelerate
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-sm md:text-base leading-relaxed">
            Crafting Strategic Intellectual Property for Commercial Success. 
            We design new chemical entities and predict advanced materials using state-of-the-art physics-informed ML models.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#features" 
              className="inline-flex h-10 items-center justify-center rounded-full bg-cyan-400 px-6 text-xs font-semibold text-black transition-all hover:bg-cyan-300"
            >
              Explore PRinS³ Suite
            </a>
            <a 
              href="#services" 
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-xs font-semibold text-white transition-all hover:bg-white/10"
            >
              R&D Services
            </a>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-[250px] md:h-full">
          <MolecularCanvas />
        </div>
      </div>
    </Card>
  )
}

