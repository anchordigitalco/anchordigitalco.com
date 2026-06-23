'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const SLIDE_MS = 5500

const slides = [
  {
    id: 'presence',
    label: 'Web Design & Development',
    headline: 'Digital presence.',
    accent: 'Built to convert.',
    sub: 'We design high-performing websites and digital systems for brands, restaurants, creators, and growing businesses.',
  },
  {
    id: 'speed',
    label: 'Fast Launch',
    headline: 'Live in 7 days.',
    accent: 'No compromises.',
    sub: 'From initial brief to a fully launched, conversion-ready website in one week — custom designed and built to perform.',
  },
  {
    id: 'growth',
    label: 'Growth Systems',
    headline: 'Premium design.',
    accent: 'Engineered to grow.',
    sub: 'Every decision is built around one goal — turning visitors into customers with a site that works as hard as you do.',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  const advance = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
    setProgressKey(k => k + 1)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setProgressKey(k => k + 1)
  }, [])

  useEffect(() => {
    const t = setInterval(advance, SLIDE_MS)
    return () => clearInterval(t)
  }, [advance])

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#05080F' }}>

      {/* ── Animated gradient mesh background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
        <div className="hero-blob-4" />
        <div className="hero-blob-5" />
        <div className="hero-ray" />
      </div>

      {/* ── Slide content ── */}
      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-16 w-full pt-40 pb-12">

        {/* Eyebrow label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.id + '-label'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-500 mb-8 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-gold/60 inline-block" />
            {slide.label}
          </motion.p>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={slide.id + '-headline'}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-700 leading-[0.92] tracking-tight mb-7 max-w-4xl"
            style={{ fontSize: 'clamp(3.4rem, 8.5vw, 8.5rem)' }}
          >
            <span className="block text-cream">{slide.headline}</span>
            <span className="block text-gold">{slide.accent}</span>
          </motion.h1>
        </AnimatePresence>

        {/* Sub */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.id + '-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-sans text-base lg:text-lg text-charcoal-300 leading-relaxed mb-12 max-w-lg"
          >
            {slide.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-wrap gap-4 mb-16"
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

        {/* Slide progress indicators */}
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? 48 : 16,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              {i === current && (
                <div
                  key={progressKey}
                  className="absolute inset-y-0 left-0 rounded-full bg-gold slide-progress-bar"
                  style={{ animationDuration: `${SLIDE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
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
