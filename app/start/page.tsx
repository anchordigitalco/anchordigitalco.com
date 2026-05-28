import type { Metadata } from 'next'
import { Suspense } from 'react'
import MultiStepForm from '@/components/MultiStepForm'

export const metadata: Metadata = {
  title: 'Start Your Project',
  description:
    'Tell us about your business and project. We\'ll get back to you within 24 hours with a clear path forward.',
}

export default function StartPage() {
  return (
    <>
      <section className="relative min-h-screen pt-36 lg:pt-44 pb-20 overflow-hidden bg-charcoal-900">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(100px)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Context */}
            <div className="lg:sticky lg:top-32 pt-8 lg:pt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold font-500">
                  Get Started
                </span>
              </div>
              <h1 className="font-cormorant text-[clamp(2.5rem,5vw,5rem)] font-300 text-cream leading-none mb-6">
                Let&apos;s build
                <br />
                <span className="italic text-gold">something great.</span>
              </h1>
              <p className="font-sans text-base lg:text-lg text-charcoal-200 leading-relaxed mb-10">
                Fill out this quick brief and we&apos;ll get back to you within 24 hours
                with a clear plan, honest pricing, and zero pressure.
              </p>

              {/* Trust signals */}
              <div className="space-y-4">
                {[
                  { label: 'Response Time', value: 'Under 24 hours' },
                  { label: 'Average Launch', value: '7–14 days' },
                  { label: 'No Commitment', value: 'Month-to-month' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4 py-4 border-b border-charcoal-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <div className="flex items-center justify-between w-full">
                      <span className="font-sans text-sm text-charcoal-300">{label}</span>
                      <span className="font-cormorant text-lg italic text-cream">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Average response note */}
              <div className="mt-10 p-6 bg-charcoal-800 border border-charcoal-700 rounded-xl">
                <p className="font-sans text-sm text-charcoal-300 leading-relaxed">
                  We typically respond within a few hours with a clear path forward — no fluff, no hard sell.
                  Just an honest conversation about your project.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-sans text-xs text-charcoal-400">Average response: under 4 hours</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-charcoal-800/50 border border-charcoal-700 rounded-xl p-8 lg:p-10">
              <Suspense fallback={null}>
                <MultiStepForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
