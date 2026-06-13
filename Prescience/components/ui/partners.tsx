'use client'

import React from "react"
import { Beaker, GraduationCap, Shield, Dna, Atom, Sparkles } from "lucide-react"

interface PartnerItem {
  name: string
  role: string
  icon: React.ReactNode
}

const PARTNERS: PartnerItem[] = [
  { name: "Hindustan Unilever", role: "Industrial R&D Partner", icon: <Beaker className="h-4 w-4" /> },
  { name: "J.K. Tyre", role: "Materials Formulation Partner", icon: <Atom className="h-4 w-4" /> },
  { name: "Titan Company", role: "Advanced Alloys Partner", icon: <Sparkles className="h-4 w-4" /> },
  { name: "IIT Kanpur", role: "Academic Partner", icon: <GraduationCap className="h-4 w-4" /> },
  { name: "SERB India", role: "Govt Research Board", icon: <Shield className="h-4 w-4" /> },
  { name: "Hasetri Research", role: "Materials Testing Partner", icon: <Dna className="h-4 w-4" /> },
  { name: "Octa Sciences", role: "Organic Synthesis Partner", icon: <Beaker className="h-4 w-4" /> },
  { name: "CSIR Labs", role: "National Research Lab", icon: <Shield className="h-4 w-4" /> }
]

export function Partners() {
  return (
    <section id="partners" className="w-full py-20 bg-black/95 border-t border-b border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-10">
          Our Innovation & Research Partners
        </h3>

        {/* Marquee Container */}
        <div className="relative flex w-full overflow-hidden mask-fade">
          {/* Moving logos wrapper */}
          <div className="flex animate-marquee whitespace-nowrap gap-8 py-4">
            {/* First sequence */}
            {PARTNERS.map((partner, idx) => (
              <div 
                key={`p1-${idx}`} 
                className="inline-flex items-center gap-3 bg-zinc-950/40 border border-white/5 backdrop-blur-md px-5 py-3 rounded-xl hover:border-cyan-500/20 hover:bg-zinc-900/40 transition-all cursor-default"
              >
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  {partner.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">{partner.name}</div>
                  <div className="text-[10px] text-neutral-500 font-medium">{partner.role}</div>
                </div>
              </div>
            ))}
            {/* Duplicate sequence for infinite loop */}
            {PARTNERS.map((partner, idx) => (
              <div 
                key={`p2-${idx}`} 
                className="inline-flex items-center gap-3 bg-zinc-950/40 border border-white/5 backdrop-blur-md px-5 py-3 rounded-xl hover:border-cyan-500/20 hover:bg-zinc-900/40 transition-all cursor-default"
              >
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  {partner.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">{partner.name}</div>
                  <div className="text-[10px] text-neutral-500 font-medium">{partner.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Faders for left and right edges */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Add Custom marquee keyframe in CSS wrapper */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
