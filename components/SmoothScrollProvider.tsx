'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { setLenisInstance } from '@/lib/lenis-instance'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Document-level Lenis + GSAP ScrollTrigger wiring, mounted once in the root
 * layout. Header's condensed-on-scroll and the pinned system section both
 * need one consistent scroll owner. Lenis still drives native scroll
 * position under the hood, so anything listening to window scroll events
 * (Header's directional detection) works without touching this instance
 * directly.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return

    // NOTE: `autoToggle: true` looked like the fix for lenis.stop() not
    // blocking touch scroll (Lenis doesn't sync touch by default — see
    // Hero's hold logic) — it makes .stop() set `overflow: clip` on
    // <html>. Reverted: that overflow change breaks `position: sticky`
    // for any sticky element on the page for as long as it's engaged
    // (confirmed directly — sticky's `top` reads 0 with overflow:visible,
    // and jumps to tracking raw scrollY, i.e. not sticking at all, the
    // instant overflow:clip is applied), which is exactly the Hero's own
    // pin mechanism. Touch is instead handled with `touch-action: none`
    // in Hero's hold effect — it blocks touch-driven scrolling without
    // touching `overflow` at all, so sticky is unaffected.
    const lenis = new Lenis({ lerp: 0.09, duration: 1.2 })
    lenisRef.current = lenis
    setLenisInstance(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Web fonts swap in asynchronously (font-display: swap) after every
    // ScrollTrigger below has already computed its trigger position from
    // the fallback font's layout. If that swap shifts anything's position
    // (different line-height/character width settling in), those cached
    // positions go stale — a reveal positioned to fire "already in view"
    // can end up permanently stuck at its pre-reveal state, since nothing
    // ever tells ScrollTrigger to recompute against the real, final
    // layout. Refreshing once fonts are actually ready fixes that class
    // of bug at the source instead of per-component.
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [reduced])

  // Next.js resets the native scroll position on every client-side
  // navigation, but Lenis tracks its own separate virtual position on
  // top of that — left alone, the two disagree and a new page can land
  // still scrolled down (or visibly animate back up) instead of
  // actually opening at the top. Forcing Lenis's position to match,
  // instantly, on every route change keeps them in sync.
  //
  // usePathname() excludes any #hash, so a link to e.g. /#updates would
  // otherwise still get force-scrolled to 0 here, canceling out the
  // anchor jump. Scroll to that section instead when one's present.
  useEffect(() => {
    const hash = window.location.hash
    const target = hash ? document.querySelector(hash) : null
    if (target instanceof HTMLElement) {
      lenisRef.current?.scrollTo(target, { immediate: true, offset: -88 })
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  return <>{children}</>
}
