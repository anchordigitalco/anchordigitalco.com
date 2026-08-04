'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Logo } from '@/components/BrandLogo'
import { quicksand } from '@/app/fonts'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { heroPosterBlur } from '@/lib/hero-poster-data'

const SLIDE_MS = 3000
const CROSSFADE_S = 0.7
const EASE = [0.16, 1, 0.3, 1] as const

const SLIDES = [
  {
    slot: '05-storefront-glow',
    poster: '/hero-slide-videos/05-storefront-glow-poster.jpg',
    mp4: '/hero-slide-videos/05-storefront-glow.mp4',
    webm: '/hero-slide-videos/05-storefront-glow.webm',
    blur: heroPosterBlur.storefrontGlow,
  },
  {
    slot: '01-underwater',
    poster: '/hero-slide-videos/01-underwater-poster.jpg',
    mp4: '/hero-slide-videos/01-underwater.mp4',
    webm: '/hero-slide-videos/01-underwater.webm',
    blur: heroPosterBlur.underwater,
  },
  {
    slot: '04-water-surface',
    poster: '/hero-slide-videos/04-water-surface-poster.jpg',
    mp4: '/hero-slide-videos/04-water-surface.mp4',
    webm: '/hero-slide-videos/04-water-surface.webm',
    blur: heroPosterBlur.waterSurface,
  },
  {
    slot: '03-shutter',
    poster: '/hero-slide-videos/03-shutter-poster.jpg',
    mp4: '/hero-slide-videos/03-shutter.mp4',
    webm: '/hero-slide-videos/03-shutter.webm',
    blur: heroPosterBlur.shutter,
  },
]

export default function Hero() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [current, setCurrent] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Each clip's native duration is scaled so one full loop exactly spans
   * SLIDE_MS — source clips are trimmed to ~3s, matching SLIDE_MS, so this
   * normally lands at native speed; the clamp just guards against a clip
   * that's trimmed noticeably shorter or longer than the rest.
   */
  const applyPlaybackRate = useCallback((el: HTMLVideoElement | null) => {
    if (!el || !el.duration || !isFinite(el.duration)) return
    const rate = el.duration / (SLIDE_MS / 1000)
    el.playbackRate = Math.min(2, Math.max(0.25, rate))
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((el) => {
      if (el && el.readyState >= 1) applyPlaybackRate(el)
    })
  }, [applyPlaybackRate])

  useEffect(() => {
    setHydrated(true)
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const staticMode = reduced || isMobile

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
    setProgressKey((k) => k + 1)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setProgressKey((k) => k + 1)
  }, [])

  /**
   * Advancing used to run off a `setInterval` independent of the videos'
   * own playback clocks — since that timer and each video's native `loop`
   * started from different reference points, they drifted out of phase,
   * so the loop-restart became visible as a jump shortly before the slide
   * actually changed. Fixed by removing `loop` entirely and driving
   * everything from the current video's real `ended` event instead: only
   * the current slide plays (always restarted from frame 0), and the same
   * event that means "this clip finished its loop" is what advances to the
   * next slide — so the restart and the transition can never desync.
   */
  useEffect(() => {
    if (staticMode) return
    videoRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === current) {
        el.currentTime = 0
        el.play().catch(() => {})
      } else {
        el.pause()
      }
    })

    // Safety net only — normal advancement comes from onEnded below.
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    fallbackTimerRef.current = setTimeout(advance, SLIDE_MS + 1500)
    return () => { if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current) }
  }, [current, staticMode, advance])

  const handleEnded = useCallback((index: number) => {
    if (index !== current) return
    advance()
  }, [current, advance])

  const slide = SLIDES[current]

  return (
    <section data-theme="dark" data-hero-video="true" aria-labelledby="hero-heading" className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* Video / poster layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06, filter: 'blur(8px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {staticMode ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[0].blur})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SLIDES[0].poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ) : (
          SLIDES.map((s, i) => {
            const isCurrent = i === current
            return (
              <motion.div
                key={s.slot}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: isCurrent ? 1 : 0,
                  scale: isCurrent ? 1 : 1.03,
                }}
                transition={{ duration: CROSSFADE_S, ease: EASE }}
                style={{ zIndex: isCurrent ? 1 : 0 }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.blur})` }}>
                  <video
                    ref={(el) => { videoRefs.current[i] = el }}
                    onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
                    onEnded={() => handleEnded(i)}
                    muted
                    playsInline
                    preload="auto"
                    poster={s.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={s.webm} type="video/webm" />
                    <source src={s.mp4} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {/* Legibility scrim — soft, feathered, centered behind the centered text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(19,19,19,0.4), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div
        className="relative h-full flex flex-col items-center justify-center text-center"
        style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
      >
        {hydrated && (
          <>
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <h1 id="hero-heading">
                <Reveal
                  as="span"
                  split="lines"
                  delay={0.18}
                  stagger={0.09}
                  immediate
                  className={`${quicksand.className} block text-display font-semibold text-dark-ink`}
                >
                  {['anchor digital']}
                </Reveal>
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Logo invert className="h-7 md:h-9 lg:h-11" />
              </motion.div>
            </div>

          </>
        )}

        {/* Scroll cue */}
        {!staticMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-8 left-[var(--gutter)] flex flex-col items-center gap-3"
          >
            <span className="text-label text-dark-ink opacity-70">Scroll</span>
            <div className="relative h-8 w-px overflow-hidden" style={{ backgroundColor: 'rgba(242,240,236,0.3)' }}>
              <motion.div
                className="absolute inset-x-0 top-0 h-3 bg-dark-ink"
                animate={{ y: [-12, 32] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Slide indicator */}
        {!staticMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-8 right-[var(--gutter)] flex items-center gap-3"
          >
            <span className="text-label text-dark-ink tabular-nums opacity-70">
              {String(current + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.slot}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-px w-7 overflow-hidden"
                  style={{ backgroundColor: 'rgba(242,240,236,0.3)' }}
                >
                  {i === current && (
                    <motion.div
                      key={progressKey}
                      className="absolute inset-y-0 left-0 bg-dark-ink"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
