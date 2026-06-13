'use client'

import React, { useEffect, useState, useRef } from "react"
import { Play, Pause, RefreshCw, Cpu, Activity, Database } from "lucide-react"

interface LogLine {
  id: number
  text: string
  type: 'info' | 'success' | 'checking'
}

export function HtsSimulator() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(250) // ms between screens
  const [screenCount, setScreenCount] = useState(250800)
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, text: "INITIALIZING HIGH-THROUGHPUT PIPELINE...", type: 'info' },
    { id: 2, text: "LOADED ACTIVE RECEPTOR: GLU-114 (PROTEIN_A)", type: 'info' },
    { id: 3, text: "ESTABLISHING CLOUD COMPUTER HPC INSTANCES...", type: 'info' }
  ])
  const [wellStates, setWellStates] = useState<('idle' | 'scanning' | 'hit')[]>(
    Array(24).fill('idle')
  )
  const [activeWell, setActiveWell] = useState<number | null>(null)

  const logIdRef = useRef(4)
  const terminalContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      // 1. Pick a random well cell to target
      const targetWellIdx = Math.floor(Math.random() * 24)
      setActiveWell(targetWellIdx)

      // 2. Set well state to scanning
      setWellStates((prev) => {
        const next = [...prev]
        next[targetWellIdx] = 'scanning'
        return next
      })

      // 3. Generate random compound ID and docking score
      const compoundId = 10000 + Math.floor(Math.random() * 89999)
      const affinity = (-(6.0 + Math.random() * 3.8)).toFixed(1)
      const isHit = parseFloat(affinity) <= -8.5

      // 4. Update logs
      setLogs((prev) => {
        const text = isHit
          ? `[HIT] Compound PR-${compoundId}: affinity ${affinity} kcal/mol (STRONGBIND)`
          : `[OK] Compound PR-${compoundId}: affinity ${affinity} kcal/mol`
        
        const next = [
          ...prev,
          {
            id: logIdRef.current++,
            text,
            type: isHit ? 'success' as const : 'checking' as const
          }
        ]
        // Cap logs at 30 items
        if (next.length > 30) next.shift()
        return next
      })

      // 5. Update well state after evaluation
      setTimeout(() => {
        setWellStates((prev) => {
          const next = [...prev]
          next[targetWellIdx] = isHit ? 'hit' : 'idle'
          return next
        })
      }, 150);

      // 6. Increment screened ticker count
      setScreenCount((c) => c + 1)
    }, speed)

    return () => clearInterval(interval)
  }, [isPlaying, speed])

  // Scroll terminal to bottom of its container only (does not hijack main window scroll)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight
    }
  }, [logs])

  const handleReset = () => {
    setWellStates(Array(24).fill('idle'))
    setScreenCount(250800)
    setLogs([
      { id: 1, text: "HTS PIPELINE REBOOTED.", type: 'info' },
      { id: 2, text: "LOADED ACTIVE RECEPTOR: GLU-114 (PROTEIN_A)", type: 'info' }
    ])
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Glow effects */}
      <div className="relative border border-white/5 rounded-2xl bg-slate-950/[0.96] p-8 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.02)]">
        {/* Dynamic scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(34,211,238,0.02)_50%,rgba(34,211,238,0.02))] bg-[length:100%_4px] pointer-events-none" />

        {/* Header HUD panel */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 mb-2 uppercase tracking-wider">
              PRinS³ Screening Core
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              HPC High-Throughput Docking Screen
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Physics-informed virtual screening executing ligand affinity calculations across 24 receptor wells in parallel.
            </p>
          </div>

          {/* Stats Readouts */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-neutral-500 flex items-center gap-1 justify-end">
                <Database className="h-3 w-3" /> Screened Count
              </div>
              <div className="text-lg font-bold font-mono text-cyan-400">
                {mounted ? screenCount.toLocaleString('en-US') : "250,800"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-neutral-500 flex items-center gap-1 justify-end">
                <Cpu className="h-3 w-3" /> Compute Rate
              </div>
              <div className="text-lg font-bold font-mono text-indigo-400">
                148.5K / sec
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Well Matrix Panel (Left) */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-cyan-400" /> Active Compound Matrix
              </h4>

              {/* 4x6 grid layout */}
              <div className="grid grid-cols-6 gap-3.5">
                {wellStates.map((state, idx) => {
                  let bgClass = "bg-zinc-950/40 border-white/5 text-neutral-600"
                  let shadowClass = ""

                  if (state === 'scanning') {
                    bgClass = "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                    shadowClass = "shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                  } else if (state === 'hit') {
                    bgClass = "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
                    shadowClass = "shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                  } else if (activeWell === idx) {
                    bgClass = "bg-indigo-500/20 border-indigo-400 text-indigo-200"
                  }

                  return (
                    <div
                      key={`well-${idx}`}
                      className={`h-11 rounded-lg border flex flex-col items-center justify-center text-[10px] font-mono transition-all duration-150 ${bgClass} ${shadowClass}`}
                    >
                      <div className="text-[8px] opacity-40">W{idx + 1}</div>
                      <div>{state === 'hit' ? 'HIT' : state === 'scanning' ? 'SCAN' : 'IDLE'}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Simulated controls panel */}
            <div className="mt-8 flex items-center gap-3.5 border-t border-white/5 pt-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`h-9 w-24 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all ${
                  isPlaying 
                    ? "bg-zinc-800 text-white hover:bg-zinc-700" 
                    : "bg-cyan-400 text-black hover:bg-cyan-300"
                }`}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlaying ? "Pause" : "Resume"}
              </button>

              <button
                onClick={handleReset}
                className="h-9 w-10 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 text-white"
                title="Reset Screen Counter"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>

              {/* Speed dials */}
              <div className="ml-auto flex items-center gap-1 bg-zinc-950 border border-white/5 p-1 rounded-lg">
                <button
                  onClick={() => setSpeed(500)}
                  className={`text-[9px] font-mono px-2 py-1 rounded transition-colors ${speed === 500 ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500"}`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => setSpeed(250)}
                  className={`text-[9px] font-mono px-2 py-1 rounded transition-colors ${speed === 250 ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500"}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setSpeed(100)}
                  className={`text-[9px] font-mono px-2 py-1 rounded transition-colors ${speed === 100 ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500"}`}
                >
                  2.5x
                </button>
              </div>
            </div>
          </div>

          {/* Biopharma Telemetry Log Console (Right) */}
          <div className="col-span-1 md:col-span-7">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Simulated Screening Log Output
            </h4>

            <div 
              ref={terminalContainerRef}
              className="h-[210px] w-full rounded-xl border border-white/5 bg-zinc-950/60 p-4 font-mono text-[9px] md:text-[10px] leading-relaxed text-neutral-400 overflow-y-auto shadow-inner flex flex-col justify-start"
            >
              <div className="flex-1">
                {logs.map((log) => {
                  let textClass = "text-neutral-500"
                  if (log.type === 'info') textClass = "text-cyan-300 font-bold"
                  if (log.type === 'success') textClass = "text-emerald-400 font-bold"
                  if (log.type === 'checking') textClass = "text-cyan-400/80"

                  return (
                    <div key={log.id} className={textClass}>
                      <span className="text-[8px] opacity-30 select-none mr-2">[{mounted ? new Date().toLocaleTimeString() : "00:00:00"}]</span>
                      {log.text}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
