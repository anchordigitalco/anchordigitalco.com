'use client'
import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface GalleryImage {
  src: string
  alt?: string
}

const TILE_POSITION_CLASSES = [
  '',
  '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
  '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
  '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
  '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
]

/**
 * Sticky, scroll-scrubbed collage: each tile scales up at its own rate as
 * the 300vh track scrolls past, so the center image reads as "zooming
 * into" the page. Tracks `scrollYProgress` against its own container via
 * framer-motion's `useScroll`, which reads real scroll position — it
 * doesn't need its own Lenis instance or any wiring into the site's
 * existing one, so it's safe to drop in without touching shared scroll
 * infrastructure. Reduced motion swaps this for a plain static grid.
 */
export function ZoomParallax({ images }: { images: GalleryImage[] }) {
  const reduced = useReducedMotion()
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  if (reduced) {
    return (
      <div className="bg-dark" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="mx-auto grid max-w-site grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img.src} alt={img.alt ?? ''} className="aspect-square w-full object-cover" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={container} className="relative h-[300vh] bg-dark">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            style={{ scale: scales[index % scales.length] }}
            className={`absolute top-0 flex h-full w-full items-center justify-center ${TILE_POSITION_CLASSES[index % TILE_POSITION_CLASSES.length]}`}
          >
            <div className="relative h-[25vh] w-[25vw] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt ?? ''} className="h-full w-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
