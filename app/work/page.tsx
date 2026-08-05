import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import FeatureBlock from '@/components/sections/FeatureBlock'
import PinnedSequence from '@/components/sections/PinnedSequence'
import ClosingStatement from '@/components/sections/ClosingStatement'
import SitePreview from '@/components/SitePreview'
import { PROJECTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Our Work: Website Design Portfolio | Anchor Digital' },
  description:
    'Custom websites built for personal brands, education, and trades and service businesses in Maine, New York, and nationwide.',
}

const featured = [
  {
    slug: 'score-signal',
    heading: ['AI-Powered Web Tools'],
    body: "The most ambitious project we've shipped. We led design, layout, and nearly every front-end feature for Score Signal, and conceived its AI helper ourselves, from the original idea through the interface.",
  },
  // FairTest removed from the work page for the time being — data stays
  // intact in lib/constants.ts PROJECTS, just add this object back to
  // re-feature it here.
  {
    slug: 'ray-cuevo',
    heading: ['Small Businesses'],
    body: 'A training site for Ray Cuevo, built to turn visitors into client inquiries in a competitive local fitness market.',
  },
  {
    slug: 'marcus-bleecker',
    heading: ['Personal Brands'],
    body: 'A personal brand site for Marcus Bleecker, built to establish a strong digital presence and showcase his work and story.',
  },
]

export default function WorkPage() {
  return (
    <>
      <PageHero
        title={['Work']}
        subhead="Every project here started as an empty file and a conversation. Nothing is a template, and nothing was handed off and forgotten."
        ctas={[{ label: 'Read about recent work', href: '/#updates' }]}
        image="/images/work-header.png"
      />

      {featured.map((item, i) => {
        const project = PROJECTS.find((p) => p.slug === item.slug)!
        return (
          <div key={item.slug} id={item.slug} style={{ scrollMarginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <FeatureBlock
              heading={item.heading}
              body={item.body}
              link={{ label: 'View site', href: project.url }}
              reverse={i % 2 === 1}
              extraBottomGap={i === featured.length - 1}
              media={
                <SitePreview
                  name={project.name}
                  url={project.url}
                  previewImage={project.previewImage}
                  className="aspect-[8/5] border border-hairline"
                />
              }
            />
          </div>
        )
      })}

      <PinnedSequence
        heading={['How the work', 'gets made']}
        paragraph="Every project starts with a real conversation, not a template, then a custom build, launched fast and supported after."
        states={['Discovery, not decks.', 'Custom code, not templates.', 'Support that continues after launch.']}
      />

      <ClosingStatement
        lines={['Every project starts with a real conversation,', 'not a template']}
        ctas={[{ label: 'Start a project', href: '/start' }]}
        footnote="Out of respect for client privacy, we don't showcase the majority of our work here. Ask us during a call and we're happy to share more."
      />
    </>
  )
}
