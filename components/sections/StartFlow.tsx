'use client'
import { Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PillButton from '@/components/PillButton'
import InquiryForm from '@/components/sections/InquiryForm'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * The form starts hidden behind a single "Start your project" button —
 * clicking it swaps the button out for the form with a fade/rise motion
 * instead of showing every field immediately on page load.
 */
export default function StartFlow() {
  const [started, setStarted] = useState(false)
  const reduced = useReducedMotion()

  return (
    <div className="max-w-[520px]">
      <AnimatePresence mode="wait" initial={false}>
        {!started ? (
          <motion.div
            key="cta"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PillButton type="button" onClick={() => setStarted(true)}>
              Start your project
            </PillButton>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={null}>
              <InquiryForm />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
