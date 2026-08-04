'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { STATE_PROJECTS } from '@/lib/constants'
import { US_STATE_SHAPES } from '@/lib/us-state-shapes'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

/**
 * Where we work, as a click-through rather than a caption — three real state
 * outlines (see lib/us-state-shapes.ts). Clicking one zooms it up via a
 * grid-template-columns ratio shift (the other two columns get squeezed
 * down rather than the shape itself being repositioned — animatable in all
 * modern browsers, no layout-measuring JS needed) and drops that state's
 * client list in below. A company's row links to its section further down
 * this page when one exists (`featured` in app/work/page.tsx), otherwise
 * just to /work — same fallback the homepage's ClientLogos strip uses.
 */
export default function WorkStateMap() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = STATE_PROJECTS.find((s) => s.id === activeId)

  return (
    <section
      data-theme="light"
      className="border-t border-hairline bg-ground"
      style={{ paddingTop: 'var(--gutter)', paddingBottom: 'calc(var(--gutter) * 1.8)' }}
    >
      <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <h2>
          <Reveal as="span" split="lines" className="block text-lead font-bold tracking-[-0.01em] text-ink">
            {['Main areas']}
          </Reveal>
        </h2>

        <div
          role="group"
          aria-label="Filter our work by state"
          className={`mt-12 grid items-end gap-6 transition-[grid-template-columns] duration-700 ease-in-out md:mt-16 md:gap-10 ${
            reduced ? '!transition-none' : ''
          }`}
          style={{
            gridTemplateColumns: STATE_PROJECTS.map((s) => (!activeId ? '1fr' : s.id === activeId ? '2.6fr' : '0.5fr')).join(' '),
          }}
        >
          {STATE_PROJECTS.map((state) => {
            const shape = US_STATE_SHAPES.find((s) => s.id === state.id)!
            const isActive = state.id === activeId
            const someActive = activeId !== null
            return (
              <button
                key={state.id}
                type="button"
                onClick={() => setActiveId(isActive ? null : state.id)}
                aria-pressed={isActive}
                aria-label={`${state.name}, ${state.companies.length} ${state.companies.length === 1 ? 'company' : 'companies'}`}
                className="flex min-w-0 flex-col items-center gap-4 py-2"
              >
                <svg
                  viewBox={shape.viewBox}
                  aria-hidden="true"
                  className={`fill-ink transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'h-56 w-56 opacity-100 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80'
                      : someActive
                        ? 'h-12 w-12 opacity-40 hover:opacity-70 sm:h-14 sm:w-14'
                        : 'h-32 w-32 opacity-60 hover:opacity-85 md:h-44 md:w-44 lg:h-52 lg:w-52'
                  }`}
                >
                  <path d={shape.path} />
                </svg>
                <span className={`truncate text-ink transition-all duration-300 ${someActive && !isActive ? 'text-small opacity-60' : 'text-body'}`}>
                  {state.name}
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: reduced ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : 0.98, transition: { duration: reduced ? 0.1 : 0.2, ease: [0.4, 0, 1, 1] } }}
              aria-live="polite"
              className="mt-8 rounded-[20px] border border-hairline p-2 md:mt-10"
            >
              <div className={active.companies.length > 3 ? 'grid grid-cols-1 sm:grid-cols-2' : ''}>
                {active.companies.map((company) => (
                  <Link
                    key={company.name}
                    href={company.href}
                    className="group flex items-center gap-3 rounded-[14px] px-4 py-3.5 transition-colors duration-300 hover:bg-ground-alt"
                  >
                    <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-ground-alt">
                      {company.logo ? (
                        <Image src={company.logo} alt="" fill sizes="40px" className="object-cover" />
                      ) : (
                        <span className="text-label text-ink-muted">{initials(company.name)}</span>
                      )}
                    </span>
                    <span className="text-body text-ink">{company.name}</span>
                    <ArrowUpRight
                      size={15}
                      className="ml-auto flex-shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-muted"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
