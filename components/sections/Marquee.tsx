'use client'
import { PointerEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SitePreview from '@/components/SitePreview'
import PlaceholderFrame from '@/components/PlaceholderFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LOOP_SECONDS = 38
const WHEEL_SENSITIVITY = 1.4

export interface MarqueeItem {
  id: string
  title: string
  description: string
  href?: string
  /** Real site preview (screenshot or live iframe) — omit for a type-only card. */
  preview?: { name: string; url: string; previewImage?: string; previewDisabled?: boolean }
  /** Static photo card, matching the landing page's marquee — string for a
   * real photo, null for a flat placeholder (no photo yet), omit entirely
   * for the plain type-only card (no media slot at all). */
  image?: string | null
}

/**
 * Infinite horizontal loop, duplicated in the DOM. Three card variants
 * depending on what an item provides: `preview` shows real client work
 * (screenshot or live iframe); `image` shows a static photo card — same
 * treatment as the landing page's marquee, just optionally smaller via
 * `compact`; neither is the plain type-only card (label plus two-line
 * caption, no media slot at all).
 */
export default function Marquee({
  items,
  noBottomGap = false,
  noTopGap = false,
  compact = false,
}: {
  items: MarqueeItem[]
  /** Skip this section's own bottom padding — for callers immediately
   * followed by a section that already has generous top padding of its
   * own, where the two would otherwise stack into one oversized, empty
   * gap between them. */
  noBottomGap?: boolean
  /** Same idea, top side — for callers immediately preceded by a section
   * that already has its own generous bottom padding. */
  noTopGap?: boolean
  /** Smaller card width — for callers echoing the landing page's marquee
   * at a reduced size rather than its full scale. */
  compact?: boolean
}) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const stateRef = useRef({
    x: 0,
    halfWidth: 0,
    dragging: false,
    startX: 0,
    startPosX: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  })

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return

    const measure = () => { stateRef.current.halfWidth = track.scrollWidth / 2 }
    measure()
    window.addEventListener('resize', measure)

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const s = stateRef.current
      if (!s.dragging) {
        if (s.halfWidth > 0) {
          const speed = s.halfWidth / LOOP_SECONDS
          s.x -= speed * (hovered ? 0.4 : 1) * dt
        }
        if (s.velocity !== 0) {
          s.x += s.velocity * dt
          s.velocity *= Math.max(0, 1 - dt * 4)
          if (Math.abs(s.velocity) < 2) s.velocity = 0
        }
      }
      if (s.halfWidth > 0) {
        s.x = s.x % s.halfWidth
        if (s.x > 0) s.x -= s.halfWidth
      }
      track.style.transform = `translate3d(${s.x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [reduced, hovered])

  // Only a genuinely horizontal gesture browses the cards — plain vertical
  // wheel/trackpad scroll is left alone to keep moving the page.
  useEffect(() => {
    if (reduced) return
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e: globalThis.WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      stateRef.current.x -= e.deltaX * WHEEL_SENSITIVITY
      stateRef.current.velocity = 0
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [reduced])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current
    s.dragging = true
    s.startX = e.clientX
    s.startPosX = s.x
    s.lastX = e.clientX
    s.lastT = performance.now()
    s.velocity = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current
    if (!s.dragging) return
    const now = performance.now()
    const dt = (now - s.lastT) / 1000
    if (dt > 0) s.velocity = (e.clientX - s.lastX) / dt
    s.x = s.startPosX + (e.clientX - s.startX)
    s.lastX = e.clientX
    s.lastT = now
  }
  const onPointerUp = () => {
    stateRef.current.dragging = false
  }

  const displayItems = [...items, ...items]

  return (
    <section
      data-theme="light"
      aria-label="Marquee"
      className="overflow-hidden bg-ground"
      style={{ paddingTop: noTopGap ? 0 : 'var(--section-y)', paddingBottom: noBottomGap ? 0 : 'var(--section-y)' }}
    >
      <div
        ref={wrapRef}
        data-lenis-prevent-horizontal
        className="cursor-grab select-none touch-pan-y active:cursor-grabbing"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={trackRef} className="marquee-track flex gap-6" style={{ paddingLeft: 'var(--gutter)' }}>
          {displayItems.map((item, i) => {
            const card = (
              <div className={`group flex-shrink-0 ${compact ? 'w-[220px] md:w-[260px]' : 'w-[320px] md:w-[380px]'}`}>
                {item.preview && (
                  <SitePreview
                    name={item.preview.name}
                    url={item.preview.url}
                    previewImage={item.preview.previewImage}
                    previewDisabled={item.preview.previewDisabled}
                    className="mb-5 aspect-[8/5] border border-hairline transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
                {!item.preview && item.image !== undefined && (
                  item.image ? (
                    <div
                      className="relative mb-5 overflow-hidden rounded-[14px] border border-hairline"
                      style={{ aspectRatio: '3 / 4' }}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes={compact ? '260px' : '380px'}
                        quality={92}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <PlaceholderFrame aspect="3 / 4" className="mb-5 transition-transform duration-500 group-hover:scale-[1.04]" />
                  )
                )}
                <p className="text-body text-ink">{item.title}</p>
                <p className="mt-1 max-w-[28ch] whitespace-pre-line text-small text-ink-muted">{item.description}</p>
              </div>
            )
            return (
              <div key={`${item.id}-${i}`}>
                {/* SitePreview (when present) already renders its own <a> —
                    nesting a Link around it would put an anchor inside an
                    anchor, which is invalid HTML and breaks hydration. */}
                {item.href && !item.preview ? (
                  <Link href={item.href} aria-label={item.title}>
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
