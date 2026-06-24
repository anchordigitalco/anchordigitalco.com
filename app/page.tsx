import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import IndustryCard from '@/components/IndustryCard'
import ProcessStep from '@/components/ProcessStep'
import SectionHeader from '@/components/SectionHeader'
import HomePricingSection from '@/components/HomePricingSection'
import { INDUSTRIES, PROCESS_STEPS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Bello Bleecker Digital Consulting — Premium Web Design & Development',
  description: 'We build high-performing websites and digital systems for brands, restaurants, creators, and growing businesses. Premium digital consulting based in New York.',
}

const founders = [
  {
    name: 'Adam Bello',
    title: 'Co-Founder',
    initials: 'AB',
    image: '/adam-bello.jpg',
    gradientFrom: '#0D1B4A',
    gradientTo: '#080B18',
  },
  {
    name: 'Jackson Bleecker',
    title: 'Co-Founder',
    initials: 'JB',
    image: '/jackson-bleecker.jpeg',
    gradientFrom: '#0A1A30',
    gradientTo: '#080B18',
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* WHO WE WORK WITH */}
      <section className="relative py-24 lg:py-32 bg-charcoal-800 border-t border-charcoal-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Built for businesses like yours."
            subtitle="From restaurants to streetwear brands, we build premium digital systems across every category."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {INDUSTRIES.map((industry, i) => (
              <IndustryCard key={industry.title} {...industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS */}
      <section className="relative py-24 lg:py-32 bg-charcoal-900 border-t border-charcoal-700/50">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Team"
            title="Meet the founders."
            subtitle="Two builders united by one mission — giving every business a digital presence that commands attention and drives results."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 max-w-3xl mx-auto">
            {founders.map(({ name, title, initials, image, gradientFrom, gradientTo }) => (
              <Link key={name} href="/team" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-charcoal-800 border border-charcoal-700 hover:border-gold/30 transition-[border-color,box-shadow] duration-200 hover:shadow-gold-lg">
                  {/* Photo area */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt={name} className="w-full h-full object-cover object-center" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                      >
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center border"
                          style={{ background: 'rgba(43,127,255,0.12)', borderColor: 'rgba(43,127,255,0.25)' }}
                        >
                          <span className="font-cormorant text-3xl font-700 text-gold">{initials}</span>
                        </div>
                      </div>
                    )}
                    {/* Gradient fade at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal-800 to-transparent" />
                  </div>
                  <div className="px-6 pb-6 pt-4">
                    <h3 className="font-cormorant text-2xl font-700 text-cream mb-1">{name}</h3>
                    <p className="font-sans text-sm text-charcoal-200">{title}</p>
                    <div className="mt-4 flex items-center gap-2 text-gold font-sans text-sm font-600 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      Read bio <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/team"
              className="btn-secondary inline-flex items-center gap-2 font-sans text-sm px-7 py-3.5 rounded-lg"
            >
              Full Team Page <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-24 lg:py-32 overflow-hidden bg-charcoal-800 border-t border-charcoal-700/50">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.8) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHeader
                eyebrow="Our Process"
                title="How it works."
                subtitle="A clear, collaborative five-step process from idea to launch — and beyond."
                align="left"
              />
              <div className="mt-10 p-6 bg-charcoal-900 border border-charcoal-700 rounded-xl shadow-surface">
                <div className="font-cormorant text-4xl font-700 text-gold mb-2 tracking-tight">7 Days</div>
                <p className="font-sans text-sm text-charcoal-200">
                  Average time from kickoff to live launch. We move fast without cutting corners.
                </p>
              </div>
            </div>
            <div>
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.number} {...step} index={i} isLast={i === PROCESS_STEPS.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 lg:py-32 bg-charcoal-900 border-t border-charcoal-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, transparent pricing."
            subtitle="No hidden fees, no long-term contracts. Subscription plans and one-time engagements."
          />
          <div className="mt-14">
            <HomePricingSection />
          </div>
          <p className="font-sans text-xs text-charcoal-400 text-center mt-8">
            Subscription plans include SSL, hosting, mobile responsiveness, and monthly support. Month-to-month. No cancellation fees.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-charcoal-800 border-t border-charcoal-700/50">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] animate-pulse-accent pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 rounded-full bg-gold" />
            <span className="font-sans text-xs font-600 tracking-[0.25em] uppercase text-gold">Let&apos;s Build</span>
            <div className="w-8 h-0.5 rounded-full bg-gold" />
          </div>
          <h2 className="font-cormorant text-[clamp(2.8rem,6vw,5.5rem)] font-700 text-charcoal-50 leading-tight mb-6 tracking-tight">
            Ready to build<br />something great?
          </h2>
          <p className="font-sans text-lg text-charcoal-200 max-w-xl mx-auto leading-relaxed mb-10">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
            No commitment, no pressure — just a real conversation.
          </p>
          <Link
            href="/start"
            className="btn-primary inline-flex items-center gap-3 font-sans text-base px-10 py-5 rounded-lg"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
          <p className="font-sans text-xs text-charcoal-400 mt-6">
            Average response time under 4 hours · Based in New York · Serving clients nationwide
          </p>
        </div>
      </section>
    </>
  )
}
