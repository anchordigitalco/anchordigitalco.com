import Reveal from '@/components/Reveal'
import PillButton from '@/components/PillButton'

/**
 * NOTE: reconstructed after an accidental full-site rewrite was undone —
 * a reasonable closing CTA matching the site's established dark-section
 * pattern, not a guaranteed byte-exact restoration of the original copy.
 */
export default function Closer() {
  return (
    <section data-theme="dark" aria-label="Ready to start?" className="bg-dark" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
      <div style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <h2>
          <Reveal as="span" split="lines" stagger={0.14} className="block text-hero font-normal text-dark-ink">
            {['Close the gap']}
          </Reveal>
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <PillButton href="/start" dark>
            Start a project
          </PillButton>
          <PillButton href="/work" dark>
            See our work
          </PillButton>
        </div>
      </div>
    </section>
  )
}
