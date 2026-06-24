import type { Metadata } from 'next'
import { Linkedin, Mail } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'The people behind Bello Bleecker Digital Consulting — Adam Bello and Jackson Bleecker.',
}

const founders = [
  {
    name: 'Adam Bello',
    title: 'Co-Founder',
    initials: 'AB',
    bio: 'Adam Evans Bello is the Co-Founder of Bello Bleecker Digital Consulting. A native New Yorker, his diverse background across corporate, athletic, and international environments shapes his approach to brand differentiation and business growth. Adam is currently an undergraduate student-athlete at Bowdoin College, pursuing a B.A. in Government and Legal Studies with a minor in Economics while playing point guard on the Men\'s Basketball team. Nationally recognized for his business acumen, he is a Management Leadership for Tomorrow (MLT) Career Prep Fellow on the Consulting Track and an alumnus of the Black Venture Capital Consortium (BVCC). He completed The Wharton School of Business's AI for Business Specialization course, earning certifications in AI in Marketing and Finance and AI Fundamentals, and holds a Google certification in AI for Data Analysis. His professional footprint bridges finance, strategy, and operations — from building multi-million dollar revenue projection models for pre-launch startups, to conducting due diligence for early-stage VC investments, to leading cross-functional project management initiatives in Accra, Ghana. He and Jackson founded Bello Bleecker to eliminate the gap between a business\'s actual value and its digital presence.',
    image: '/adam-bello.jpg' as string | null,
    links: {
      linkedin: 'https://www.linkedin.com/in/adam-bello-57067231a',
      email: 'adam@bellobleecker.com',
    },
  },
  {
    name: 'Jackson Bleecker',
    title: 'Co-Founder',
    initials: 'JB',
    bio: 'Jackson Bleecker is the Co-Founder of Bello Bleecker Digital Consulting. A native of West Orange, New Jersey, his background spans startup strategy, global consulting, and competitive athletics — giving him a rare ability to move between analytical rigor and creative execution with equal fluency. Jackson is currently an undergraduate student-athlete at Bowdoin College, pursuing a B.A. in Government and Legal Studies with a minor in Economics while competing as a shooting guard on the Men\'s Basketball team. A NESCAC All-Academic honoree, he is a Management Leadership for Tomorrow (MLT) Career Prep Fellow on the Consulting Track, and the Founder and President of the Bowdoin AI Impact Club, one of the fastest-growing student organizations at the college. His professional experience bridges strategy, technology, and market intelligence — from driving growth strategy at Ballers, an AI-powered sports analytics startup, to interning at RILA Global Consulting, a premier consumer intelligence firm trusted by Fortune 500 companies. He co-founded Bello Bleecker on a simple conviction: small businesses deserve a digital presence that actually reflects their value.',
    image: '/jackson-bleecker.jpeg' as string | null,
    links: {
      linkedin: 'https://www.linkedin.com/in/jackson-bleecker/',
      email: 'jackson@bellobleecker.com',
    },
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-charcoal-900">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.8) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 rounded-full bg-gold" />
              <span className="font-sans text-xs font-600 tracking-[0.25em] uppercase text-gold">
                The Team
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,6.5rem)] font-700 text-cream leading-none mb-6 tracking-tight">
              Meet the founders.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-charcoal-200 leading-relaxed max-w-2xl">
              Two builders with a shared obsession: making small and mid-size businesses
              look and perform like industry leaders online.
            </p>
          </div>
        </div>
      </section>

      {/* Founder cards */}
      <section className="py-20 lg:py-28 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 max-w-3xl mx-auto lg:max-w-none">
            {founders.map((founder) => (
              <div key={founder.name} className="relative pb-3 pr-3 group/card">
                {/* Offset decorative border */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-gold/25 group-hover/card:border-gold/55 transition-[border-color] duration-200 pointer-events-none" />
                {/* Hover glow layer */}
                <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(43,127,255,0.22)' }} />
                <div className="relative z-10 bg-charcoal-900 border border-charcoal-700 rounded-2xl overflow-hidden group-hover/card:border-gold/40 transition-[border-color] duration-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                {/* Photo area */}
                <div className="relative aspect-square bg-charcoal-800 overflow-hidden">
                  {founder.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: 'linear-gradient(135deg, #0D1B4A 0%, #080B18 100%)' }}
                    >
                      <div
                        className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                        style={{ background: 'rgba(43,127,255,0.10)', borderColor: 'rgba(43,127,255,0.25)' }}
                      >
                        <span className="font-cormorant text-4xl font-700 text-gold">
                          {founder.initials}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-charcoal-400 tracking-widest uppercase">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-7 lg:p-8">
                  <div className="mb-4">
                    <h2 className="font-cormorant text-3xl font-700 text-cream tracking-tight mb-1">
                      {founder.name}
                    </h2>
                    <p className="font-sans text-sm font-600 text-gold tracking-wide">
                      {founder.title}
                    </p>
                  </div>

                  <p className="font-sans text-base text-charcoal-200 leading-relaxed mb-7">
                    {founder.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-5 border-t border-charcoal-700">
                    <a
                      href={founder.links.linkedin}
                      className="w-9 h-9 rounded-lg border border-charcoal-700 hover:border-gold/50 flex items-center justify-center text-charcoal-400 hover:text-gold transition-[border-color,color] duration-200"
                      aria-label={`${founder.name} on LinkedIn`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={`mailto:${founder.links.email}`}
                      className="w-9 h-9 rounded-lg border border-charcoal-700 hover:border-gold/50 flex items-center justify-center text-charcoal-400 hover:text-gold transition-[border-color,color] duration-200"
                      aria-label={`Email ${founder.name}`}
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Our approach."
            subtitle="We started Bello Bleecker because we believed small businesses deserved the same quality of digital work that big brands take for granted."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {[
              { number: '01', title: 'Client-First, Always', description: 'We treat every project like it is our own business on the line. Your success is our success.' },
              { number: '02', title: 'Speed Without Sacrifice', description: 'We move fast because speed matters in business. But never at the cost of craft.' },
              { number: '03', title: 'Built to Last', description: 'We build systems that scale with you — not templates that break the moment you grow.' },
            ].map((value) => (
              <div
                key={value.number}
                className="relative bg-charcoal-800 border border-charcoal-700 rounded-xl p-7 hover:border-gold/30 transition-[border-color,box-shadow] duration-200 group"
              >
                <div className="font-cormorant text-[5rem] font-800 leading-none mb-4 select-none" style={{ color: 'rgba(43,127,255,0.10)' }}>
                  {value.number}
                </div>
                <h3 className="font-cormorant text-xl font-700 text-cream mb-2 group-hover:text-gold transition-colors tracking-tight">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-charcoal-200 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal-800 border-t border-charcoal-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 rounded-full bg-gold" />
            <span className="font-sans text-xs font-600 tracking-[0.25em] uppercase text-gold">Let&apos;s Build</span>
            <div className="w-8 h-0.5 rounded-full bg-gold" />
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-700 text-cream mb-4 tracking-tight">
            Want to work with us?
          </h2>
          <p className="font-sans text-charcoal-200 mb-8">
            Start with a conversation. We respond to every inquiry within 24 hours.
          </p>
          <Link href="/start" className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-8 py-4 rounded-lg">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
