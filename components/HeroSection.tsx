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
  <div className="relative w-full h-full flex items-end justify-center pb-10 px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[320px] rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(8,11,24,0.80)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${accent}12, 0 0 40px ${accent}10`,
      }}
    >
      <div style={{ background: 'rgba(14,18,36,0.90)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="flex items-center gap-1.5 px-4 py-3">
        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
        <div className="flex-1 h-5 rounded-full ml-2 flex items-center px-2.5" style={{ background: 'rgba(5,8,16,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Globe size={8} className="text-white/20 mr-1.5" />
          <span className="font-sans text-[9px] text-white/25">yourbrand.com</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="rounded-xl p-4 space-y-2.5" style={{ background: `linear-gradient(135deg, ${accent}14 0%, ${accent}06 100%)`, border: `1px solid ${accent}15`, boxShadow: `0 4px 16px ${accent}08` }}>
          <div className="h-2.5 w-3/5 rounded-full" style={{ background: `${accent}65` }} />
          <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
          <div className="h-1.5 w-4/5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="h-7 w-24 rounded-lg mt-1" style={{ background: accent, opacity: 0.80, boxShadow: `0 4px 12px ${accent}40` }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3].map(i => <div key={i} className="h-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />)}
        </div>
        <div className="space-y-1.5 px-1">
          {[100, 78, 60].map(w => <div key={w} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.07)' }} />)}
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-14 right-6 rounded-2xl p-4 w-38"
      style={{
        width: 148,
        background: 'rgba(8,11,24,0.85)',
        border: `1px solid ${accent}22`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.50), 0 0 24px ${accent}12`,
      }}
    >
      <div className="font-sans text-[9px] font-600 tracking-wider uppercase mb-1.5" style={{ color: `${accent}90` }}>Conversions</div>
      <div className="font-cormorant text-2xl font-700 text-white leading-none mb-1">3× lift</div>
      <div className="flex items-center gap-1.5 mt-2">
        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: `${accent}18` }}>
          <TrendingUp size={8} style={{ color: accent }} />
        </div>
        <span className="font-sans text-[9px]" style={{ color: `${accent}90` }}>vs prev month</span>
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
        className="w-full max-w-xs space-y-2.5"
      >
        <div className="font-sans text-[10px] font-600 tracking-wider uppercase mb-5" style={{ color: `${accent}80` }}>
          7-Day Sprint
        </div>
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              background: i === 4 ? `${accent}14` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === 4 ? `${accent}30` : 'rgba(255,255,255,0.07)'}`,
              boxShadow: i === 4 ? `0 8px 24px ${accent}18, 0 0 0 1px ${accent}15` : '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: i === 4 ? accent : `${accent}15`,
                boxShadow: i === 4 ? `0 4px 12px ${accent}40` : 'none',
              }}
            >
              {i === 4
                ? <CheckCircle size={12} className="text-white" />
                : <span className="font-sans text-[9px] font-700" style={{ color: accent }}>{i + 1}</span>
              }
            </div>
            <span className={`font-sans text-sm ${i === 4 ? 'font-600 text-white' : 'text-white/35'}`}>
              {step}
            </span>
            {i === 4 && (
              <span className="ml-auto font-sans text-[9px] font-700 px-2.5 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>
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
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(8,11,24,0.75)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          <div className="font-sans text-[10px] font-600 uppercase tracking-wider mb-4" style={{ color: `${accent}80` }}>
            Monthly Traffic
          </div>
          <div className="flex items-end gap-1.5 h-14">
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-full origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i === 5 ? accent : `${accent}28`,
                  boxShadow: i === 5 ? `0 0 12px ${accent}50` : 'none',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-sans text-[9px] text-white/25">Launch week</span>
            <span className="font-sans text-[9px] font-600" style={{ color: accent }}>+180% traffic</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(8,11,24,0.75)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: `${accent}18` }}>
              <Zap size={10} style={{ color: accent }} />
            </div>
            <span className="font-sans text-[10px] font-600 uppercase tracking-wider" style={{ color: `${accent}80` }}>Lighthouse</span>
          </div>
          <div className="space-y-2.5">
            {bars.map(({ label, score }, i) => (
              <motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.09 }}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-sans text-[10px] text-white/35">{label}</span>
                  <span className="font-sans text-[10px] font-700" style={{ color: accent }}>{score}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.6 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: accent, boxShadow: `0 0 8px ${accent}60` }}
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
              className="font-cormorant font-700 leading-none tracking-tight mb-7 text-cream flex flex-col"
              style={{ fontSize: 'clamp(3rem, 6vw, 7rem)', gap: '0.08em' }}
            >
              <span>{slide.headline}</span>
              <span style={{ color: slide.color }}>{slide.accentLine}</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id + '-sub'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-sans text-base lg:text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--color-text-body)' }}
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
              <div className="font-cormorant text-2xl lg:text-3xl font-700 tabular-nums" style={{ color: slide.color }}>{value}</div>
              <div className="font-sans text-[11px] text-charcoal-400 mt-0.5 font-500 tracking-[0.12em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
