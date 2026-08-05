'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

/**
 * Adapted from the standard shadcn "display-cards" community component.
 * Two changes from the source verbatim version, both required for it to
 * actually render correctly in this project rather than being cosmetic
 * preference:
 *   1. This project doesn't run shadcn's CSS-variable token layer (no
 *      --background/--muted/--border), so classes like bg-muted,
 *      text-muted-foreground, and outline-border would resolve to nothing.
 *      Swapped for this project's real tokens (ground/ground-alt/ink/
 *      hairline) so the card is actually visible.
 *   2. The site's design system is deliberately zero-accent-color (see
 *      PillarCycle, ClientLogos, etc.) — the source component's hardcoded
 *      blue-500/blue-800/blue-300 classes were swapped for the site's
 *      neutral ink/dark tokens to match.
 * The stacking/skew/hover-grayscale effect itself — the actual thing this
 * component is for — is untouched.
 */
interface DisplayCardProps {
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-dark-ink" />,
  title = 'Featured',
  description = 'Discover amazing content',
  date = 'Just now',
  iconClassName = 'text-ink',
  titleClassName = 'text-ink',
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-hairline bg-ground-alt/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-ground after:to-transparent after:content-[''] hover:border-ink/30 hover:bg-ground-alt [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className={cn('relative inline-block rounded-full bg-dark p-1', iconClassName)}>
          {icon}
        </span>
        <p className={cn('text-lg font-medium', titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-ink">{description}</p>
      {date && <p className="text-ink-muted">{date}</p>}
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-hairline before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-ground/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-hairline before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-ground/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
