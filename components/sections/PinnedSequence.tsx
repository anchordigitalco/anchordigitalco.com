'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import FadeUp from '@/components/FadeUp'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * NOTE: reconstructed after an accidental full-site rewrite was undone —
 * a reasonable rebuild matching the known heading/paragraph/states/boxed
 * prop shape (a heading, a supporting paragraph, and a short list of
 * states that reveal in sequence as the section scrolls into view), not
 * a guaranteed byte-exact restoration of the original scroll-pinned
 * implementation.
 */
export default function PinnedSequence({
  heading,
  paragraph,
  states,
  boxed = false,
}: {
  heading: string[]
  paragraph: string
  states: string[]
  boxed?: boolean
}) {
  const reduced = useReducedMotion()
  const { ref, visible } = useInViewOnce<HTMLDivElement>()

  const content = (
    <div ref={ref} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-6">
        <h2>
          <Reveal as="span" split="lines" className="block text-display font-normal text-ink">
            {heading}
          </Reveal>
        </h2>
        <p className="mt-6 max-w-[42ch] text-body text-ink-muted">{paragraph}</p>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <ul className="flex flex-col gap-4">
          {states.map((state, i) => (
            <motion.li
              key={state}
              initial={reduced ? false : { opacity: 0, x: 12 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : 12 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-hairline pb-4 text-lead font-normal text-ink"
            >
              {state}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (boxed) {
    return (
      <section data-theme="light" className="bg-ground" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div
          className="mx-auto max-w-site rounded-[20px] border border-hairline"
          style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
        >
          {content}
        </div>
      </section>
    )
  }

  return (
    <section data-theme="light" className="border-t border-hairline bg-ground" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
      <div className="mx-auto max-w-site">{content}</div>
    </section>
  )
}
