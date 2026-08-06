'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

interface SitePreviewProps {
  name: string
  url: string
  previewImage?: string
  previewDisabled?: boolean
  className?: string
}

const FRAME_WIDTH = 1440
const FRAME_HEIGHT = 900

/** Rounded corners are a deliberate, scoped exception for real site previews
 * — everywhere else on the site uses radius:0. */
const ROUNDING = 'rounded-[14px]'

/** Plain content-shaped placeholder, shown until the real screenshot/iframe
 * actually paints — a live-embedded client site (no static screenshot on
 * file) can take a real, visible moment to load, and an empty tile with no
 * feedback reads as broken rather than "still loading." */
function PreviewSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-3 bg-ground-alt p-6">
      <div className="h-3 w-1/4 animate-pulse bg-ink/10" />
      <div className="mt-2 h-1/2 w-full animate-pulse bg-ink/10" />
      <div className="h-2 w-2/3 animate-pulse bg-ink/10" />
      <div className="h-2 w-1/2 animate-pulse bg-ink/10" />
    </div>
  )
}

function CursorLabel({ pos }: { pos: { x: number; y: number } | null }) {
  return (
    <AnimatePresence>
      {pos && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.05, x: pos.x + 18, y: pos.y + 18 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.4 }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden items-center gap-1.5 whitespace-nowrap bg-ink px-3 py-1.5 text-small text-ground shadow-2xl lg:flex"
        >
          View live <ArrowUpRight size={11} />
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/**
 * Renders a real preview of a live client site — a static screenshot when one
 * exists, a scaled-down live iframe embed otherwise, or a plain "view live"
 * fallback when the target blocks framing. The iframe is rendered at a fixed
 * desktop size (1440x900, an actual browser proportion) and scaled to fit
 * whatever container it's placed in via ResizeObserver, so the whole page
 * width is visible rather than cropped — callers should size the container
 * to the same 1440:900 (8:5) aspect ratio so the scaled frame fills it
 * exactly with no letterboxing.
 */
export default function SitePreview({ name, url, previewImage, previewDisabled, className = '' }: SitePreviewProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLAnchorElement>(null)
  const [scale, setScale] = useState(0.3)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.getBoundingClientRect().width / FRAME_WIDTH)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const track = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  const untrack = () => setPos(null)

  if (previewImage) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={track}
        onMouseLeave={untrack}
        className={`group/preview relative block overflow-hidden bg-ground-alt ${ROUNDING} ${className}`}
      >
        {!loaded && <PreviewSkeleton />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewImage}
          alt={`${name} website homepage designed and built by Anchor Digital`}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover/preview:bg-ink/5" />
        <CursorLabel pos={pos} />
      </a>
    )
  }

  if (previewDisabled) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/preview flex flex-col items-center justify-center gap-3 border border-hairline bg-ground-alt ${ROUNDING} ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center border border-hairline bg-ground">
          <ExternalLink size={18} className="text-ink-faint" />
        </div>
        <span className="text-small text-ink-muted transition-colors duration-300 group-hover/preview:text-ink">
          View live page
        </span>
      </a>
    )
  }

  return (
    <a
      ref={containerRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={track}
      onMouseLeave={untrack}
      className={`group/preview relative block overflow-hidden bg-ground-alt ${ROUNDING} ${className}`}
    >
      {!loaded && <PreviewSkeleton />}
      <iframe
        src={url}
        title={`${name} preview`}
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className="absolute left-0 top-0 border-0"
        style={{
          width: `${FRAME_WIDTH}px`,
          height: `${FRAME_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover/preview:bg-ink/5" />
      <CursorLabel pos={pos} />
    </a>
  )
}
