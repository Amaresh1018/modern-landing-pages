'use client'

import React, { useState } from "react"
import Link from "next/link"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="w-full bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Address info */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                P
              </div>
              <span className="font-sans text-md font-bold text-white tracking-tight">
                Prescience Insilico
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
              AI-driven Drug Discovery & multiscale materials simulation platform. 
              Accelerating pharmaceutical research and material formulations with physics-informed machine learning models.
            </p>
            <div className="text-xs text-neutral-400 leading-relaxed">
              <p className="font-semibold text-white mb-1">Headquarters:</p>
              <p>Surya Office Space, 72/12, Nallurahalli Main Rd,</p>
              <p>Whitefield, Siddapura, Brookefield, Bengaluru,</p>
              <p>Karnataka 560066, India</p>
              <p className="mt-3"><strong>Phone:</strong> +91 6361546737</p>
              <p><strong>Email:</strong> support@prescience.in</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-4">
              Important Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <Link href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#refund" className="hover:text-white transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-4">
              Subscribe to our Newsletter
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Get the latest updates on publications, biopharma insights, and PrinS³ software features.
            </p>

            {subscribed ? (
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-300">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="h-9 rounded-lg bg-cyan-400 px-4 text-xs font-semibold text-black hover:bg-cyan-300 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom border & socials */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600">
            © {new Date().getFullYear()} Prescience Insilico. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-400">
            <a href="https://twitter.com/prescience_in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://www.linkedin.com/company/prescience-insilico" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
