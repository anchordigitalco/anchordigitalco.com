import { Check, X } from 'lucide-react'
import Reveal from '@/components/Reveal'

interface Row {
  label: string
  anchor: boolean | string
  diy: boolean | string
  freelance: boolean | string
}

/**
 * NOTE: reconstructed after an accidental full-site rewrite was undone —
 * a reasonable comparison table matching the known heading/rows/note
 * prop shape, not a guaranteed byte-exact restoration of the original
 * file.
 */
function Mark({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={16} className="text-ink" />
  if (value === false) return <X size={16} className="text-ink-faint" />
  return <span className="text-small text-ink-muted">{value}</span>
}

export default function ComparisonTable({ heading, rows, note }: { heading: string[]; rows: Row[]; note?: string }) {
  return (
    <div>
      <h2 className="mb-10">
        <Reveal as="span" split="lines" className="block text-display font-normal text-ink">
          {heading}
        </Reveal>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-hairline text-left">
              <th className="pb-4 text-small font-normal text-ink-muted"></th>
              <th className="pb-4 text-center text-body font-normal text-ink">Anchor</th>
              <th className="pb-4 text-center text-small font-normal text-ink-muted">DIY</th>
              <th className="pb-4 text-center text-small font-normal text-ink-muted">Freelancer</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-hairline">
                <td className="py-4 pr-6 text-small text-ink-muted">{row.label}</td>
                <td className="py-4 text-center">
                  <div className="flex justify-center">
                    <Mark value={row.anchor} />
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center">
                    <Mark value={row.diy} />
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center">
                    <Mark value={row.freelance} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-6 text-label text-ink-muted">{note}</p>}
    </div>
  )
}
