'use client'
import { CSSProperties, ElementType, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useInViewOnce } from '@/hooks/useInViewOnce'

interface RevealBaseProps {
  as?: ElementType
  delay?: number
  stagger?: number
  className?: string
  style?: CSSProperties
  /**
   * Fire immediately on mount instead of waiting for scroll-into-view.
   * Use for above-the-fold content (the hero) where there's nothing to
   * scroll past yet — whileInView would simply never trigger.
   */
  immediate?: boolean
}

interface RevealNoneProps extends RevealBaseProps {
  split?: 'none'
  children: ReactNode
}

interface RevealWordsProps extends RevealBaseProps {
  split: 'words'
  children: string
}

interface RevealLinesProps extends RevealBaseProps {
  split: 'lines'
  /** Pre-authored lines — breaks are a design decision, never runtime-measured. */
  children: string[]
}

export type RevealProps = RevealNoneProps | RevealWordsProps | RevealLinesProps

const DURATION = 0.9
const EASE = [0.16, 1, 0.3, 1] as const

function MaskedUnit({
  children,
  index,
  delay,
  stagger,
  reduced,
  immediate,
}: {
  children: ReactNode
  index: number
  delay: number
  stagger: number
  reduced: boolean
  immediate: boolean
}) {
  const unitDelay = delay + index * stagger
  const { ref, visible } = useInViewOnce<HTMLSpanElement>(immediate)
  const trigger = { initial: 'hidden', animate: visible ? 'visible' : 'hidden' }

  if (reduced) {
    return (
      <span className="reveal-mask">
        <motion.span
          ref={ref}
          className="reveal-line"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          {...trigger}
          transition={{ duration: 0.2, delay: unitDelay }}
        >
          {children}
        </motion.span>
      </span>
    )
  }

  return (
    <span className="reveal-mask">
      <motion.span
        ref={ref}
        className="reveal-line"
        variants={{ hidden: { y: '105%' }, visible: { y: '0%' } }}
        {...trigger}
        transition={{ duration: DURATION, delay: unitDelay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * The one text-reveal gesture used everywhere on the site: a mask wipe, not a
 * fade. `split="lines"` takes pre-authored line strings (breaks are hardcoded
 * content decisions, never measured at runtime). `split="words"` tokenizes a
 * single string into word-level masks. `split="none"` (default) masks the
 * whole block as one unit.
 */
export default function Reveal(props: RevealProps) {
  const { as: As = 'div', delay = 0, stagger = 0.09, className = '', style, immediate = false } = props
  const reduced = useReducedMotion()

  if (props.split === 'lines') {
    return (
      <As className={className} style={style}>
        {props.children.map((line, i) => (
          <span className="block" key={i}>
            <MaskedUnit index={i} delay={delay} stagger={stagger} reduced={reduced} immediate={immediate}>
              {line}
            </MaskedUnit>
          </span>
        ))}
      </As>
    )
  }

  if (props.split === 'words') {
    const words = props.children.split(' ')
    return (
      <As className={className} style={style}>
        {words.map((word, i) => (
          <span key={i}>
            <MaskedUnit index={i} delay={delay} stagger={stagger} reduced={reduced} immediate={immediate}>
              {word}
            </MaskedUnit>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </As>
    )
  }

  return (
    <As className={className} style={style}>
      <MaskedUnit index={0} delay={delay} stagger={stagger} reduced={reduced} immediate={immediate}>
        {props.children}
      </MaskedUnit>
    </As>
  )
}
