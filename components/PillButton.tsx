import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface SharedProps {
  children: ReactNode
  className?: string
  /** Light text on a dark fill — for buttons sitting on dark-theme sections. */
  dark?: boolean
}

interface PillLinkProps extends SharedProps {
  href: string
}

interface PillButtonElProps extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: undefined
}

/**
 * The one button-style CTA on the site — hairline pill, fills solid on
 * hover. Matches the Hero's "Our work" button exactly, so every primary
 * action (pricing plans, form navigation) reads as the same control.
 * Anything lighter-weight than this should be a TextLink, not a variant
 * of this component.
 */
export default function PillButton(props: PillLinkProps | PillButtonElProps) {
  const { children, className = '', dark = false, ...rest } = props
  const colors = dark
    ? 'border-dark-ink text-dark-ink hover:bg-dark-ink hover:text-dark'
    : 'border-ink text-ink hover:bg-ink hover:text-ground'
  const base = `inline-flex items-center justify-center gap-2 border font-rounded text-small px-7 py-3.5 transition-colors duration-[400ms] ${colors} ${className}`

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={base} style={{ borderRadius: '9999px' }}>
        {children}
      </Link>
    )
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={base} style={{ borderRadius: '9999px' }}>
      {children}
    </button>
  )
}
