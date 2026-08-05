'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const STATEMENT =
  'A digital development and strategy company helping small businesses and organizations modernize their digital presence.'

export default function Statement() {
  const reduced = useReducedMotion()
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (reduced || !textRef.current) return
    const words = textRef.current.querySelectorAll('.word')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        }
      )
    }, textRef)
    return () => ctx.revert()
  }, [reduced])

  const words = STATEMENT.split(' ')

  return (
    <section
      data-theme="light"
      aria-label="What we do"
      className="bg-ground"
      style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}
    >
      <div className="mx-auto max-w-site text-center" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <p ref={textRef} className="mx-auto max-w-[22ch] text-lead text-ink">
          {words.map((word, i) => (
            <span key={i} className={reduced ? undefined : 'word'} style={reduced ? undefined : { opacity: 0.15 }}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
