'use client'

import React from "react"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Double Helix / Molecular symbol looking P */}
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            P
          </div>
          <span className="font-sans text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400 tracking-tight">
            Prescience <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider ml-1">Insilico</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#hero" className="text-xs font-medium text-neutral-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-xs font-medium text-neutral-300 hover:text-white transition-colors">
            PRinS³ Suite
          </Link>
          <Link href="#services" className="text-xs font-medium text-neutral-300 hover:text-white transition-colors">
            R&D Services
          </Link>
          <Link href="#partners" className="text-xs font-medium text-neutral-300 hover:text-white transition-colors">
            Partners
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link 
            href="#prins3" 
            className="inline-flex h-9 items-center justify-center rounded-full bg-cyan-400 px-4 text-xs font-semibold text-black transition-all hover:bg-cyan-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            Access PrinS³
          </Link>
        </div>
      </div>
    </header>
  )
}
