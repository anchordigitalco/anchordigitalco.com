'use client'
import { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Block-level fade+rise-into-view, for cards and grids where a text mask
 * wipe (Reveal) doesn't apply. Same Lenis-safe ScrollTrigger-based viewport
 * detection as Reveal — see useInViewOnce.
 */
export default function FadeUp({
  children,
  delay = 0,
  y = 24,
  duration = 0.65,
  immediate = false,
  className = '',
  id,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  immediate?: boolean
  className?: string
  id?: string
  style?: CSSProperties
}) {
  const reduced = useReducedMotion()
  const { ref, visible } = useInViewOnce<HTMLDivElement>(immediate)
  const restY = reduced ? 0 : y

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: restY }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: restY }}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
