'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

/**
 * Viewport-enter-once trigger, built on GSAP ScrollTrigger rather than
 * Framer Motion's `whileInView` (native IntersectionObserver). Under Lenis's
 * rAF-driven scroll, native IntersectionObserver callbacks stop re-firing
 * after the mandatory initial callback (verified directly, independent of
 * Framer Motion) — while ScrollTrigger stays correct because Lenis
 * explicitly pokes it (`lenis.on('scroll', ScrollTrigger.update)`) on every
 * scroll tick. Every scroll-triggered reveal on the site should use this,
 * not `whileInView`.
 */
export function useInViewOnce<T extends HTMLElement = HTMLElement>(immediate = false) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(immediate)

  useEffect(() => {
    if (immediate || !ref.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => setVisible(true),
      })
    })
    return () => ctx.revert()
  }, [immediate])

  return { ref, visible }
}
