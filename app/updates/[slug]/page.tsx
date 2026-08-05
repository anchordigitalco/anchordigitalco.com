import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Reveal from '@/components/Reveal'
import PillButton from '@/components/PillButton'
import TextLink from '@/components/TextLink'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { UPDATES, getUpdate } from '@/lib/updates'

export function generateStaticParams() {
  return UPDATES.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const update = getUpdate(slug)
  if (!update) return {}
  return {
    title: { absolute: `${update.title} | Anchor Digital` },
    description: update.excerpt,
  }
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const update = getUpdate(slug)
  if (!update) notFound()

  return (
    <>
      {/* News-style masthead: byline row, big headline, dek */}
      <section data-theme="light" className="bg-ground" style={{ paddingTop: 'calc(var(--nav-height) + clamp(3rem, 12vh, 8rem))', paddingBottom: 'clamp(2rem, 5vh, 4rem)' }}>
        <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <div className="flex items-center gap-3 text-label uppercase text-ink-muted">
            <span>Anchor Digital</span>
            <span aria-hidden="true">&middot;</span>
            <span>{update.category}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{update.date}</span>
          </div>

          <h1 className="mt-5">
            <Reveal as="span" split="lines" immediate className="block text-lead font-bold text-ink">
              {[update.title]}
            </Reveal>
          </h1>

          <p className="mt-6 max-w-[60ch] text-body font-normal text-ink-muted">{update.excerpt}</p>
        </div>
      </section>

      <section data-theme="light" className="bg-ground" style={{ paddingTop: 'clamp(1rem, 3vh, 2rem)', paddingBottom: 'var(--section-y)' }}>
        <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
          <div className="mx-auto grid max-w-site grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:items-start md:gap-14">
            {/* Left: photos */}
            <div className="flex flex-col gap-8 md:sticky md:top-[calc(var(--nav-height)+2rem)]">
              {update.beforeAfterSlides ? (
                update.beforeAfterSlides.map((pair, i) => (
                  <BeforeAfterSlider key={i} before={pair.before} after={pair.after} alt={`${update.title} ${i + 1}`} />
                ))
              ) : update.images ? (
                update.images.map((img, i) => (
                  <div key={i} className="relative overflow-hidden rounded-[14px] border border-hairline bg-ground-alt" style={{ aspectRatio: img.aspect }}>
                    <Image src={img.src} alt={`${update.title}: screenshot ${i + 1}`} fill sizes="(min-width: 768px) 55vw, 92vw" quality={92} className="object-cover object-top" />
                  </div>
                ))
              ) : (
                <div className="relative overflow-hidden rounded-[14px] border border-hairline bg-ground-alt" style={{ aspectRatio: '4 / 3' }}>
                  <Image
                    src={update.logo}
                    alt={update.logoAlt}
                    fill
                    sizes="(min-width: 768px) 55vw, 92vw"
                    quality={92}
                    className={update.fit === 'cover' ? 'object-cover' : 'object-contain p-16'}
                  />
                </div>
              )}
            </div>

            {/* Right: copy */}
            <div>
              <div className="flex flex-col gap-6">
                {update.body.map((paragraph, i) => (
                  <p key={i} className="text-body text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-hairline pt-10">
                <PillButton href="/start">Start a project</PillButton>
                {update.externalUrl && (
                  <a
                    href={update.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block text-small text-ink"
                  >
                    Visit site
                    <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-reveal group-hover:scale-x-100" />
                  </a>
                )}
                <TextLink href="/">Back to home</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
