'use client'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'

/**
 * Classic image-compare slider. The "after" image is the full-size base
 * layer; "before" sits on top, clipped with clip-path (not a shrinking
 * width) so next/image's `fill` sizing stays correct against the true
 * container size regardless of handle position.
 *
 * Starts most of the way to the right — mostly "before", with just a sliver
 * of "after" already showing — and dragging left reveals more of it.
 */
export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string
  after: string
  alt: string
}) {
  const [pos, setPos] = useState(82)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
  }

  return (
    <div
      ref={containerRef}
      className="relative touch-none select-none overflow-hidden rounded-[14px] border border-hairline bg-ground-alt"
      style={{ aspectRatio: '3018 / 1896' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After — full base layer, its label clipped to only the region the
          before layer isn't covering, so it never shows over the before
          photo */}
      <Image src={after} alt={`${alt}: after`} fill sizes="(min-width: 768px) 55vw, 92vw" quality={92} className="object-cover" priority={false} draggable={false} />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <span className="absolute right-3 top-3 rounded-full border border-ink/20 bg-ground px-3 py-1 text-label uppercase text-ink-muted">
          After
        </span>
      </div>

      {/* Before — clipped to the handle position, label riding along inside
          the same clip so it disappears exactly when the photo does */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}: before`} fill sizes="(min-width: 768px) 55vw, 92vw" quality={92} className="object-cover" draggable={false} />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-ink/20 bg-ground px-3 py-1 text-label uppercase text-ink-muted">
          Before
        </span>
      </div>

      {/* Divider line + drag handle */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-ground" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Comparison slider for ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-hairline bg-ground text-ink shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        style={{ left: `${pos}%` }}
      >
        <ArrowLeftRight size={16} />
      </div>
    </div>
  )
}
