import type { Metadata } from 'next'
import { Linkedin, Mail } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import PageHero from '@/components/sections/PageHero'
import FadeUp from '@/components/FadeUp'
import PillButton from '@/components/PillButton'

export const metadata: Metadata = {
  title: { absolute: 'About Us: The Team Behind Anchor Digital' },
  description: 'Anchor Digital is a web design and development studio based in Maine and New York, built by college students helping small businesses compete online.',
}

const founders = [
  {
    name: 'Adam Bello',
    title: 'Co-Founder',
    initials: 'AB',
    bio: 'Adam Evans Bello is the Co-Founder of Anchor Digital. A native New Yorker, his diverse background across corporate, athletic, and international environments shapes his approach to brand differentiation and business growth. Adam is currently an undergraduate student-athlete at Bowdoin College, pursuing a B.A. in Government and Legal Studies with a minor in Economics while playing point guard on the Men\'s Basketball team. He is also a Management Leadership for Tomorrow (MLT) Career Prep Fellow on the Consulting Track and an alumnus of the Black Venture Capital Consortium (BVCC). He completed The Wharton School of Business\'s AI for Business Specialization course, earning a certification in AI in Marketing and Finance, and holds Google certifications in AI Fundamentals and AI for Data Analysis. His professional footprint bridges finance, strategy, and operations: from building multi-million dollar revenue projection models for pre-launch startups, to conducting due diligence for early-stage VC investments, to leading cross-functional project management initiatives in Accra, Ghana. He and Jackson founded Anchor Digital to eliminate the gap between a business\'s actual value and its digital presence.',
    image: '/adam-bello.jpg' as string | null,
    links: {
      linkedin: 'https://www.linkedin.com/in/adam-bello-57067231a',
      email: 'adam@anchordigitalco.com',
    },
  },
  {
    name: 'Jackson Bleecker',
    title: 'Co-Founder',
    initials: 'JB',
    bio: 'Jackson Bleecker is the Co-Founder of Anchor Digital. A native of West Orange, New Jersey, his background spans startup strategy, global consulting, and competitive athletics, giving him a rare ability to move between analytical rigor and creative execution with equal fluency. Jackson is currently an undergraduate student-athlete at Bowdoin College, pursuing a B.A. in Government and Legal Studies with a minor in Economics while competing as a shooting guard on the Men\'s Basketball team. A NESCAC All-Academic honoree, he is a Management Leadership for Tomorrow (MLT) Career Prep Fellow on the Consulting Track, and the Founder and President of the Bowdoin AI Impact Club, one of the fastest-growing student organizations at the college. His professional experience bridges strategy, technology, and market intelligence: from driving growth strategy at Ballers, an AI-powered sports analytics startup, to interning at RILA Global Consulting, a premier consumer intelligence firm trusted by Fortune 500 companies. He co-founded Anchor Digital on a simple conviction: small businesses deserve a digital presence that actually reflects their value.',
    image: '/jackson-bleecker.png' as string | null,
    links: {
      linkedin: 'https://www.linkedin.com/in/jackson-bleecker/',
      email: 'jackson@anchordigitalco.com',
    },
  },
]

const values = [
  { title: 'Client-first, always', description: 'We treat every project like our own business is on the line, because if you don\'t look good, neither do we.' },
  { title: 'Speed without sacrifice', description: 'We move fast because speed matters in business. But never at the cost of craft.' },
  { title: 'Built to last', description: 'We build systems that scale with you, not templates that break the moment you grow.' },
]

export default function TeamPage() {
  return (
    <>
      <PageHero
        title={['Team']}
        subhead="Anchor Digital is two college students who got tired of watching good local businesses lose to worse ones with better presentation."
        image="/images/team-header.png"
        ctas={[{ label: 'Start a project', href: '/start' }]}
      />

      {/* Founder cards */}
      <section data-theme="light" className="border-t border-hairline bg-ground-alt" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
        <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {founders.map((founder, i) => (
              <FadeUp
                key={founder.name}
                delay={i * 0.1}
                className={`group flex flex-col overflow-hidden rounded-[20px] border border-hairline bg-ground ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="relative aspect-square flex-shrink-0 overflow-hidden bg-ground-alt md:aspect-auto md:w-80 lg:w-96">
                  {founder.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-hairline">
                        <span className="text-body font-normal text-ink">{founder.initials}</span>
                      </div>
                      <span className="text-label uppercase text-ink-muted">Photo coming soon</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-center p-6 lg:p-7">
                  <div className="mb-3">
                    <h2 className="mb-1 text-body font-normal text-ink">{founder.name}</h2>
                    <p className="text-small text-ink-muted">{founder.title}</p>
                  </div>
                  <p className="mb-4 text-small text-ink-muted">{founder.bio}</p>
                  <div className="flex items-center gap-3 border-t border-hairline pt-4">
                    <a
                      href={founder.links.linkedin}
                      className="flex h-8 w-8 items-center justify-center border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
                      aria-label={`${founder.name} on LinkedIn`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href={`mailto:${founder.links.email}`}
                      className="flex h-8 w-8 items-center justify-center border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
                      aria-label={`Email ${founder.name}`}
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        data-theme="light"
        className="border-t border-hairline bg-ground-alt"
        style={{ paddingTop: 'var(--gutter)', paddingBottom: 'var(--gutter)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
      >
        <div
          className="mx-auto max-w-site rounded-[20px] border border-hairline bg-ground"
          style={{
            paddingTop: 'var(--section-y)',
            paddingBottom: 'var(--section-y)',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <SectionHeader
            title="Our approach"
            subtitle="We started Anchor Digital because we believed small businesses deserved the same quality of digital work that big brands take for granted."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <FadeUp key={value.title} delay={i * 0.08} className="rounded-[20px] border border-hairline p-7">
                <h3 className="mb-2 text-body text-ink">{value.title}</h3>
                <p className="text-small text-ink-muted">{value.description}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="light" className="border-t border-hairline bg-ground-alt" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
        <div className="mx-auto max-w-2xl text-center" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <h2 className="mb-4 text-display font-normal text-ink">We&apos;d like to hear about your business</h2>
          <p className="mb-8 text-body text-ink-muted">Start with a conversation. We respond to every inquiry, usually the same day.</p>
          <PillButton href="/start">Start a project</PillButton>
        </div>
      </section>
    </>
  )
}
