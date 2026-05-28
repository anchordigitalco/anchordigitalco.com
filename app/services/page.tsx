import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design and development, brand digital systems, ongoing maintenance, web redesign, and digital brand elevation for businesses that want premium digital presence.',
}

const FLAT_FEE_SERVICES = [
  {
    id: 'web-redesign',
    number: '04',
    title: 'Web Redesign',
    description:
      'Your site should be your strongest sales tool. If it is not converting, not ranking, or not representing your brand the way it should — we rebuild it from the ground up. One-time engagement, no ongoing commitment required.',
    tiers: [
      {
        name: 'Starter Redesign',
        price: '$300',
        detail: '1 to 3 pages, mobile responsive, contact form, modern design, SEO basics. Best for local businesses, personal brands, and restaurants.',
      },
      {
        name: 'Full Redesign',
        price: '$500',
        detail: 'Up to 6 pages, animations, booking or e-commerce integrations, CMS, advanced SEO, custom features. Best for startups and brands with multiple offerings.',
      },
    ],
    includes: [
      'Full custom redesign from scratch',
      'Mobile responsive across all devices',
      'On-page SEO foundation',
      'Contact forms and lead capture',
      'Cross-browser QA testing',
      'One round of revisions',
    ],
    cta: 'Start a Redesign',
    ctaHref: '/start?service=redesign',
  },
  {
    id: 'digital-brand-elevation',
    number: '05',
    title: 'Digital Brand Elevation',
    description:
      'For businesses not getting the traction they expected. We go beyond the website — auditing your entire digital presence, developing a brand strategy, and rebuilding your site to match. One engagement, complete transformation.',
    price: '$750 one-time',
    includes: [
      'Strategy consultation call (60 minutes)',
      'Written digital brand assessment',
      'Visual identity and positioning recommendations',
      'Full website redesign (up to 6 pages)',
      'SEO setup and digital roadmap',
      '30 days of post-launch support',
    ],
    cta: 'Start Your Elevation',
    ctaHref: '/start?service=digital-brand-elevation',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(100px)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold font-500">
                What We Build
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,7rem)] font-300 text-cream leading-none mb-6">
              What we build.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-charcoal-200 leading-relaxed max-w-2xl">
              Two service tracks — subscription plans for ongoing growth, and flat fee engagements for businesses that need a specific result.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Services category header */}
      <section className="bg-charcoal-800 border-y border-charcoal-700 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-gold" />
            <div>
              <p className="font-sans text-xs font-600 tracking-[0.2em] uppercase text-gold mb-0.5">Subscription Services</p>
              <p className="font-sans text-sm text-charcoal-300">Monthly subscription plans — build your site and keep it growing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription services */}
      {SERVICES.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`relative py-24 lg:py-32 ${i % 2 === 0 ? 'bg-charcoal-900' : 'bg-charcoal-800'}`}
        >
          {i % 2 !== 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
              />
            </div>
          )}
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-cormorant text-[6rem] lg:text-[8rem] font-300 leading-none select-none"
                    style={{ color: 'rgba(43,127,255,0.08)' }}
                  >
                    {service.number}
                  </span>
                </div>
                <h2 className="font-cormorant text-3xl lg:text-5xl font-500 text-cream mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="font-sans text-base lg:text-lg text-charcoal-200 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-px bg-gold" />
                  <span className="font-cormorant text-xl italic text-gold">{service.startingPrice}</span>
                </div>
                <Link
                  href="/start"
                  className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-7 py-4 rounded-xl"
                >
                  Start This Project
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div>
                <div className="bg-charcoal-900/60 border border-charcoal-700 rounded-xl p-8">
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal-300 mb-6">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center">
                          <Check size={11} strokeWidth={2.5} className="text-gold" />
                        </div>
                        <span className="font-sans text-sm text-charcoal-200 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Divider callout */}
      <section className="bg-charcoal-800 border-y border-charcoal-700 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-sans text-sm text-charcoal-300 max-w-lg">
            Not sure which path fits? Tell us about your business and we will recommend the right option.
          </p>
          <Link
            href="/start"
            className="font-sans text-sm font-600 text-gold hover:text-cream transition-colors flex-shrink-0"
          >
            Start the Conversation →
          </Link>
        </div>
      </section>

      {/* Flat Fee category header */}
      <section className="bg-charcoal-900 border-b border-charcoal-700 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-gold" />
            <div>
              <p className="font-sans text-xs font-600 tracking-[0.2em] uppercase text-gold mb-0.5">Flat Fee Services</p>
              <p className="font-sans text-sm text-charcoal-300">One-time engagements for businesses that need a specific result, not an ongoing plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flat fee service blocks */}
      {FLAT_FEE_SERVICES.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`relative py-24 lg:py-32 ${i % 2 === 0 ? 'bg-charcoal-800' : 'bg-charcoal-900'}`}
        >
          {i % 2 !== 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
              />
            </div>
          )}
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-cormorant text-[6rem] lg:text-[8rem] font-300 leading-none select-none"
                    style={{ color: 'rgba(43,127,255,0.08)' }}
                  >
                    {service.number}
                  </span>
                </div>
                <h2 className="font-cormorant text-3xl lg:text-5xl font-500 text-cream mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="font-sans text-base lg:text-lg text-charcoal-200 leading-relaxed mb-6">
                  {service.description}
                </p>

                {'tiers' in service && service.tiers ? (
                  <div className="space-y-3 mb-8">
                    {service.tiers.map((tier) => (
                      <div key={tier.name} className="flex items-start gap-4 p-4 bg-charcoal-900/50 border border-charcoal-700 rounded-xl">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-sans text-sm font-700 text-cream">{tier.name}</span>
                            <span className="font-cormorant text-lg font-700 text-gold">{tier.price}</span>
                          </div>
                          <p className="font-sans text-xs text-charcoal-300 leading-relaxed">{tier.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-gold" />
                    <span className="font-cormorant text-xl italic text-gold">{service.price}</span>
                  </div>
                )}

                <Link
                  href={service.ctaHref}
                  className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-7 py-4 rounded-xl"
                >
                  {service.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div>
                <div className="bg-charcoal-900/60 border border-charcoal-700 rounded-xl p-8">
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal-300 mb-6">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center">
                          <Check size={11} strokeWidth={2.5} className="text-gold" />
                        </div>
                        <span className="font-sans text-sm text-charcoal-200 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-charcoal-800">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="Ready to Start"
            title="Not sure which service fits?"
            subtitle="Tell us about your business and goals. We'll recommend the right path forward."
          />
          <Link
            href="/start"
            className="btn-primary inline-flex items-center gap-3 font-sans text-base px-10 py-5 rounded-xl mt-10"
          >
            Start the Conversation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
