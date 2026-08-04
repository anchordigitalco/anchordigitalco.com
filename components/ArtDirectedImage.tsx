'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Try both ways: an added 1px hairline on the mat's outer edge reads as more
// defined against the warm ground. Off by default — flip to compare.
const SHOW_MAT_HAIRLINE = false

/**
 * Feature-block image panel: a rounded mat border (a deliberate, scoped
 * exception to the site's radius-0 rule, confined to this component) around
 * a fixed-aspect photo that settles in from a slight scale the first time it
 * enters the viewport. Falls back to a flat fill when no `src` is given.
 */
export default function ArtDirectedImage({
  className = '',
  src,
  objectPosition = '50% 50%',
  aspect = '3 / 4',
}: {
  className?: string
  src?: string
  /** Where the crop centers when the source aspect doesn't match the frame. */
  objectPosition?: string
  aspect?: string
}) {
  const reduced = useReducedMotion()
  const { ref, visible } = useInViewOnce<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[20px] border-[8px] border-[#FCFBF9] bg-ground-alt max-[899px]:border-[5px] max-[479px]:border-[4px] ${
        SHOW_MAT_HAIRLINE ? 'ring-1 ring-hairline' : ''
      } ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src && (
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-[12px]"
          initial={reduced ? false : { scale: 1.06 }}
          animate={visible ? { scale: 1 } : undefined}
          transition={{ duration: reduced ? 0.2 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            quality={92}
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      )}
    </div>
  )
}
