'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Zap, Globe } from 'lucide-react'

const SLIDE_MS = 6000

const slides = [
  {
    id: 'presence',
    label: 'Web Design & Dev',
    headline1: 'Digital presence',
    headline2: 'built to convert.',
    sub: 'We design high-performing websites and digital systems for brands, restaurants, creators, and growing businesses.',
    accent: '#2B7FFF',
    bg: 'linear-gradient(135deg, #050E2A 0%, #080B18 60%, #040610 100%)',
    /*
     * SLIDE 1 IMAGE SLOT
     * Place an AI-generated image at: /public/slides/slide-1.jpg
     * Then render it with: <img src="/slides/slide-1.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
     */
  },
  {
    id: 'speed',
    label: 'Fast Launch',
    headline1: 'Live in 7 days.',
    headline2: 'No compromises.',
    sub: 'From initial brief to a fully launched, conversion-ready website in one week — custom designed, performance-optimised, and built to grow.',
    accent: '#7B5FFF',
    bg: 'linear-gradient(135deg, #0D0520 0%, #080B18 60%, #050310 100%)',
    /*
     * SLIDE 2 IMAGE SLOT
     * Place at: /public/slides/slide-2.jpg
     */
  },
  {
    id: 'growth',
    label: 'Growth Systems',
    headline1: 'Premium design.',
    headline2: 'Engineered to grow.',
    sub: 'Every decision is built around one goal — turning visitors into customers with a site that works as hard as you do.',
    accent: '#00C4B4',
    bg: 'linear-gradient(135deg, #021318 0%, #080B18 60%, #021010 100%)',
    /*
     * SLIDE 3 IMAGE SLOT
     * Place at: /public/slides/slide-3.jpg
     */
  },
]

/* ─── Slide visuals ─── */

const PresenceVisual = ({ accent }: { accent: string }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-8 px-6">
    {/* Main browser frame */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[340px] rounded-xl overflow-hidden"
      style={{ background: '#07091A', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}18` }}
    >
      <div style={{ background: '#0D1122', borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="flex items-center gap-1.5 px-3 py-2.5">
        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        <div className="flex-1 h-[18px] rounded-sm ml-2 flex items-center px-2" style={{ background: '#050810', border: '1px solid rgba(255,255,255,0.05)' }}>
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

    {/* Floating metric card */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-16 right-4 rounded-xl p-3 w-36"
      style={{ background: '#0A0E1E', border: `1px solid ${accent}30`, boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}15` }}
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
              <span
                className="ml-auto font-sans text-[9px] font-700 px-2 py-0.5 rounded-full"
                style={{ background: `${accent}20`, color: accent }}
              >
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
        {/* Traffic chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-4"
          style={{ background: '#07091A', border: '1px solid rgba(255,255,255,0.06)' }}
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

        {/* Lighthouse scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-4"
          style={{ background: '#07091A', border: '1px solid rgba(255,255,255,0.06)' }}
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

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(0)

  const advance = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
    setKey(k => k + 1)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setKey(k => k + 1)
  }, [])

  useEffect(() => {
    const t = setInterval(advance, SLIDE_MS)
    return () => clearInterval(t)
  }, [advance])

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-charcoal-900">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          key={slide.id + '-glow'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, ${slide.accent}12 0%, transparent 70%)`, filter: 'blur(80px)' }}
        />
        <motion.div
          key={slide.id + '-glow2'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${slide.accent}10 0%, transparent 70%)`, filter: 'blur(100px)' }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: 'linear-gradient(rgba(43,127,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(43,127,255,0.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 lg:pt-36 gap-12 lg:gap-8 pb-12">

        {/* ── Left: Text ── */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-7 h-0.5 rounded-full bg-gold" />
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.id + '-label'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-xs font-600 tracking-[0.22em] uppercase text-gold"
              >
                {slide.label}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id + '-headline'}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-800 leading-[1.0] mb-5 tracking-tight"
            >
              <span className="block text-[clamp(2.4rem,5vw,4.5rem)] text-charcoal-50">
                {slide.headline1}
              </span>
              <span className="block text-[clamp(2.4rem,5vw,4.5rem)]" style={{ color: slide.accent }}>
                {slide.headline2}
              </span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id + '-sub'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-sans text-base lg:text-lg text-charcoal-300 leading-relaxed max-w-md mb-8"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Link href="/start" className="btn-primary font-sans text-sm px-7 py-3.5 rounded-lg inline-flex items-center gap-2">
              Start Your Project <ArrowRight size={15} />
            </Link>
            <Link href="/work" className="btn-secondary font-sans text-sm px-7 py-3.5 rounded-lg inline-flex items-center gap-2">
              View Our Work
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="flex flex-wrap gap-8 pt-6 border-t border-charcoal-700"
          >
            {[
              { value: '7 Days', label: 'Avg. Launch Time' },
              { value: 'New York', label: 'Based & Nationwide' },
              { value: '95+', label: 'Lighthouse Score' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-cormorant text-2xl font-700 leading-none" style={{ color: slide.accent }}>{value}</div>
                <div className="font-sans text-xs text-charcoal-400 mt-1 font-500 tracking-wide">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Rotating visual panel ── */}
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
                background: slide.bg,
                border: `1px solid ${slide.accent}18`,
                boxShadow: `0 0 80px ${slide.accent}10`,
              }}
            >
              {/* Grid overlay on panel */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Slide visual */}
              {current === 0 && <PresenceVisual accent={slide.accent} />}
              {current === 1 && <SpeedVisual accent={slide.accent} />}
              {current === 2 && <GrowthVisual accent={slide.accent} />}

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="font-sans text-[10px] font-600 tracking-wider uppercase px-3 py-1.5 rounded-lg"
                  style={{ background: `${slide.accent}18`, color: slide.accent, border: `1px solid ${slide.accent}28` }}
                >
                  {slide.label}
                </span>
              </div>

              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className="relative h-1 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ width: i === current ? 32 : 8, background: 'rgba(255,255,255,0.15)' }}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    {i === current && (
                      <div
                        key={key}
                        className="absolute inset-y-0 left-0 rounded-full slide-progress-bar"
                        style={{
                          background: slide.accent,
                          animationDuration: `${SLIDE_MS}ms`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3"
      >
        <div className="w-px h-7 bg-gold/30 animate-[pulse_2s_ease-in-out_infinite]" />
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal-400 font-500">Scroll</span>
      </motion.div>
    </section>
  )
}
