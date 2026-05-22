'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('max-w-2xl', align === 'center' ? 'mx-auto text-center' : '')}
    >
      {eyebrow && (
        <div className={clsx('flex items-center gap-3 mb-5', align === 'center' ? 'justify-center' : '')}>
          <div className="w-6 h-0.5 rounded-full bg-gold" />
          <span className="font-sans text-xs font-600 tracking-[0.2em] uppercase text-gold">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-cormorant text-[clamp(2rem,4.5vw,3.8rem)] font-700 text-charcoal-100 leading-tight mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-base lg:text-lg text-charcoal-300 leading-relaxed font-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
