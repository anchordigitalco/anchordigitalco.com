'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PricingCard from '@/components/PricingCard'
import { PRICING_TIERS } from '@/lib/constants'
import clsx from 'clsx'

export default function HomePricingSection() {
  const [tab, setTab] = useState<'subscription' | 'flatfee'>('subscription')
  const sectionRef = useRef<HTMLDivElement>(null)

  const switchToFlatFee = () => {
    setTab('flatfee')
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={sectionRef}>
      {/* Tab toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1 bg-charcoal-800 border border-charcoal-700 rounded-xl p-1">
          <button
            onClick={() => setTab('subscription')}
            className={clsx(
              'font-sans text-sm px-5 py-2.5 rounded-lg transition-all duration-200',
              tab === 'subscription'
                ? 'bg-gold text-charcoal-900 font-600'
                : 'text-charcoal-300 hover:text-cream'
            )}
          >
            Subscription Services
          </button>
          <button
            onClick={() => setTab('flatfee')}
            className={clsx(
              'font-sans text-sm px-5 py-2.5 rounded-lg transition-all duration-200',
              tab === 'flatfee'
                ? 'bg-gold text-charcoal-900 font-600'
                : 'text-charcoal-300 hover:text-cream'
            )}
          >
            Flat Fee Services
          </button>
        </div>
      </div>

      {/* Subscription cards */}
      {tab === 'subscription' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.id} {...tier} index={i} />
          ))}
        </div>
      )}

      {/* Flat fee summary cards */}
      {tab === 'flatfee' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            {
              title: 'Web Redesign',
              description: 'A full site rebuild. One-time fee, no ongoing commitment. Pricing based on your scope.',
            },
            {
              title: 'Digital Brand Elevation',
              description: 'Strategy, brand assessment, and a full redesign. Our most complete one-time offering.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-charcoal-700 rounded-xl p-7 flex flex-col gap-4 shadow-surface hover:border-charcoal-600 transition-all duration-300"
            >
              <div>
                <span className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-400 mb-2 block">One-Time</span>
                <h3 className="font-cormorant text-3xl font-700 text-charcoal-100 tracking-tight mb-1">{card.title}</h3>
                <p className="font-cormorant text-xl italic text-gold">Pricing based on your project</p>
              </div>
              <p className="font-sans text-sm text-charcoal-300 leading-relaxed flex-1">{card.description}</p>
              <Link
                href="/pricing"
                className="w-full text-center font-sans text-sm font-600 py-3.5 rounded-lg border border-charcoal-600 text-charcoal-200 hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Slim banner */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-charcoal-800 border border-charcoal-700 rounded-xl">
        <p className="font-sans text-sm text-charcoal-300">
          Looking for a one-time engagement? Tell us about your project and we will send you a custom quote.
        </p>
        <button
          onClick={switchToFlatFee}
          className="font-sans text-sm font-600 text-gold hover:text-cream transition-colors flex-shrink-0 text-left sm:text-right"
        >
          See Flat Fee Services →
        </button>
      </div>
    </div>
  )
}
