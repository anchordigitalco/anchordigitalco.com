import Reveal from '@/components/Reveal'
import PillButton from '@/components/PillButton'

interface CTA {
  label: string
  href: string
}

export default function ClosingStatement({
  lines,
  ctas = [],
}: {
  lines: string[]
  ctas?: CTA[]
}) {
  return (
    <section
      data-theme="dark"
      aria-label={lines.join(' ')}
      className="bg-dark"
      style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}
    >
      <div style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <h2>
          <Reveal as="span" split="lines" stagger={0.14} className="block text-hero font-normal text-dark-ink">
            {lines}
          </Reveal>
        </h2>
        {ctas.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-8">
            {ctas.map((c) => (
              <PillButton key={c.href} href={c.href} dark>
                {c.label}
              </PillButton>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
