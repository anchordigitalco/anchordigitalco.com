'use client'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InnovationIcon from '@/components/icons/InnovationIcon'
import DesignIcon from '@/components/icons/DesignIcon'
import GrowthIcon from '@/components/icons/GrowthIcon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import designImage from '@/public/pillar-images/design.png'
import growthImage from '@/public/pillar-images/growth.png'
import innovationImage from '@/public/pillar-images/innovation.png'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

interface Pillar {
  icon: typeof DesignIcon
  title: string
  description: string
  image: StaticImageData | null
  alt: string
}

const PILLARS: Pillar[] = [
  {
    icon: InnovationIcon,
    title: 'Innovation',
    description: 'We use the newest tools and technology out there, not what was standard five years ago.',
    image: innovationImage,
    alt: 'Anchor Digital branding displayed on a wall in a modern office space',
  },
  {
    icon: DesignIcon,
    title: 'Design',
    description: 'Nothing gets built from a template. Every project starts empty and gets designed for the business it belongs to: the way it sounds, who it serves, what it needs someone to actually do.',
    image: designImage,
    alt: 'Custom homepage design concept laid out on paper',
  },
  {
    icon: GrowthIcon,
    title: 'Search',
    description: 'Being findable is half the job. We handle structure, speed, local search, and the technical work that decides whether you show up when someone searches for what you do.',
    image: growthImage,
    alt: 'Analytics dashboard showing site growth metrics',
  },
]

function Panel({ pillar, priority, stacked }: { pillar: Pillar; priority: boolean; stacked: boolean }) {
  const Icon = pillar.icon
  return (
    <div
      // pb-16 reserves real clearance for the dot row below (which sits
      // near the box's own bottom edge via `bottom-10`) — without it, the
      // centered content and the dots were both fighting over the same
      // leftover space and ended up sitting right on top of each other.
      className={stacked ? 'w-full' : 'flex h-full w-screen flex-shrink-0 items-center pb-16'}
      style={stacked ? undefined : { paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
    >
      <div className="mx-auto grid w-full max-w-site grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div
          // Pure aspect-ratio sizing makes this image only as tall as its
          // grid column is wide ÷ 1.79 — on a wide (md:grid-cols-2) pinned
          // layout that's ~450px, far short of the pinned box around it.
          // The md:min-h-[...] override (image + object-cover, cropping
          // instead of stretching) fills that in on desktop. It's gated to
          // md and up on purpose: below md the grid drops to a single
          // column, so this same box is stacked directly above the text
          // instead of beside it — applying the same min-height there
          // pushed the combined image+text stack taller than the pinned
          // box's fixed height, and the text got clipped off by the
          // section's overflow-hidden.
          className={`relative overflow-hidden rounded-[20px] border border-hairline bg-ground-alt${
            !stacked ? ' md:min-h-[min(52svh,480px)]' : ''
          }`}
          style={{ aspectRatio: '1376 / 768' }}
        >
          {pillar.image && (
            <Image
              src={pillar.image}
              alt={pillar.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={92}
              priority={priority}
              className="object-cover"
            />
          )}
        </div>
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink">
            <Icon size={20} />
          </div>
          <h3 className="mt-6 text-display font-normal text-ink">{pillar.title}</h3>
          <p className="mt-4 max-w-[46ch] text-body text-ink-muted">{pillar.description}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Pinned horizontal track: GSAP ScrollTrigger locks the inner `pinRef` div
 * in place and pans the 3 pillar panels sideways as the user keeps
 * scrolling down, rather than cross-fading in place on a timer. Scroll
 * position now directly IS the position in the carousel, so there's no
 * separate auto-advance/dwell timer or swipe handler to keep in sync with
 * it — `scrub` ties the horizontal transform straight to scroll progress.
 * The vertical distance this consumes is deliberately sized to the actual
 * horizontal distance being panned (track width minus one viewport), not
 * an arbitrary multiplier, so scrolling through it always reads as "the
 * page is panning sideways" rather than "the page got stuck."
 *
 * Reduced motion renders a completely different (unmounted, not just
 * re-styled) inner subtree with no pin at all. That matters because
 * ScrollTrigger's `pin: true` inserts a spacer wrapper around whatever it
 * pins and, on cleanup, restores that element's original inline styles —
 * if the *same* DOM node also carried React-managed conditional styles
 * (tried first, in `pinRef`'s ancestor), the two fought: GSAP's revert ran
 * after React's own re-render and clobbered the fresh reduced-motion style
 * back to the pinned version's. Keeping the pin target inside a branch
 * that fully unmounts when `reduced` flips true sidesteps that entirely —
 * GSAP's revert then runs against a node React has already discarded,
 * never touching whatever is currently on screen.
 */
export default function PillarCycle() {
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (reduced) return
    const pinTarget = pinRef.current
    const track = trackRef.current
    if (!pinTarget || !track) return

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setCurrent(Math.round(self.progress * (PILLARS.length - 1)))
          },
        },
      })
      scrollTriggerRef.current = tween.scrollTrigger ?? null
    }, pinRef)

    return () => ctx.revert()
  }, [reduced])

  const goTo = (i: number) => {
    const st = scrollTriggerRef.current
    if (!st) return
    const progress = i / (PILLARS.length - 1)
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'smooth' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') goTo(Math.min(current + 1, PILLARS.length - 1))
    if (e.key === 'ArrowLeft') goTo(Math.max(current - 1, 0))
  }

  return (
    <section
      data-theme="light"
      aria-label="Our approach"
      className="relative overflow-hidden border-t border-hairline bg-ground"
    >
      {reduced ? (
        <div
          className="mx-auto flex max-w-site flex-col gap-16"
          style={{
            paddingTop: 'var(--section-y)',
            paddingBottom: 'var(--section-y)',
            paddingLeft: 'var(--gutter)',
            paddingRight: 'var(--gutter)',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <Panel key={pillar.title} pillar={pillar} priority={i === 0} stacked />
          ))}
        </div>
      ) : (
        <div
          ref={pinRef}
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="focus:outline-none"
          // Was a flat 100svh — on a wide screen the two-column panel's
          // image is height-constrained by its own aspect ratio (which
          // shrinks fast as the grid column gets wider), so the actual
          // content block ends up far shorter than a full viewport while
          // still being vertically centered inside one, leaving large
          // empty margins above and below. A first pass at clamp(600px,
          // 80svh, 820px) was still way oversized — content tops out
          // around 450-490px (the longest pillar description is 3 lines)
          // plus the dot row, so the box only needs to be ~560-640px, not
          // 700+. What made the remaining gap read as worse than it
          // measured: this section's own bottom margin sits directly
          // against the next section's own top padding with no visual
          // break between them, so the two stack into one long blank
          // stretch. The pin's scroll-hold duration is driven by
          // horizontal pan distance (track width vs. viewport width), not
          // this height, so tightening it doesn't affect the pin/pan
          // timing at all — just how much empty vertical canvas surrounds
          // the content while it's pinned.
          style={{ height: 'clamp(560px, 62svh, 640px)' }}
        >
          <div ref={trackRef} className="flex h-full" style={{ width: `${PILLARS.length * 100}vw` }}>
            {PILLARS.map((pillar, i) => (
              <Panel key={pillar.title} pillar={pillar} priority={i === 0} stacked={false} />
            ))}
          </div>

          <div
            className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-3"
            style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
          >
            {PILLARS.map((pillar, i) => (
              <button
                key={pillar.title}
                onClick={() => goTo(i)}
                aria-label={`Go to ${pillar.title}`}
                aria-current={i === current}
                className="relative h-px w-10 overflow-hidden bg-hairline"
              >
                {i === current && <div className="absolute inset-0 bg-ink" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
