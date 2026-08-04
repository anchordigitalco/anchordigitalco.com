import Image from 'next/image'
import Link from 'next/link'

const LOGOS = [
  { name: 'FairTest', src: '/logos/fairtest.jpg', href: '/work#fairtest' },
  { name: 'Akil Bello', src: '/logos/akil-bello.png', href: '/work#akil-bello' },
  { name: 'Score Signal', src: '/logos/score-signal.png', href: '/work#score-signal' },
  // Dark, edge-to-edge mark with no built-in margin of its own — matted
  // with a white inset border so it doesn't bleed into the tiles next to
  // it the way a plain object-cover fill would.
  { name: 'Bell Curves', src: '/logos/bell-curves.jpg', href: '/work', padded: true, bg: 'bg-white' },
  { name: 'Ray Cuevo Training', src: '/logos/ray-cuevo.png', href: '/work#ray-cuevo' },
  // The source file has a lot of empty white space above the mark and the
  // mark itself nearly fills the frame edge-to-edge — object-cover alone
  // crops in tight and off-center, so this one gets scaled down (to show
  // more breathing room around the mark) in addition to being centered.
  // Scaled down (see above), which exposes the tile's own background in
  // the margin around the mark — white so it blends into the source
  // image's white background instead of showing the sheet's off-white.
  { name: 'A Better Chance', src: '/logos/a-better-chance.jpg', href: '/work', objectPosition: 'center', scale: 0.8, bg: 'bg-white' },
]

/**
 * One shared rectangle, not a grid of individual boxes — logos sit flush
 * against each other with no dividers. Hover is a deliberate, scoped
 * exception to the site's no-shadow rule: the hovered tile lifts and casts
 * a real shadow while the rest of the sheet stays flat.
 *
 * Fixed to the same 4:3 aspect ratio as the plain placeholder rectangles
 * it sits alongside in the feature-block media slot — 3 columns x 2 rows
 * of the 6 logos fills that shape edge to edge instead of the grid
 * dictating its own (taller, 2-column) height.
 *
 * The mat-panel border (feature-block exception to the site's radius-0
 * rule) sits on this same outer div rather than a wrapping element, so the
 * grid/hover behavior above is untouched by the framing.
 */
export default function ClientLogos({ className = '' }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-3 overflow-hidden rounded-[20px] border-[8px] border-[#FCFBF9] bg-ground-alt max-[899px]:border-[5px] max-[479px]:border-[4px] ${className}`}
      style={{ aspectRatio: '4 / 3' }}
    >
      {LOGOS.map((logo) => (
        <Link
          key={logo.name}
          href={logo.href}
          aria-label={`View the ${logo.name} project`}
          className={`group relative transition-transform duration-300 ease-reveal hover:z-10 hover:scale-110 hover:shadow-2xl ${logo.bg ?? 'bg-ground'}`}
        >
          {logo.padded ? (
            <div className="absolute inset-3 max-[479px]:inset-2">
              <Image
                src={logo.src}
                alt={`${logo.name} website homepage designed and built by Anchor Digital`}
                fill
                sizes="(min-width: 768px) 180px, 30vw"
                quality={92}
                className="object-contain"
              />
            </div>
          ) : (
            <Image
              src={logo.src}
              alt={`${logo.name} website homepage designed and built by Anchor Digital`}
              fill
              sizes="(min-width: 768px) 180px, 30vw"
              quality={92}
              className="object-cover"
              style={{
                ...(logo.objectPosition ? { objectPosition: logo.objectPosition } : undefined),
                ...(logo.scale ? { transform: `scale(${logo.scale})` } : undefined),
              }}
            />
          )}
        </Link>
      ))}
    </div>
  )
}
