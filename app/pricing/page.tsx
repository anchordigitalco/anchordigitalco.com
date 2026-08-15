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
// was undone. The PageHero below is reconstructed from an exact fragment
// still in context; the pricing cards / FAQ sections that followed are a
// reasonable reconstruction using the real PRICING_TIERS /
// FLAT_FEE_SERVICES / PRICING_FAQ data, not a guaranteed byte-exact
// restoration of the rest of the file. The "Website in 7 days" banner
// this page originally had has been removed — no specific day-count
// launch guarantee anywhere on the site now.
export default function PricingPage() {
  return (
    <>
      <PageHero
        section="Pricing"
        title="Simple, transparent pricing."
        subtitle="No hidden fees, no lock-in contracts. Three plans designed around where your business is right now."
      />

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
