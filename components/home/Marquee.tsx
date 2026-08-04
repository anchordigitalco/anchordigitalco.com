'use client'
import { PointerEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PlaceholderFrame from '@/components/PlaceholderFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const WHEEL_SENSITIVITY = 1.4

const CARDS = [
  {
    id: 'strategy',
    title: 'Strategy',
    description: 'A real conversation about your goals, audience, and what success looks like.',
    image: '/images/design-card.png',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Direct access to your designer and developer: no account managers, ever.',
    image: '/images/collaboration-card.png',
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Clean, well-structured code with fast load times and pixel-perfect execution.',
    image: '/images/development-card.png',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Full responsive builds, launched in as little as five days, performance-tuned from day one.',
    image: '/images/deployment-card.png',
  },
]

const LOOP_SECONDS = 38

export default function Marquee() {
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

  // Only a genuinely horizontal gesture (trackpad shift+scroll or a
  // two-finger horizontal swipe) browses the cards. Plain vertical
  // wheel/trackpad scroll is left alone so it keeps moving the page, not
  // the marquee — attached as a native, non-passive listener since React's
  // onWheel is passive by default and preventDefault wouldn't take effect.
  // Paired with data-lenis-prevent-horizontal (not the blanket
  // data-lenis-prevent) so Lenis still smooth-scrolls the page normally for
  // vertical input over this element and only steps aside for horizontal.
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

  const displayCards = [...CARDS, ...CARDS]

  return (
    <section
      data-theme="light"
      aria-label="What we do"
      className="bg-ground overflow-hidden"
      style={{ paddingBottom: 'var(--section-y)' }}
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
          {displayCards.map((card, i) => (
            <div key={`${card.id}-${i}`} className="group w-[320px] flex-shrink-0 md:w-[380px]">
              {card.image ? (
                <div className="relative overflow-hidden rounded-[14px] border border-hairline" style={{ aspectRatio: '3 / 4' }}>
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="380px"
                    quality={92}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : (
                <PlaceholderFrame aspect="3 / 4" className="transition-transform duration-500 group-hover:scale-[1.04]" />
              )}
              <p className="mt-5 text-body text-ink">{card.title}</p>
              <p className="mt-1 max-w-[28ch] text-small text-ink-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
