import type { Metadata } from 'next'
import { Palette, Code2, LifeBuoy } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import PinnedSequence from '@/components/sections/PinnedSequence'
import PillarCards from '@/components/sections/PillarCards'
import TabbedPanel from '@/components/sections/TabbedPanel'
import Accordion from '@/components/sections/Accordion'
import ClosingStatement from '@/components/sections/ClosingStatement'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
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

// The old inline carousel's own four photos, plus three more real,
// non-logo images already in the project that weren't otherwise in use on
// this page — up to 7 tiles for the zoom-parallax gallery. Index 0 is the
// widest/strongest shot, since that's the one that ends up filling the
// screen at full zoom.
const galleryImages = [
  { src: '/images/brand-digital-systems.png', alt: '' },
  { src: '/images/design-card.png', alt: '' },
  { src: '/images/collaboration-card.png', alt: '' },
  { src: '/images/development-card.png', alt: '' },
  { src: '/images/deployment-card.png', alt: '' },
  { src: '/images/ongoing-maintenance.png', alt: '' },
  { src: '/images/live-in-days-block.png', alt: '' },
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
        <section data-theme="dark" className="mx-auto max-w-site">
          <div
            className="rounded-[20px] border border-[rgba(242,240,236,0.14)] bg-dark text-dark-ink"
            style={{
              paddingTop: 'clamp(2.5rem, 6vw, 4rem)',
              paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
              paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
              paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <TabbedPanel panels={panels} dark heading={['Our process']} />
          </div>
        </section>
        <div data-theme="light" style={{ height: 'var(--gutter)' }} aria-hidden="true" />
      </div>

      <ZoomParallax images={galleryImages} />

      <PinnedSequence
        heading={['Built once', 'Maintained always']}
        paragraph="One partner for design, development, and everything after launch, so your site keeps working as hard as you do."
        cards={[
          { icon: <Palette className="size-4 text-dark-ink" />, title: 'Design', description: 'that reflects your brand.' },
          { icon: <Code2 className="size-4 text-dark-ink" />, title: 'Development', description: 'that performs.' },
          { icon: <LifeBuoy className="size-4 text-dark-ink" />, title: 'Support', description: 'that never stops.' },
        ]}
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
