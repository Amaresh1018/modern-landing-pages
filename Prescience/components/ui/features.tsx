'use client'

import React from "react"
import { Spotlight } from "@/components/ui/spotlight-hover"
import { Shield, BrainCircuit, Atom, Sparkles } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
}

function FeatureCard({ title, description, icon, badge }: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-8 backdrop-blur-sm transition-all hover:border-white/10">
      {/* Dynamic Hover Spotlight Glow from Ibelick */}
      <Spotlight 
        className="from-cyan-500/15 via-indigo-500/10 to-transparent" 
        size={350} 
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          {/* Icon wrapper */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider border border-cyan-500/30 text-cyan-300 bg-cyan-500/10 rounded-full px-2.5 py-0.5">
              {badge}
            </span>
          )}
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>

      <div className="relative z-10 mt-8 flex items-center text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
        Learn more <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="w-full py-24 bg-black relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-4 uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
            Our Pillars of Scientific Innovation
          </h2>
          <p className="mt-4 text-neutral-400 text-base md:text-lg leading-relaxed">
            We bridge physics-based modeling and deep neural networks to speed up R&D from months to days.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="PRinS³ Software Suite"
            description="Tailored for drug discovery experts, this AI-driven suite incorporates NCE designing, scalable physics-based virtual screening, and cloud-scale HPC support."
            badge="Software"
            icon={<BrainCircuit className="h-6 w-6" />}
          />
          <FeatureCard
            title="R&D Services"
            description="Accelerate innovation and hit sustainability goals. We use multiscale computational chemistry to model enzymes, materials, alloys, formulations, and polymers."
            badge="Consulting"
            icon={<Atom className="h-6 w-6" />}
          />
          <FeatureCard
            title="Digital Transformation"
            description="Integrate custom data stacks and physics-informed ML models to transform existing research data into predictive decisions and high-yield innovations."
            badge="Enterprise"
            icon={<Shield className="h-6 w-6" />}
          />
        </div>
      </div>
    </section>
  )
}
