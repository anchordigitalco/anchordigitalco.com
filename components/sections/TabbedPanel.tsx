'use client'
import { useState } from 'react'
import Reveal from '@/components/Reveal'

interface Panel {
  label: string
  heading: string
  subhead?: string
  body: string
}

/**
 * NOTE: reconstructed after an accidental full-site rewrite was undone —
 * a reasonable tab UI matching the known panels/dark prop shape, not a
 * guaranteed byte-exact restoration of the original file.
 */
export default function TabbedPanel({ panels, dark = false, heading }: { panels: Panel[]; dark?: boolean; heading?: string[] }) {
  const [active, setActive] = useState(0)
  const panel = panels[active]
  const ink = dark ? 'text-dark-ink' : 'text-ink'
  const muted = dark ? 'text-dark-ink opacity-70' : 'text-ink-muted'
  const border = dark ? 'border-white/15' : 'border-hairline'

  return (
    <div>
      {heading && (
        <h2 className="mb-10">
          <Reveal as="span" split="lines" className={`block text-display font-normal ${ink}`}>
            {heading}
          </Reveal>
        </h2>
      )}
      <div className={`flex flex-wrap gap-2 border-b ${border}`}>
        {panels.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-small transition-colors duration-300 ${
              i === active ? ink : muted
            }`}
            style={i === active ? { borderBottom: `1.5px solid currentColor` } : undefined}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="pt-10">
        <h3>
          <Reveal as="span" split="lines" className={`block text-display font-normal ${ink}`}>
            {[panel.heading]}
          </Reveal>
        </h3>
        {panel.subhead && <p className={`mt-3 text-small ${muted}`}>{panel.subhead}</p>}
        <p className={`mt-6 max-w-[52ch] text-body ${muted}`}>{panel.body}</p>
      </div>
    </div>
  )
}
