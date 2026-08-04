import { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import TextLink from '@/components/TextLink'

interface FeatureBlockProps {
  heading: string[]
  body: string
  link?: { label: string; href: string }
  media: ReactNode
  reverse?: boolean
  /** Adds this block's own bottom padding back — for the last block
   * before a following section, where the gap should read as more
   * deliberate than the tight, consistent rhythm between blocks. */
  extraBottomGap?: boolean
  /** Overrides the text column's vertical alignment, which otherwise
   * mirrors `reverse` (top-aligned when reversed, bottom-aligned
   * otherwise) — for a reversed block that should still sit at the
   * bottom of its rectangle like the others. */
  alignBottom?: boolean
}

/**
 * Alternates side, asymmetric offset — never a tidy centered two-up.
 * Only top padding establishes the gap between consecutive blocks (and
 * the one before the next section after the last block) — a bottom
 * padding too would stack with the next block's own top padding into
 * one oversized, empty gap between them.
 */
export default function FeatureBlock({ heading, body, link, media, reverse = false, extraBottomGap = false, alignBottom }: FeatureBlockProps) {
  const bottomAlign = alignBottom ?? !reverse
  return (
    <section
      data-theme="light"
      aria-label={heading.join(' ')}
      className="bg-ground"
      style={{
        paddingTop: 'var(--section-y)',
        paddingBottom: extraBottomGap ? 'var(--section-y)' : undefined,
        paddingLeft: 'var(--gutter)',
        paddingRight: 'var(--gutter)',
      }}
    >
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-4">
        <div className={`md:col-span-7 ${reverse ? 'md:order-2 md:col-start-6' : ''}`}>{media}</div>
        <div
          className={`mt-8 md:col-span-4 md:mt-0 ${reverse ? 'md:order-1 md:col-start-1' : 'md:col-start-9'} ${
            bottomAlign ? 'md:self-end' : 'md:self-start'
          }`}
        >
          <h2>
            <Reveal as="span" split="lines" className="block text-display font-normal text-ink">
              {heading}
            </Reveal>
          </h2>
          <p className="mt-6 max-w-[38ch] text-body text-ink-muted">{body}</p>
          {link && (
            <div className="mt-6">
              <TextLink href={link.href} className="text-ink">
                {link.label}
              </TextLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
