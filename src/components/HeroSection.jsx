import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import NetworkVisual from './NetworkVisual'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/5 via-transparent to-transparent" />

      {/* Network canvas background */}
      <div className="absolute inset-0 opacity-30">
        <NetworkVisual />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Platform Live — 500+ Global Partners
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Intelligent Cross-Border{' '}
            <span className="gradient-text">Liquidity & Trade</span>{' '}
            Routing Platform
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto">
            Global Cash Recycle Investment Group helps businesses and investors move capital efficiently through a network of verified cross-border liquidity partners and AI-driven route optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary flex items-center justify-center gap-2">
              Explore Platform
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-secondary flex items-center justify-center gap-2">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
