'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeUp from '@/components/FadeUp'
import Reveal from '@/components/Reveal'

interface Item {
  question: string
  answer: string
}

function AccordionItem({ question, answer, index }: Item & { index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeUp delay={index * 0.04} className="border-b border-hairline">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-body text-ink">{question}</span>
        <span className="flex-shrink-0 text-ink-muted" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-6 text-body text-ink-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeUp>
  )
}

export default function Accordion({ heading, items }: { heading?: string[]; items: Item[] }) {
  return (
    <div>
      {heading && (
        <h2 className="mb-10">
          <Reveal as="span" split="lines" className="block text-display font-normal text-ink">
            {heading}
          </Reveal>
        </h2>
      )}
      <div className="border-t border-hairline">
        {items.map((item, i) => (
          <AccordionItem key={item.question} {...item} index={i} />
        ))}
      </div>
    </div>
  )
}
