'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { PRICING_FAQ } from '@/lib/constants'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-charcoal-700 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className={clsx(
          'font-sans text-base font-600 transition-colors duration-200',
          open ? 'text-gold' : 'text-charcoal-100 group-hover:text-gold'
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={clsx('transition-colors', open ? 'text-gold' : 'text-charcoal-400')} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-base text-charcoal-200 leading-relaxed pb-6 font-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PricingFAQ() {
  return (
    <div>
      {PRICING_FAQ.map((item, i) => (
        <FAQItem key={item.question} {...item} index={i} />
      ))}
    </div>
  )
}
