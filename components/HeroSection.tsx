'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#05080F' }}>

      {/* ── Animated gradient mesh ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
        <div className="hero-blob-4" />
        <div className="hero-ray" />
      </div>

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-16 w-full pt-40 pb-16">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal-300 font-500 mb-8"
        >
          Bello Bleecker · Digital Consulting
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant font-700 leading-[0.92] tracking-tight mb-8 text-cream max-w-5xl"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
        >
          Digital presence.<br />
          <span className="text-gold italic">Built to convert.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-base lg:text-lg text-charcoal-300 leading-relaxed mb-12 max-w-lg"
        >
          We design high-performing websites and digital systems for brands,
          restaurants, creators, and growing businesses — nationwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/start"
            className="btn-primary font-sans text-sm px-9 py-4 rounded-lg inline-flex items-center gap-2"
          >
            Start Your Project <ArrowRight size={15} />
          </Link>
          <Link
            href="/work"
            className="btn-secondary font-sans text-sm px-9 py-4 rounded-lg"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.7 }}
        className="relative border-t border-charcoal-700/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-7 flex flex-wrap gap-12">
          {[
            { value: '7 Days', label: 'Avg. Launch Time' },
            { value: 'New York', label: 'Based & Nationwide' },
            { value: '95+', label: 'Lighthouse Score' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-cormorant text-2xl lg:text-3xl font-700 text-gold">{value}</div>
              <div className="font-sans text-[11px] text-charcoal-400 mt-0.5 font-500 tracking-[0.12em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
