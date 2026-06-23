'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Zap, Globe } from 'lucide-react'

const SLIDE_MS = 5500

const slides = [
  {
    id: 'presence',
    label: 'Web Design & Development',
    headline: 'Digital presence.',
    accentLine: 'Built to convert.',
    sub: 'We design high-performing websites and digital systems for brands, restaurants, creators, and growing businesses.',
    color: '#2B7FFF',
    hue: 0,
  },
  {
    id: 'speed',
    label: 'Fast Launch',
    headline: 'Live in 7 days.',
    accentLine: 'No compromises.',
    sub: 'From initial brief to a fully launched, conversion-ready website in one week — custom designed and built to perform.',
    color: '#C084FC',
    hue: 70,
  },
  {
    id: 'growth',
    label: 'Growth Systems',
    headline: 'Premium design.',
    accentLine: 'Engineered to grow.',
    sub: 'Every decision is built around one goal — turning visitors into customers with a site that works as hard as you do.',
    color: '#22D3EE',
    hue: -60,
  },
]

/* ─── Slide visuals ─── */

const PresenceVisual = ({ accent }: { accent: string }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-8 px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[340px] rounded-xl overflow-hidden"
      style={{ background: 'rgba(7,9,26,0.85)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}18` }}
    >
      <div style={{ background: 'rgba(13,17,34,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="flex items-center gap-1.5 px-3 py-2.5">
        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        <div className="flex-1 h-[18px] rounded-sm ml-2 flex items-center px-2" style={{ background: 'rgba(5,8,16,0.9)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Globe size={8} className="text-white/20 mr-1" />
          <span className="font-sans text-[9px] text-white/25">yourbrand.com</span>
        </div>
      </div>
      <div className="p-3 space-y-2.5">
        <div className="h-[88px] rounded-lg p-3 space-y-2" style={{ background: `linear-gradient(135deg, ${accent}15 0%, transparent 100%)`, border: `1px solid ${accent}18` }}>
          <div className="h-2.5 w-3/5 rounded-sm" style={{ background: `${accent}70` }} />
          <div className="h-1.5 w-full rounded-sm" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="h-1.5 w-4/5 rounded-sm" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="h-6 w-20 rounded-sm mt-1" style={{ background: accent, opacity: 0.75 }} />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[1,2,3].map(i => <div key={i} className="h-11 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }} />)}
        </div>
        <div className="space-y-1">
          {[100, 80, 65].map(w => <div key={w} className="h-1.5 rounded-sm" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.07)' }} />)}
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-16 right-4 rounded-xl p-3 w-36"
      style={{ background: 'rgba(10,14,30,0.90)', border: `1px solid ${accent}30`, boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}15` }}
    >
      <div className="font-sans text-[9px] font-600 tracking-wider uppercase mb-1" style={{ color: `${accent}99` }}>Conversions</div>
      <div className="font-cormorant text-2xl font-700 text-white">3× lift</div>
      <div className="flex items-center gap-1 mt-1">
        <TrendingUp size={9} style={{ color: accent }} />
        <span className="font-sans text-[9px]" style={{ color: accent }}>vs prev month</span>
      </div>
    </motion.div>
  </div>
)

const SpeedVisual = ({ accent }: { accent: string }) => {
  const steps = ['Discovery Call', 'Design Concept', 'Development', 'QA & Review', "You're Live ✓"]
  return (
    <div className="w-full h-full flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xs space-y-2"
      >
        <div className="font-sans text-[10px] font-600 tracking-wider uppercase mb-4" style={{ color: `${accent}80` }}>
          7-Day Sprint
        </div>
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: i === 4 ? `${accent}12` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${i === 4 ? `${accent}35` : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: i === 4 ? accent : `${accent}18` }}
            >
              {i === 4
                ? <CheckCircle size={11} className="text-white" />
                : <span className="font-sans text-[9px] font-700" style={{ color: accent }}>{i + 1}</span>
              }
            </div>
            <span className={`font-sans text-sm ${i === 4 ? 'font-600 text-white' : 'text-white/40'}`}>
              {step}
            </span>
            {i === 4 && (
              <span className="ml-auto font-sans text-[9px] font-700 px-2 py-0.5 rounded-full" style={{ background: `${accent}20`, color: accent }}>
                Day 7
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const GrowthVisual = ({ accent }: { accent: string }) => {
  const bars = [
    { label: 'Performance', score: 97 },
    { label: 'Accessibility', score: 100 },
    { label: 'Best Practices', score: 100 },
    { label: 'SEO', score: 100 },
  ]
  const barHeights = [40, 55, 48, 70, 58, 90, 75]
  return (
    <div className="w-full h-full flex items-center justify-center px-8">
      <div className="w-full max-w-xs space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-4"
          style={{ background: 'rgba(7,9,26,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="font-sans text-[10px] font-600 uppercase tracking-wider mb-3" style={{ color: `${accent}80` }}>
            Monthly Traffic
          </div>
          <div className="flex items-end gap-1.5 h-14">
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-sm origin-bottom"
                style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}28` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-sans text-[9px] text-white/25">Launch week</span>
            <span className="font-sans text-[9px] font-600" style={{ color: accent }}>+180% traffic</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-4"
          style={{ background: 'rgba(7,9,26,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap size={11} style={{ color: accent }} />
            <span className="font-sans text-[10px] font-600 uppercase tracking-wider" style={{ color: `${accent}80` }}>Lighthouse</span>
          </div>
          <div className="space-y-2">
            {bars.map(({ label, score }, i) => (
              <motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.09 }}>
                <div className="flex justify-between mb-1">
                  <span className="font-sans text-[10px] text-white/40">{label}</span>
                  <span className="font-sans text-[10px] font-700" style={{ color: accent }}>{score}</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.6 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: accent }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Main component ─── */

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

      {/* ── Gradient background — hue shifts per slide ── */}
      <motion.div
        animate={{ filter: `hue-rotate(${slide.hue}deg)` }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
        <div className="hero-blob-4" />
        <div className="hero-blob-5" />
        <div className="hero-ray" />
      </motion.div>

      {/* ── Split content layout ── */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-36 pb-12 gap-8">

        {/* Left: Text */}
        <div className="flex flex-col justify-center">

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id + '-label'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-xs tracking-[0.3em] uppercase font-500 mb-8 flex items-center gap-3"
              style={{ color: slide.color }}
            >
              <span className="w-6 h-px inline-block" style={{ background: slide.color }} />
              {slide.label}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id + '-headline'}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-700 leading-[0.92] tracking-tight mb-7 text-cream"
              style={{ fontSize: 'clamp(3rem, 6vw, 7rem)' }}
            >
              <span className="block">{slide.headline}</span>
              <span className="block" style={{ color: slide.color }}>{slide.accentLine}</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id + '-sub'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-sans text-base lg:text-lg text-charcoal-300 leading-relaxed mb-10 max-w-md"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link href="/start" className="btn-primary font-sans text-sm px-9 py-4 rounded-lg inline-flex items-center gap-2">
              Start Your Project <ArrowRight size={15} />
            </Link>
            <Link href="/work" className="btn-secondary font-sans text-sm px-9 py-4 rounded-lg">
              View Our Work
            </Link>
          </motion.div>

          {/* Progress indicators */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ width: i === current ? 48 : 16, background: 'rgba(255,255,255,0.12)' }}
              >
                {i === current && (
                  <div
                    key={progressKey}
                    className="absolute inset-y-0 left-0 rounded-full slide-progress-bar"
                    style={{ animationDuration: `${SLIDE_MS}ms`, background: slide.color }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Glass panel + visual */}
        <div className="relative hidden lg:flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-panel'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[480px] rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(5,8,15,0.30)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 0 80px rgba(0,0,0,0.35)',
              }}
            >
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="font-sans text-[10px] font-600 tracking-wider uppercase px-3 py-1.5 rounded-lg"
                  style={{ background: `${slide.color}18`, color: slide.color, border: `1px solid ${slide.color}28` }}
                >
                  {slide.label}
                </span>
              </div>

              {current === 0 && <PresenceVisual accent={slide.color} />}
              {current === 1 && <SpeedVisual accent={slide.color} />}
              {current === 2 && <GrowthVisual accent={slide.color} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="relative border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-7 flex flex-wrap gap-12">
          {[
            { value: '7 Days', label: 'Avg. Launch Time' },
            { value: 'New York', label: 'Based & Nationwide' },
            { value: '95+', label: 'Lighthouse Score' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-cormorant text-2xl lg:text-3xl font-700" style={{ color: slide.color }}>{value}</div>
              <div className="font-sans text-[11px] text-charcoal-400 mt-0.5 font-500 tracking-[0.12em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
