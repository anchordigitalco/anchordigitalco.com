import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, ArrowRight } from 'lucide-react'
import PricingFAQ from '@/components/PricingFAQ'
import SectionHeader from '@/components/SectionHeader'
import PricingTabSwitcher from '@/components/PricingTabSwitcher'
import clsx from 'clsx'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent monthly pricing for websites and digital systems. Starter from $100/mo, Growth at $225/mo, Elite at $350/mo.',
}

const ALL_FEATURES: Array<{
  label: string
  starter: boolean | string
  growth: boolean | string
  elite: boolean | string
}> = [
  { label: 'Custom design', starter: true, growth: true, elite: true },
  { label: 'Mobile responsive', starter: true, growth: true, elite: true },
  { label: 'SSL & hosting', starter: true, growth: true, elite: true },
  { label: 'Contact form', starter: true, growth: true, elite: true },
  { label: 'SEO basics', starter: true, growth: true, elite: true },
  { label: 'Monthly edits', starter: '2 edits/mo', growth: 'Unlimited', elite: 'Unlimited' },
  { label: 'Number of pages', starter: '1–3', growth: 'Up to 5', elite: 'Unlimited' },
  { label: 'Email capture', starter: false, growth: true, elite: true },
  { label: 'Booking system', starter: false, growth: true, elite: true },
  { label: 'CMS', starter: false, growth: true, elite: true },
  { label: 'Advanced SEO', starter: false, growth: true, elite: true },
  { label: 'Analytics dashboard', starter: false, growth: true, elite: true },
  { label: 'E-commerce store', starter: false, growth: false, elite: true },
  { label: 'User accounts', starter: false, growth: false, elite: true },
  { label: 'Custom integrations', starter: false, growth: false, elite: true },
  { label: 'Consulting calls', starter: false, growth: false, elite: 'Monthly' },
  { label: 'Priority support', starter: false, growth: true, elite: 'Same-day' },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.05]"
            style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold font-500">
              Pricing
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,7rem)] font-300 text-cream leading-none mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="font-sans text-lg lg:text-xl text-charcoal-200 leading-relaxed max-w-2xl mx-auto">
            No hidden fees, no lock-in contracts. Three plans designed around where your business is right now.
          </p>
        </div>
      </section>

      {/* Website in 7 Days banner */}
      <section id="fast-launch" className="bg-charcoal-800 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                <Zap size={18} className="text-gold" />
              </div>
              <div>
                <div className="font-sans text-xs tracking-[0.12em] uppercase text-gold font-500 mb-0.5">
                  Fast Launch
                </div>
                <div className="font-cormorant text-xl font-500 text-cream">
                  Website in 7 Days
                </div>
              </div>
            </div>
            <p className="font-sans text-sm text-charcoal-200 max-w-sm">
              Whether you are starting fresh on a subscription plan or need a one-time redesign, most projects launch in 7 days or less.
            </p>
            <Link
              href="/start"
              className="btn-primary flex-shrink-0 font-sans text-sm px-6 py-3 rounded-xl inline-block"
            >
              Claim Fast Launch
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-24 lg:py-32 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PricingTabSwitcher />
          <p className="font-sans text-xs text-charcoal-400 text-center mt-8">
            Subscription plans include SSL, hosting, mobile responsiveness, and monthly support.
            Month-to-month after initial build. No cancellation fees.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 lg:py-28 bg-charcoal-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Compare Plans"
            title="Feature breakdown."
            subtitle="A complete look at what is included in each plan."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-charcoal-700">
                  <th className="text-left pb-4 font-sans text-xs tracking-[0.12em] uppercase text-charcoal-400 w-1/2">
                    Feature
                  </th>
                  <th className="pb-4 font-cormorant text-lg font-500 text-cream/70 text-center">Starter</th>
                  <th className="pb-4 font-cormorant text-lg font-500 text-gold text-center">Growth</th>
                  <th className="pb-4 font-cormorant text-lg font-500 text-cream/70 text-center">Elite</th>
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map(({ label, starter, growth, elite }) => (
                  <tr key={label} className="border-b border-charcoal-700/50 hover:bg-charcoal-700/20 transition-colors">
                    <td className="py-4 font-sans text-sm text-charcoal-200">{label}</td>
                    {([starter, growth, elite] as const).map((val, ti) => {
                      const tier = ['starter', 'growth', 'elite'][ti]
                      return (
                        <td key={tier} className="py-4 text-center">
                          {val === true ? (
                            <div className="flex justify-center">
                              <div className={clsx(
                                'w-5 h-5 rounded-xl flex items-center justify-center',
                                tier === 'growth' ? 'bg-gold/20 border border-gold/40' : 'bg-charcoal-600 border border-charcoal-500'
                              )}>
                                <Check size={10} strokeWidth={3} className={tier === 'growth' ? 'text-gold' : 'text-charcoal-300'} />
                              </div>
                            </div>
                          ) : val === false ? (
                            <span className="text-charcoal-600">—</span>
                          ) : (
                            <span className={clsx(
                              'font-sans text-xs',
                              tier === 'growth' ? 'text-gold' : 'text-charcoal-300'
                            )}>
                              {val}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-charcoal-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions."
          />
          <div className="mt-12">
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal-800 border-t border-charcoal-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-cormorant text-4xl lg:text-5xl font-300 text-cream mb-4">
            Still have questions?
          </h2>
          <p className="font-sans text-charcoal-300 mb-8">
            Reach out and we&apos;ll sort it out. We typically respond within a few hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/start"
              className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-8 py-4 rounded-xl"
            >
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:hello@bellobleecker.com"
              className="btn-secondary inline-flex items-center gap-2 font-sans text-sm px-8 py-4 rounded-xl"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
