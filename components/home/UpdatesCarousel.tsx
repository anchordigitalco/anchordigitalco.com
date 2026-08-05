'use client'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { UPDATES } from '@/lib/updates'

const AUTOPLAY_MS = 5000
const COUNT = UPDATES.length
const CARD_WIDTH_FRACTION = 0.66
const CARD_WIDTH_MAX = 700
const CARD_HEIGHT = 360
const CARD_PADDING = 16
const IMAGE_COLUMN_FRACTION = 0.42

/** Wraps i-index to a stable {-1, 0, 1} slot around the active card, so with
 * exactly 3 updates every position always has one neighbor on each side —
 * including the very first view, no scrolling/clicking required first. */
function relativeSlot(i: number, index: number) {
  return ((i - index + 1 + COUNT) % COUNT) - 1
}

/**
 * Coverflow-style carousel: the active slide sits centered, full size and
 * color, in a vertical card (full-bleed portrait photo on top, title/excerpt
 * below). Neighbors sit off to each side in grayscale, scaled down, about a
 * third of each showing. Loops in both directions and auto-advances every
 * 5s, shown by the active dot filling up like a timer — stopping only when
 * someone actually clicks an arrow, a dot, or a card.
 */
export default function UpdatesCarousel() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevIndexRef = useRef(index)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setContainerWidth(el.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Track the previous index a render behind, so a wraparound jump (e.g.
  // last card back to first) can be detected and skip its transition —
  // see the isWrapJump check below.
  useEffect(() => {
    prevIndexRef.current = index
  }, [index])

  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % COUNT), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [reduced, paused])

  const goTo = (i: number) => {
    setPaused(true)
    setIndex(((i % COUNT) + COUNT) % COUNT)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') goTo(index + 1)
    if (e.key === 'ArrowLeft') goTo(index - 1)
  }

  const cardWidth = Math.min(containerWidth * CARD_WIDTH_FRACTION, CARD_WIDTH_MAX)
  // Derived so exactly 1/3 of a neighbor's width peeks past the container
  // edge, regardless of what fraction of the container the card itself
  // occupies (see the worked math in the project notes for this component).
  const step = containerWidth * 0.5 + cardWidth / 6
  const prevIndex = prevIndexRef.current

  return (
    <section id="updates" data-theme="light" aria-label="Recent updates" className="overflow-hidden border-t border-hairline bg-ground" style={{ paddingTop: 'clamp(1.25rem, 3vh, 2rem)', paddingBottom: 'clamp(1.25rem, 3vh, 2rem)', scrollMarginTop: 'var(--nav-height)' }}>
      <div className="mx-auto max-w-site" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <h2>
          <Reveal as="span" split="lines" className="block text-display font-normal text-ink">
            {["What's new at Anchor?"]}
          </Reveal>
        </h2>
        <p className="mt-3 max-w-[46ch] text-body text-ink-muted">
          A look at bigger projects we&apos;ve been working on at Anchor Digital.
        </p>
      </div>

      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-8 focus:outline-none"
        style={{ height: CARD_HEIGHT }}
      >
        {UPDATES.map((update, i) => {
          const rel = relativeSlot(i, index)
          const prevRel = relativeSlot(i, prevIndex)
          // A normal step only ever moves a card by 1 slot. Anything bigger
          // means it wrapped from one edge to the other — skip the
          // transition so it appears on the new side instead of visibly
          // sliding all the way across behind the active card.
          const isWrapJump = Math.abs(rel - prevRel) > 1
          const active = rel === 0
          return (
            <div
              key={update.slug}
              className="absolute left-1/2 top-0"
              style={{
                width: containerWidth > 0 ? cardWidth : `${CARD_WIDTH_FRACTION * 100}%`,
                height: CARD_HEIGHT,
                marginLeft: containerWidth > 0 ? -cardWidth / 2 : 0,
                transform: `translateX(${rel * step}px)`,
                transition: reduced || isWrapJump ? 'none' : 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: active ? 10 : 1,
              }}
            >
              <UpdateCard update={update} active={active} onSelect={() => goTo(i)} />
            </div>
          )
        })}

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous update"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-ground text-ink transition-colors duration-300 hover:bg-ground-alt sm:flex"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next update"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-ground text-ink transition-colors duration-300 hover:bg-ground-alt sm:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        {UPDATES.map((update, i) => (
          <button
            key={update.slug}
            onClick={() => goTo(i)}
            aria-label={`Go to ${update.title}`}
            aria-current={i === index}
            className="relative h-px w-10 overflow-hidden bg-hairline"
          >
            {i === index && <TimerFill key={index} duration={AUTOPLAY_MS} running={!paused && !reduced} />}
          </button>
        ))}
      </div>
    </section>
  )
}

/** The active dot's fill — plain solid once autoplay has stopped, or an
 * animated left-to-right fill timing out the current auto-advance while
 * it's still running. Remounted (via the `key={index}` where it's used)
 * every time the active card changes, so the countdown always restarts
 * from empty. */
function TimerFill({ duration, running }: { duration: number; running: boolean }) {
  const [filled, setFilled] = useState(!running)

  useEffect(() => {
    if (!running) {
      setFilled(true)
      return
    }
    setFilled(false)
    const raf = requestAnimationFrame(() => setFilled(true))
    return () => cancelAnimationFrame(raf)
  }, [running])

  return (
    <div
      className="absolute inset-0 origin-left bg-ink"
      style={{
        transform: filled ? 'scaleX(1)' : 'scaleX(0)',
        transition: running ? `transform ${duration}ms linear` : 'none',
      }}
    />
  )
}

function UpdateCard({
  update,
  active,
  onSelect,
}: {
  update: (typeof UPDATES)[number]
  active: boolean
  onSelect: () => void
}) {
  const inner = (
    <div
      className={`flex h-full overflow-hidden rounded-[20px] border border-hairline bg-ground p-4 transition-all duration-500 ease-reveal ${
        active ? 'grayscale-0 opacity-100' : 'scale-[0.92] grayscale opacity-60'
      }`}
    >
      <div
        className={`relative h-full flex-shrink-0 overflow-hidden rounded-[12px] ${update.fit === 'cover' ? 'bg-ground-alt' : 'bg-white'}`}
        style={{ width: `${IMAGE_COLUMN_FRACTION * 100}%` }}
      >
        <Image
          src={update.logo}
          alt={update.logoAlt}
          fill
          sizes="(min-width: 768px) 300px, 28vw"
          quality={92}
          className={update.fit === 'cover' ? 'object-cover' : 'object-contain p-6'}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 pl-5">
        <div className="flex flex-col gap-2">
          <p className="text-label text-ink-muted">
            {update.category} &middot; {update.date}
          </p>
          <p className="line-clamp-3 text-lead font-bold text-ink">{update.title}</p>
          <p className="line-clamp-2 text-body text-ink-muted">{update.excerpt}</p>
        </div>
        <div className="mt-1">
          <span className="text-label text-ink-muted">Read More</span>
        </div>
      </div>
    </div>
  )

  if (active) {
    return (
      <Link href={`/updates/${update.slug}`} className="block h-full" aria-label={`Read: ${update.title}`}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onSelect} className="block h-full w-full text-left" aria-label={`View ${update.title}`}>
      {inner}
    </button>
  )
}
