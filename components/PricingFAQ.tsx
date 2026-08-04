'use client'
import { useState } from 'react'
import { PRICING_FAQ } from '@/lib/constants'

/**
 * NOTE: rebuilt from partial context after an accidental full-site
 * rewrite was undone — reasonable reconstruction, not a guaranteed
 * byte-exact restoration of the original file.
 */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-hairline py-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 text-left"
        aria-expanded={open}
        aria-controls={`pricing-faq-${index}`}
      >
        <span className="text-body text-ink">{question}</span>
        <span className="flex-shrink-0 text-ink-muted" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p id={`pricing-faq-${index}`} className="mt-4 max-w-[60ch] text-small text-ink-muted">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function PricingFAQ() {
  return (
    <div className="border-t border-hairline">
      {PRICING_FAQ.map((item, i) => (
        <FAQItem key={item.question} {...item} index={i} />
      ))}
    </div>
  )
}
