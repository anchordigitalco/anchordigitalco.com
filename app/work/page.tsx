import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Bello Bleecker — websites and digital systems built for restaurants, brands, creators, and growing businesses.',
}

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[400px] opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold font-600">
                Portfolio
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,6.5rem)] font-700 text-cream leading-none mb-6 tracking-tight">
              Selected work.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-charcoal-300 leading-relaxed max-w-2xl">
              Every site is built custom — no templates, no compromises.
              Our first case studies are being documented and will be published here soon.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon state */}
      <section className="py-24 lg:py-32 bg-charcoal-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-charcoal-700 border border-charcoal-600 flex items-center justify-center mx-auto mb-8">
            <Clock size={28} className="text-gold" />
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-700 text-cream mb-4 tracking-tight">
            Case studies coming soon.
          </h2>
          <p className="font-sans text-charcoal-300 leading-relaxed mb-10 max-w-lg mx-auto">
            We&apos;re documenting our first projects with full breakdowns — the problem, the solution,
            and the results. Check back shortly.
          </p>
          <Link
            href="/start"
            className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-8 py-4 rounded-lg"
          >
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-charcoal-900 border-t border-charcoal-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-cormorant text-3xl lg:text-4xl font-700 text-cream mb-4 tracking-tight">
            Want your brand here?
          </h3>
          <p className="font-sans text-charcoal-300 mb-8 text-sm leading-relaxed">
            Every great site starts with a conversation. Tell us what you&apos;re building.
          </p>
          <Link
            href="/start"
            className="btn-primary inline-flex items-center gap-2 font-sans text-base px-10 py-5 rounded-lg"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
