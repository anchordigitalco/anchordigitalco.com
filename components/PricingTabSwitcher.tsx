'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import PricingCard from '@/components/PricingCard'
import { PRICING_TIERS } from '@/lib/constants'
import clsx from 'clsx'

const FLAT_FEE_CARDS = [
  {
    id: 'web-redesign',
    title: 'Web Redesign',
    description: 'A complete site rebuild with no ongoing commitment. Pricing is based on your scope — get a quote from us.',
    includes: [
      'Custom redesign from scratch',
      'Mobile responsive',
      'SEO basics',
      'Contact forms',
      'One round of revisions',
    ],
    cta: 'Get a Quote',
    href: '/start?service=redesign',
    badge: undefined,
  },
  {
    id: 'digital-brand-elevation',
    title: 'Digital Brand Elevation',
    description: 'Our most complete one-time offering. Strategy, brand assessment, and a full redesign in one engagement. Pricing based on your project.',
    includes: [
      'Strategy consultation call',
      'Written brand assessment',
      'Visual identity recommendations',
      'Full redesign (up to 6 pages)',
      'SEO setup and digital roadmap',
      '30 days post-launch support',
    ],
    cta: 'Get a Quote',
    href: '/start?service=digital-brand-elevation',
    badge: 'Most Comprehensive',
  },
]

export default function PricingTabSwitcher() {
  const [tab, setTab] = useState<'subscription' | 'flatfee'>('flatfee')

  return (
    <div>
      {/* Tab toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1 bg-charcoal-800 border border-charcoal-700 rounded-xl p-1">
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
        </div>
      </div>

      {/* Subscription tier cards */}
      {tab === 'subscription' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.id} {...tier} index={i} />
          ))}
        </div>
      )}

      {/* Flat fee cards */}
      {tab === 'flatfee' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FLAT_FEE_CARDS.map((card) => (
            <div
              key={card.id}
              className={clsx(
                'relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300',
                card.badge
                  ? 'bg-white border-2 border-gold shadow-gold-lg'
                  : 'bg-white border border-charcoal-700 hover:border-charcoal-600 shadow-surface'
              )}
            >
              {card.badge && <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold" />}
              {card.badge && (
                <div className="absolute top-5 right-5">
                  <span className="font-sans text-[10px] font-700 tracking-[0.15em] uppercase bg-gold text-white px-2.5 py-1 rounded-md">
                    {card.badge}
                  </span>
                </div>
              )}
              <div className="p-7 lg:p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <span className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-400 mb-2 block">One-Time</span>
                  <h3 className={clsx('font-cormorant text-3xl font-700 mb-1 tracking-tight', card.badge ? 'text-gold' : 'text-charcoal-100')}>
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-300 font-400">{card.description}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-7 pb-7 border-b border-charcoal-700">
                  <span className="font-cormorant text-3xl font-700 italic text-gold">Pricing based on your project</span>
                </div>
                <ul className="space-y-3.5 flex-1 mb-8">
                  {card.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className={clsx(
                        'flex-shrink-0 mt-0.5 w-4 h-4 rounded-md flex items-center justify-center',
                        card.badge ? 'bg-gold/15 text-gold' : 'bg-charcoal-800 text-charcoal-300 border border-charcoal-600'
                      )}>
                        <Check size={10} strokeWidth={3} className={card.badge ? 'text-gold' : 'text-charcoal-300'} />
                      </div>
                      <span className="font-sans text-sm text-charcoal-200 leading-relaxed font-400">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.href}
                  className={clsx(
                    'w-full text-center font-sans text-sm font-600 py-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2',
                    card.badge
                      ? 'btn-primary'
                      : 'border border-charcoal-600 text-charcoal-200 hover:border-gold/40 hover:text-gold hover:bg-gold/5'
                  )}
                >
                  {card.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
