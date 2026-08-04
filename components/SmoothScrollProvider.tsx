'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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

    const lenis = new Lenis({ lerp: 0.09, duration: 1.2 })
    lenisRef.current = lenis
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
    }
  }, [reduced])

  // Next.js resets the native scroll position on every client-side
  // navigation, but Lenis tracks its own separate virtual position on
  // top of that — left alone, the two disagree and a new page can land
  // still scrolled down (or visibly animate back up) instead of
  // actually opening at the top. Forcing Lenis's position to match,
  // instantly, on every route change keeps them in sync.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
