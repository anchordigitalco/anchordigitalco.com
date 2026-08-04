import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import Marquee from '@/components/sections/Marquee'
import PinnedSequence from '@/components/sections/PinnedSequence'
import PillarCards from '@/components/sections/PillarCards'
import TabbedPanel from '@/components/sections/TabbedPanel'
import Accordion from '@/components/sections/Accordion'
import ClosingStatement from '@/components/sections/ClosingStatement'
import { CLIENT_PROCESS, SERVICES_FAQ } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Services: Web Design, SEO & Maintenance | Anchor Digital' },
  description:
    'Custom website design and development, ongoing maintenance, SEO, branding, and consulting for small businesses in Maine, New York, and beyond. Every project starts with a free consultation.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SERVICES_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

// Same four cards (and photos) as the landing page's marquee, just a
// smaller version of it here.
const marqueeItems = [
  {
    id: 'strategy',
    title: 'Strategy',
    description: 'A real conversation about your goals,\naudience, and what success looks like.',
    image: '/images/design-card.png',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Direct access to your designer and\ndeveloper: no account managers, ever.',
    image: '/images/collaboration-card.png',
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Clean, well-structured code with fast\nload times and pixel-perfect execution.',
    image: '/images/development-card.png',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Cross-device QA, domain, and analytics:\nperforming exactly as expected on day one.',
    image: '/images/deployment-card.png',
  },
]

const panels = CLIENT_PROCESS

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={['Services']}
        subhead="Every business needs something different, so every quote gets built from a conversation instead of a menu."
        image="/images/services-header.png"
        align="right"
        ctas={[
          { label: 'Start a project', href: '/start' },
          { label: 'See our work', href: '/work' },
        ]}
      />

      {/* The gutter around this dark box is split into its own
          data-theme="light" elements (not plain CSS padding on an untagged
          wrapper) so the header's scroll observer has a real boundary to
          cross on both sides — see the matching comment in
          PinnedSequence's boxed variant for why. */}
      <div className="bg-ground" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div data-theme="light" style={{ height: 'calc(var(--gutter) + 1rem)' }} aria-hidden="true" />
        <section
          data-theme="dark"
          className="mx-auto max-w-site rounded-[20px] bg-dark"
          style={{
            paddingTop: 'clamp(2.5rem, 6vw, 4rem)',
            paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <TabbedPanel panels={panels} dark heading={['Our process']} />
        </section>
        <div data-theme="light" style={{ height: 'var(--gutter)' }} aria-hidden="true" />
      </div>

      <Marquee items={marqueeItems} compact />

      <PinnedSequence
        heading={['Built once', 'Maintained always']}
        paragraph="One partner for design, development, and everything after launch, so your site keeps working as hard as you do."
        states={['Design that reflects your brand.', 'Development that performs.', 'Support that never stops.']}
        boxed
      />

      <section data-theme="light" className="bg-ground" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <PillarCards />
      </section>

      <section data-theme="light" className="bg-ground" style={{ paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Accordion heading={['Common questions']} items={SERVICES_FAQ} />
      </section>

      <ClosingStatement
        lines={['Start with a conversation']}
        ctas={[{ label: 'Book a consultation', href: '/start' }]}
      />
    </>
  )
}
