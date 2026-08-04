import Image from 'next/image'
import Reveal from '@/components/Reveal'
import PillButton from '@/components/PillButton'

interface CTA {
  label: string
  href: string
}

/**
 * Inner-page hero: type only by default, no video, no full-bleed image —
 * that's the landing page's alone. An optional `image` is a deliberate
 * exception when real photography exists for a specific page (currently
 * Work and Services) — it sits behind the heading with a scrim for
 * legibility, matching the landing page hero's light-on-dark treatment.
 * Generous top whitespace so the page opens on emptiness, left-aligned,
 * never centered.
 */
export default function PageHero({
  title,
  subhead,
  ctas = [],
  image,
  align = 'left',
}: {
  title: string[]
  subhead?: string
  ctas?: CTA[]
  image?: string
  /** Right-anchors the whole text block within the hero — a scoped,
   * opted-in exception per page; every other page keeps the left-aligned
   * default described above. */
  align?: 'left' | 'right'
}) {
  const ink = image ? 'text-dark-ink' : 'text-ink'
  const muted = image ? 'text-dark-ink opacity-70' : 'text-ink-muted'
  const isRight = align === 'right'

  return (
    <section
      data-theme={image ? 'dark' : 'light'}
      aria-label={title.join(' ')}
      className={`relative overflow-hidden ${image ? 'bg-dark' : 'bg-ground'}`}
      style={{
        paddingTop: 'calc(var(--nav-height) + clamp(3rem, 16vh, 10rem))',
        paddingBottom: 'var(--section-y)',
      }}
    >
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" quality={92} className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(19,19,19,0.55), rgba(19,19,19,0.25) 45%, rgba(19,19,19,0.55))' }}
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className={isRight ? 'ml-auto max-w-[46ch] text-right' : ''}>
          <h1>
            <Reveal as="span" split="lines" immediate className={`block text-display font-normal ${ink}`}>
              {title}
            </Reveal>
          </h1>
          {subhead && <p className={`mt-6 max-w-[46ch] text-body ${muted}`}>{subhead}</p>}
          {ctas.length > 0 && (
            <div className={`mt-8 flex flex-wrap items-center gap-8 ${isRight ? 'justify-end' : ''}`}>
              {ctas.map((c) => (
                <PillButton key={c.href} href={c.href} dark={!!image}>
                  {c.label}
                </PillButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
