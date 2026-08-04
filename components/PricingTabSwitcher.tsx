'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import PricingCard from '@/components/PricingCard'
import PillButton from '@/components/PillButton'
import { PRICING_TIERS, FLAT_FEE_SERVICES } from '@/lib/constants'

/**
 * NOTE: rebuilt from partial context after an accidental full-site
 * rewrite was undone — reasonable reconstruction matching the
 * PRICING_TIERS / FLAT_FEE_SERVICES data shapes, not a guaranteed
 * byte-exact restoration of the original file.
 */
export default function PricingTabSwitcher() {
  const [tab, setTab] = useState<'monthly' | 'flat'>('monthly')

  return (
    <div>
      <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-[9999px] border border-hairline p-1">
        <button
          onClick={() => setTab('monthly')}
          className={`rounded-[9999px] px-5 py-2 text-small transition-colors duration-300 ${
            tab === 'monthly' ? 'bg-ink text-ground' : 'text-ink-muted hover:text-ink'
          }`}
        >
          Monthly plans
        </button>
        <button
          onClick={() => setTab('flat')}
          className={`rounded-[9999px] px-5 py-2 text-small transition-colors duration-300 ${
            tab === 'flat' ? 'bg-ink text-ground' : 'text-ink-muted hover:text-ink'
          }`}
        >
          One-time projects
        </button>
      </div>

      {tab === 'monthly' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.id} {...tier} index={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FLAT_FEE_SERVICES.map((service) => (
            <div key={service.id} className="flex flex-col rounded-[20px] border border-hairline bg-ground p-7 lg:p-8">
              <span className="font-mono text-label text-ink-muted">{service.number}</span>
              <h3 className="mt-3 text-lead font-normal text-ink">{service.title}</h3>
              <p className="mt-3 text-small text-ink-muted">{service.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-small text-ink-muted">
                    <Check size={15} className="mt-0.5 flex-shrink-0 text-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <PillButton href={service.ctaHref} className="mt-8 w-full justify-center">
                {service.cta}
              </PillButton>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
