import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import PricingTabSwitcher from '@/components/PricingTabSwitcher'
import PricingFAQ from '@/components/PricingFAQ'
import PillButton from '@/components/PillButton'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent monthly pricing for websites and digital systems. Starter from $100/mo, Growth at $225/mo, Elite at $350/mo.',
}

// NOTE: rebuilt from partial context after an accidental full-site rewrite
// was undone. The PageHero + "Website in 7 days" banner below are
// reconstructed from an exact fragment still in context; the pricing
// cards / FAQ sections that followed are a reasonable reconstruction
// using the real PRICING_TIERS / FLAT_FEE_SERVICES / PRICING_FAQ data,
// not a guaranteed byte-exact restoration of the rest of the file.
export default function PricingPage() {
  return (
    <>
      <PageHero
        section="Pricing"
        title="Simple, transparent pricing."
        subtitle="No hidden fees, no lock-in contracts. Three plans designed around where your business is right now."
      />

      {/* Website in 7 Days banner */}
      <section id="fast-launch" data-theme="light" className="border-y border-hairline bg-ground-alt">
        <div className="mx-auto max-w-site py-5" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lead font-normal text-ink">Website in 7 days</p>
            <p className="max-w-sm text-small text-ink-muted">
              Subscription plan or one-time redesign, most projects launch in 7 days or less.
            </p>
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-ground" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="mx-auto max-w-site">
          <PricingTabSwitcher />
        </div>
      </section>

      <section data-theme="light" className="border-t border-hairline bg-ground" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="mx-auto max-w-site">
          <h2 className="mb-10 text-display font-normal text-ink">Common questions</h2>
          <PricingFAQ />
        </div>
      </section>

      <section data-theme="light" className="border-t border-hairline bg-ground-alt" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
        <div className="mx-auto max-w-2xl text-center" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <h2 className="mb-4 text-display font-normal text-ink">Ready to get started?</h2>
          <p className="mb-8 text-body text-ink-muted">Pick a plan or reach out for a custom quote. Either way, we&apos;ll reply the same day.</p>
          <PillButton href="/start">Start a project</PillButton>
        </div>
      </section>
    </>
  )
}
