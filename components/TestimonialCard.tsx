'use client'
import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  company: string
  index?: number
}

export default function TestimonialCard({ quote, name, role, company, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white border border-charcoal-700 rounded-xl p-7 lg:p-8 overflow-hidden group hover:border-gold/30 hover:shadow-surface-lg transition-all duration-400"
    >
      {/* Blue top accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-xl" />

      {/* Opening mark */}
      <div
        className="text-6xl leading-none font-sans font-800 mb-4 -mt-2 select-none"
        style={{ color: 'rgba(43,127,255,0.15)' }}
      >
        &ldquo;
      </div>

      {/* Quote — modern, no italic */}
      <blockquote className="font-sans text-base font-400 text-charcoal-200 leading-relaxed mb-7">
        {quote}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-5 border-t border-charcoal-700">
        <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
          <span className="font-sans text-sm font-700 text-gold">{name.charAt(0)}</span>
        </div>
        <div>
          <div className="font-sans text-sm font-600 text-charcoal-100">{name}</div>
          <div className="font-sans text-xs text-charcoal-400 font-400">{role} · {company}</div>
        </div>
      </div>
    </motion.div>
  )
}
