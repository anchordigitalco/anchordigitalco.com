import { Check } from 'lucide-react'
import PillButton from '@/components/PillButton'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  tagline: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
  index: number
}

/**
 * NOTE: rebuilt from partial context after an accidental full-site
 * rewrite was undone — this is a reasonable reconstruction matching the
 * PRICING_TIERS data shape and the site's established card conventions,
 * not a guaranteed byte-exact restoration of the original file.
 */
export default function PricingCard({
  name,
  price,
  period,
  tagline,
  features,
  cta,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-[20px] border p-7 lg:p-8 ${
        highlighted ? 'border-ink bg-ground' : 'border-hairline bg-ground'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-7 rounded-[20px] border border-ink bg-ink px-3 py-1 text-label text-ground">
          {badge}
        </span>
      )}
      <h3 className="text-lead font-normal text-ink">{name}</h3>
      <p className="mt-2 text-small text-ink-muted">{tagline}</p>
      <p className="mt-6">
        <span className="text-display font-normal text-ink">{price}</span>
        {period && <span className="text-small text-ink-muted">{period}</span>}
      </p>
      <ul className="mt-7 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-small text-ink-muted">
            <Check size={15} className="mt-0.5 flex-shrink-0 text-ink" />
            {f}
          </li>
        ))}
      </ul>
      <PillButton href="/start" className="mt-8 w-full justify-center" dark={false}>
        {cta}
      </PillButton>
    </div>
  )
}
