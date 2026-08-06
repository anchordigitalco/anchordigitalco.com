'use client'
import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import FadeUp from '@/components/FadeUp'
import DisplayCards from '@/components/ui/display-cards'
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
const CARD_STACK_CLASSNAMES = [
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-hairline before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-ground/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-hairline before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-ground/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
]

interface CardItem {
  icon: ReactNode
  title: string
  description: string
}

export default function PinnedSequence({
  heading,
  paragraph,
  states,
  cards,
  boxed = false,
}: {
  heading: string[]
  paragraph: string
  /** Plain revealing text list — the original behavior, still used as-is
   * wherever `cards` isn't passed (e.g. the Work page). */
  states?: string[]
  /** Fanned, skewed stack-of-cards effect instead of the plain list —
   * opt in per caller so this doesn't change existing callers using
   * `states`. */
  cards?: CardItem[]
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
        {cards ? (
          <DisplayCards
            cards={cards.map((card, i) => ({
              icon: card.icon,
              title: card.title,
              description: card.description,
              date: '',
              className: CARD_STACK_CLASSNAMES[i] ?? CARD_STACK_CLASSNAMES[CARD_STACK_CLASSNAMES.length - 1],
            }))}
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {(states ?? []).map((state, i) => (
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
        )}
      </div>
    </div>
  )

  if (boxed) {
    return (
      <section data-theme="light" className="bg-ground" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div
          className="mx-auto max-w-site rounded-[20px] border border-hairline bg-ground text-ink"
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
