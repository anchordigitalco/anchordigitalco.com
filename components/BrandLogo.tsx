import Image from 'next/image'
import logoIcon from '@/public/anchor-icon.png'
import logoFull from '@/public/anchor-logo-full.png'

/**
 * Icon mark, black-on-transparent source art. `invert` flips it to white
 * for placements on dark backgrounds (the CSS filter, not a second asset).
 */
export function Logo({ className = '', invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src={logoIcon}
      alt="Anchor Digital"
      className={`h-8 w-auto ${invert ? 'invert' : ''} ${className}`}
      priority
    />
  )
}

/** Full lockup — mark stacked over the "anchor digital" wordmark. */
export function LogoFull({ className = '', invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src={logoFull}
      alt="Anchor Digital"
      className={`h-16 w-auto ${invert ? 'invert' : ''} ${className}`}
      priority
    />
  )
}
