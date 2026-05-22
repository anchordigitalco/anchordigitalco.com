'use client'
import { motion } from 'framer-motion'

interface ProcessStepProps {
  number: string
  title: string
  description: string
  index?: number
  isLast?: boolean
}

export default function ProcessStep({ number, title, description, index = 0, isLast = false }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 lg:gap-10 group"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-charcoal-600 to-transparent" />
      )}

      {/* Number column */}
      <div className="flex-shrink-0 relative">
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Large background number — now blue tint */}
          <span
            className="absolute -top-2 -left-2 font-cormorant text-[5rem] leading-none font-800 select-none pointer-events-none"
            style={{ color: 'rgba(43, 127, 255, 0.10)' }}
          >
            {number}
          </span>
          {/* Step indicator */}
          <div className="relative z-10 w-10 h-10 rounded-full border-2 border-charcoal-600 group-hover:border-gold bg-white flex items-center justify-center transition-all duration-300 shadow-surface">
            <span className="font-sans text-xs font-700 text-gold">{number}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-14 lg:pb-16 flex-1">
        <h3 className="font-cormorant text-2xl lg:text-3xl font-700 text-charcoal-100 mb-3 group-hover:text-gold transition-colors duration-300 tracking-tight">
          {title}
        </h3>
        <p className="font-sans text-base text-charcoal-300 leading-relaxed max-w-xl font-400">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
