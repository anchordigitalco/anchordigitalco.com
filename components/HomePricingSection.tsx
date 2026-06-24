'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PricingCard from '@/components/PricingCard'
import { PRICING_TIERS } from '@/lib/constants'
import clsx from 'clsx'

export default function HomePricingSection() {
  const [tab, setTab] = useState<'subscription' | 'flatfee'>('flatfee')
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
            onClick={() => setTab('flatfee')}
            className={clsx(
              'font-sans text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 touch-manipulation',
              tab === 'flatfee'
                ? 'bg-gold text-charcoal-900 font-600'
                : 'text-charcoal-200 hover:text-cream'
            )}
          >
            <span className="hidden sm:inline">Flat Fee Services</span>
            <span className="sm:hidden">Flat Fee</span>
          </button>
          <button
            onClick={() => setTab('subscription')}
            className={clsx(
              'font-sans text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 touch-manipulation',
              tab === 'subscription'
                ? 'bg-gold text-charcoal-900 font-600'
                : 'text-charcoal-200 hover:text-cream'
            )}
          >
            <span className="hidden sm:inline">Subscription Services</span>
            <span className="sm:hidden">Subscriptions</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'Web Redesign',
              description: 'A full site rebuild. One-time fee, no ongoing commitment. Pricing based on your scope.',
              tagline: 'For businesses that need a fresh start.',
              featured: false,
            },
            {
              title: 'Digital Brand Elevation',
              description: 'Strategy, brand assessment, and a full redesign. Our most complete one-time offering.',
              tagline: 'For businesses ready for a complete transformation.',
              featured: true,
            },
          ].map((card) => (
            <div
              key={card.title}
              className={clsx(
                'relative flex flex-col rounded-xl overflow-hidden transition-all duration-300',
                card.featured
                  ? 'bg-charcoal-800 border-2 border-gold shadow-gold-lg scale-[1.02] lg:scale-[1.04]'
                  : 'bg-charcoal-800 border border-charcoal-600 hover:border-charcoal-500'
              )}
            >
              {card.featured && <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold" />}
              {card.featured && (
                <div className="absolute top-5 right-5">
                  <span className="font-sans text-[10px] font-700 tracking-[0.15em] uppercase bg-gold text-white px-2.5 py-1 rounded-md">
                    Most Comprehensive
                  </span>
                </div>
              )}
              <div className="p-7 lg:p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <span className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-400 mb-2 block">One-Time</span>
                  <h3 className={clsx('font-cormorant text-3xl font-700 mb-1 tracking-tight', card.featured ? 'text-gold' : 'text-charcoal-100')}>
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-200 font-400">{card.tagline}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-7 pb-7 border-b border-charcoal-700">
                  <span className="font-cormorant text-3xl font-700 italic text-gold">Pricing based on your project</span>
                </div>
                <p className="font-sans text-sm text-charcoal-200 leading-relaxed flex-1 mb-8">{card.description}</p>
                <Link
                  href="/pricing"
                  className={clsx(
                    'w-full text-center font-sans text-sm font-600 py-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2',
                    card.featured
                      ? 'btn-primary'
                      : 'border border-charcoal-600 text-charcoal-200 hover:border-gold/40 hover:text-gold hover:bg-gold/5'
                  )}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slim banner */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-charcoal-800 border border-charcoal-700 rounded-xl">
        <p className="font-sans text-sm text-charcoal-200">
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
