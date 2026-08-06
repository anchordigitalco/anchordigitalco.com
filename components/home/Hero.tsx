'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '@/components/Reveal'
import { GradientShimmer, IconShimmer } from '@/components/ui/gradient-shimmer'
import { quicksand } from '@/app/fonts'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { heroPosterBlur } from '@/lib/hero-poster-data'
import { getLenisInstance } from '@/lib/lenis-instance'
import heroPhoto from '@/public/hero-slide-videos/hero-image.png'
import logoIcon from '@/public/anchor-icon.png'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SLIDE_MS = 3000
const CROSSFADE_S = 0.7
const EASE = [0.16, 1, 0.3, 1] as const

// How much of the sequence the background photo takes to fade out — it sits
// behind the growing video card and is fully covered by progress 1 anyway,
// but fading it a bit earlier reads as a deliberate dissolve rather than an
// abrupt cover-up.
const BG_FADE_END = 0.7
// Extra scroll distance (beyond the pinned 100svh) the expand/split sequence
// scrubs across.
const PIN_SCROLL_VH = 85
// Collapsed video card: landscape-ish on desktop, where there's width to
// spare; on mobile the same vw/vh split would come out as a tall, narrow
// strip, so it's flipped to a wide-and-short card that fits the screen.
const BOX_COLLAPSED_VW = 44
const BOX_COLLAPSED_VH = 54
const BOX_COLLAPSED_VW_MOBILE = 86
const BOX_COLLAPSED_VH_MOBILE = 30
const BOX_RADIUS_COLLAPSED = 28
// "Anchor" slides left, "Digital" slides right, and the small icon under
// them splits into its two halves the same way — how far each travels, as
// a fraction of viewport width, by progress 1.
const SPLIT_MAX_RATIO = 0.68
const LOGO_SPLIT_RATIO = 0.8
const LOGO_ASPECT = 827 / 438
// Small icon under the wordmark at rest, vs. the medium-large standalone
// icon that fades in once fully zoomed in (no wordmark there).
const LOGO_HEIGHT_REST = 'clamp(28px, 4vw, 44px)'
const LOGO_HEIGHT_ZOOMED = 'clamp(64px, 9vw, 140px)'
// Once the expand sequence fully resolves into the cycling video, hold the
// scroll here for a beat — otherwise a normal scroll's momentum carries
// straight through and the video is never actually seen.
const HOLD_MS = 200
const HOLD_TRIGGER_AT = 0.999
const HOLD_RESET_BELOW = 0.9

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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export default function Hero() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [current, setCurrent] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  // Scroll-through progress of the intro's expand/split sequence, 0..1 —
  // stays permanently 0 in staticMode (no ScrollTrigger is ever created
  // there), which conveniently doubles as "resting, unsplit" for the lockup.
  const [progress, setProgress] = useState(0)
  const [viewportW, setViewportW] = useState(1440)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const outerRef = useRef<HTMLElement | null>(null)
  const heldRef = useRef(false)
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    const updateWidth = () => setViewportW(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      mq.removeEventListener('change', handler)
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  // Reduced-motion is the only thing that falls back to a plain static
  // photo now — mobile gets the same scroll-expand sequence as desktop,
  // just with a differently-proportioned collapsed card (see box sizing
  // below).
  const staticMode = reduced

  // Desktop only: the intro's "photo opens up into the cycling video" scroll
  // sequence. Pinned via plain CSS `sticky` (not GSAP's pin:true) — the
  // section is simply taller than one viewport, and ScrollTrigger just reads
  // scroll position against it for `progress`, which Lenis already keeps
  // synced (see SmoothScrollProvider). No wheel-hijacking, no fighting Lenis
  // for ownership of the scroll.
  useEffect(() => {
    if (staticMode) return
    const el = outerRef.current
    if (!el) return
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress
        if (p >= HOLD_TRIGGER_AT && !heldRef.current) {
          // Lenis owns wheel-driven scrolling — `.stop()`/`.start()` is its
          // own public API for pausing that input for a moment. But Lenis
          // doesn't sync touch scroll by default (touch is native), so
          // `.stop()` alone is a no-op for it; `touch-action: none` blocks
          // touch-driven scrolling directly instead. Deliberately NOT
          // `overflow: hidden/clip` on <html> here — that's the more usual
          // way to lock scroll, but it breaks `position: sticky` (which
          // this section's own pin depends on) for as long as it's set.
          heldRef.current = true
          const lenis = getLenisInstance()
          lenis?.stop()
          document.documentElement.style.touchAction = 'none'
          holdTimerRef.current = setTimeout(() => {
            lenis?.start()
            document.documentElement.style.touchAction = ''
            holdTimerRef.current = null
          }, HOLD_MS)
        } else if (p < HOLD_RESET_BELOW) {
          heldRef.current = false
        }
        setProgress(p)
      },
    })
    return () => {
      trigger.kill()
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
        getLenisInstance()?.start()
        document.documentElement.style.touchAction = ''
      }
    }
  }, [staticMode])

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
    setProgressKey((k) => k + 1)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setProgressKey((k) => k + 1)
  }, [])

  // The video lives inside the card from the very start (it's what you're
  // zooming into), so it's active for the whole sequence — just not in
  // staticMode, which never renders the card or the video at all.
  const videosActive = !staticMode

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
    if (staticMode || !videosActive) return
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
  }, [current, staticMode, videosActive, advance])

  // Scrolled back up above the activation point — stop the videos rather
  // than let them keep playing silently behind the photo.
  useEffect(() => {
    if (staticMode || videosActive) return
    videoRefs.current.forEach((el) => el?.pause())
  }, [staticMode, videosActive])

  const handleEnded = useCallback((index: number) => {
    if (index !== current) return
    advance()
  }, [current, advance])

  const slide = SLIDES[current]
  void slide

  // Video card: small and centered at rest, growing to fill the viewport as
  // `progress` advances — this is what you're scrolling to "zoom into".
  // Fixed at its collapsed size whenever there's no scroll sequence running
  // (staticMode never renders the card at all).
  const collapsedVw = isMobile ? BOX_COLLAPSED_VW_MOBILE : BOX_COLLAPSED_VW
  const collapsedVh = isMobile ? BOX_COLLAPSED_VH_MOBILE : BOX_COLLAPSED_VH
  const boxWidth = `${lerp(collapsedVw, 100, progress)}vw`
  const boxHeight = `${lerp(collapsedVh, 100, progress)}svh`
  const boxRadius = lerp(BOX_RADIUS_COLLAPSED, 0, progress)
  const boxShadowAlpha = 0.5 * (1 - smoothstep(0.7, 1, progress))
  // The "original hero photo" sits behind the card as a fixed full-bleed
  // backdrop — it's the whole picture in staticMode (reduced motion only,
  // now that mobile gets the same scroll sequence as desktop), and
  // otherwise dissolves away as the card grows to cover it.
  const bgPhotoOpacity = staticMode ? 1 : 1 - smoothstep(0, BG_FADE_END, progress)
  // Once the video has fully taken over, a plain (unsplit) icon fades back
  // in as the one persistent mark over the cycling video — the overlap
  // with `lockupOpacity` fading out over the same stretch is the handoff.
  const finalIconOpacity = staticMode ? 0 : smoothstep(0.85, 1, progress)

  // "Anchor" slides left, "Digital" slides right, and the small icon under
  // them splits into its two halves the same way — all driven by the same
  // scroll progress, all zeroed out (recombined, centered) whenever
  // there's nothing to scroll through.
  const splitPx = progress * viewportW * SPLIT_MAX_RATIO
  const logoSplitPx = splitPx * LOGO_SPLIT_RATIO
  const lockupOpacity = staticMode ? 1 : 1 - smoothstep(0.82, 1, progress)

  return (
    <section
      ref={outerRef}
      data-theme="dark"
      data-hero-video="true"
      aria-labelledby="hero-heading"
      className="relative w-full"
      style={{ height: staticMode ? '100svh' : `calc(100svh + ${PIN_SCROLL_VH}vh)` }}
    >
      <div
        className={staticMode ? 'relative h-full w-full overflow-hidden' : 'sticky top-0 h-[100svh] w-full overflow-hidden'}
      >
        {/* Media layer */}
        <div className="absolute inset-0 bg-dark" />

        {/* Background photo — fixed full-bleed, behind the card, dissolving
            away as the card grows to cover it. */}
        <div className="absolute inset-0" style={{ opacity: bgPhotoOpacity }}>
          <Image
            src={heroPhoto}
            alt=""
            fill
            sizes="100vw"
            quality={92}
            placeholder="blur"
            priority
            className="object-cover"
            style={{ objectPosition: '55% 30%' }}
          />
        </div>

        {/* The video card — small and centered at rest, this is what you
            scroll to zoom into fullscreen. */}
        {!staticMode && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{
              width: boxWidth,
              height: boxHeight,
              borderRadius: boxRadius,
              border: '1px solid rgba(242,240,236,0.14)',
              boxShadow: `0 30px 80px -20px rgba(0,0,0,${boxShadowAlpha.toFixed(2)})`,
            }}
          >
            {SLIDES.map((s, i) => {
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
            })}
          </div>
        )}

        {/* Legibility scrim — soft, feathered, centered behind the centered text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(19,19,19,0.4), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Once fully zoomed into the video, the split wordmark has faded
            and slid off — this plain, unsplit icon fades in in its place as
            the one mark left sitting over the cycling video. */}
        {!staticMode && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: finalIconOpacity }}
            aria-hidden="true"
          >
            <div className="relative" style={{ height: LOGO_HEIGHT_ZOOMED, aspectRatio: `${LOGO_ASPECT}` }}>
              <Image src={logoIcon} alt="" fill sizes="200px" className="object-contain invert" />
            </div>
          </div>
        )}

        {/* Content layer */}
        <div
          className="relative h-full flex flex-col items-center justify-center text-center"
          style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
        >
          {hydrated && (
            <div style={{ opacity: lockupOpacity }}>
              {/* The two words are separate DOM nodes (each independently
                  transformed by scroll) with no literal space between them
                  — `aria-label` supplies the real accessible name so
                  screen readers/search engines still read "Anchor Digital". */}
              <h1
                id="hero-heading"
                aria-label="Anchor Digital"
                className="flex items-center justify-center gap-[0.4em] text-dark-ink"
              >
                <span style={{ display: 'inline-block', transform: `translateX(-${splitPx}px)` }}>
                  {/* The size/weight class lives here, on Reveal's own
                      wrapper — not down on GradientShimmer's span — since
                      `.reveal-mask`'s descender-clearance padding is an
                      `em` value relative to *its own* font-size. Pushed
                      down onto an inner element instead, the mask would
                      inherit only the ambient (much smaller) font-size and
                      clip the display text's descenders (the "g" in
                      "digital"). */}
                  <Reveal
                    as="span"
                    split="none"
                    delay={0.18}
                    immediate
                    className={`${quicksand.className} block text-display font-semibold`}
                  >
                    <GradientShimmer gradient="bay">anchor</GradientShimmer>
                  </Reveal>
                </span>
                <span style={{ display: 'inline-block', transform: `translateX(${splitPx}px)` }}>
                  <Reveal
                    as="span"
                    split="none"
                    delay={0.27}
                    immediate
                    className={`${quicksand.className} block text-display font-semibold`}
                  >
                    <GradientShimmer gradient="bay">digital</GradientShimmer>
                  </Reveal>
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative mx-auto mt-3 md:mt-4 text-dark-ink"
                style={{ height: LOGO_HEIGHT_REST, aspectRatio: `${LOGO_ASPECT}` }}
              >
                {/* Same bay shimmer as the wordmark above (not on the plain
                    icon you see once fully zoomed in) — a mask-image sweep
                    rather than GradientShimmer's text-clip, since this is
                    an icon, not glyphs. */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: 'inset(0 50% 0 0)', transform: `translateX(-${logoSplitPx}px)` }}
                >
                  <IconShimmer src="/anchor-icon.png" gradient="bay" className="h-full w-full" />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: 'inset(0 0 0 50%)', transform: `translateX(${logoSplitPx}px)` }}
                >
                  <IconShimmer src="/anchor-icon.png" gradient="bay" className="h-full w-full" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Scroll cue — fades once the expand sequence starts moving */}
          {!staticMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (1 - smoothstep(0, 0.12, progress)) * 0.9 }}
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

          {/* Slide indicator — only once the expand sequence has resolved
              into the cycling video */}
          {!staticMode && progress > 0.92 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
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
      </div>
    </section>
  )
}
