'use client'

const B_OUTER = 'M2,0 L12,0 C24,0 28,5 28,11 C28,17 23,20 12,20 C25,20 30,25 30,32 C30,39 24,42 12,42 L2,42 Z'
const B_INNER_TOP = 'M12,5 C20,5 24,7 24,11 C24,15 20,16 12,16 Z'
const B_INNER_BOTTOM = 'M12,25 C22,25 26,27 26,32 C26,37 22,38 12,38 Z'

interface LogoMarkProps {
  width?: number
  className?: string
}

export function LogoMark({ width = 52, className = '' }: LogoMarkProps) {
  const h = Math.round(width * 0.81)
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 50 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bb-silver" x1="0" y1="0" x2="28" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#DDE3F0" />
          <stop offset="45%"  stopColor="#8895AE" />
          <stop offset="100%" stopColor="#B0BACE" />
        </linearGradient>
        <linearGradient id="bb-blue" x1="20" y1="0" x2="50" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#5BAAFF" />
          <stop offset="100%" stopColor="#0D45CC" />
        </linearGradient>
      </defs>
      <g>
        <path d={B_OUTER} fill="url(#bb-silver)" />
        <path d={B_INNER_TOP} fill="white" />
        <path d={B_INNER_BOTTOM} fill="white" />
      </g>
      <g transform="translate(18, 0)">
        <path d={B_OUTER} fill="url(#bb-blue)" />
        <path d={B_INNER_TOP} fill="white" />
        <path d={B_INNER_BOTTOM} fill="white" />
      </g>
    </svg>
  )
}

/**
 * Full logo with wordmark. Used in the main nav.
 * → Replace with your file: public/logo-full.png
 */
export function LogoFull({
  imageSrc = '/logo-full.png',
  imageAlt = 'Bello Bleecker Digital Consulting',
  imageHeight = 40,
  className = '',
}: {
  imageSrc?: string
  imageAlt?: string
  imageHeight?: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={imageAlt}
      style={{ height: imageHeight, width: 'auto', objectFit: 'contain' }}
      className={className}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}

/**
 * Mark only — no wordmark text. Used in the mobile nav or anywhere tight.
 * → Replace with your file: public/logo-mark.png
 */
export function LogoMarkImage({
  imageSrc = '/logo-mark.png',
  imageAlt = 'Bello Bleecker',
  size = 36,
  className = '',
}: {
  imageSrc?: string
  imageAlt?: string
  size?: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={imageAlt}
      style={{ height: size, width: size, objectFit: 'contain' }}
      className={className}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}

/**
 * Small footer version — subtle, low-contrast. Used at the bottom of the site.
 * → Replace with your file: public/logo-sm.png
 */
export function LogoSmall({
  imageSrc = '/logo-sm.png',
  imageAlt = 'Bello Bleecker',
  height = 28,
  className = '',
}: {
  imageSrc?: string
  imageAlt?: string
  height?: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={imageAlt}
      style={{ height, width: 'auto', objectFit: 'contain', opacity: 0.6 }}
      className={className}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}
