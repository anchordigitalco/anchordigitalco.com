'use client'
import { useId } from 'react'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LiquidButton, LiquidGlassOverlay, liquidbuttonVariants } from '@/components/ui/liquid-glass-button'
import { cn } from '@/lib/utils'

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
 * The one button-style CTA on the site — now the liquid-glass pill
 * (`components/ui/liquid-glass-button`) rather than a flat hairline
 * outline. Every call site (14+ across the app) keeps using this same
 * href-or-button component unchanged; only what it renders inside changed.
 */
export default function PillButton(props: PillLinkProps | PillButtonElProps) {
  const { children, className = '', dark = false, ...rest } = props
  const filterId = useId()
  // `dark` flips the pill for dark-theme sections — same idea as before,
  // just as a text-color override on top of the liquid-glass surface
  // rather than a full color-scheme swap.
  const textColor = dark ? 'text-dark-ink' : 'text-ink'

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        className={cn('relative', liquidbuttonVariants({ size: 'lg' }), textColor, className)}
      >
        <LiquidGlassOverlay filterId={filterId} />
        <span className="pointer-events-none relative z-10">{children}</span>
      </Link>
    )
  }

  return (
    <LiquidButton
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      size="lg"
      className={cn(textColor, className)}
    >
      {children}
    </LiquidButton>
  )
}
