import Reveal from '@/components/Reveal'

interface PageHeroProps {
  section: string
  title: string
  subtitle: string
}

/**
 * Shared masthead for inner pages — headline/subtitle split, straight into
 * the content with no label row, matching how the homepage opens every
 * section (no eyebrow anywhere on it). `section` only names the <section>
 * for assistive tech, it is never rendered visibly.
 */
export default function PageHero({ section, title, subtitle }: PageHeroProps) {
  return (
    <section
      data-theme="light"
      aria-label={section}
      className="relative bg-ground"
      style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: 'var(--section-y)' }}
    >
      <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <h1 className="lg:col-span-7">
            <Reveal as="span" split="lines" immediate className="block text-display font-normal text-ink">
              {[title]}
            </Reveal>
          </h1>
          <p className="text-body text-ink-muted lg:col-span-4 lg:col-start-9 lg:self-end">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
