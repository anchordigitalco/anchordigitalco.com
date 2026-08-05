'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Grid3X3, Layers, LayoutList } from 'lucide-react'

/**
 * Adapted from the standard shadcn community "morphing-card-stack"
 * component. As with display-cards.tsx, the shadcn CSS-variable tokens
 * this ships with by default (bg-card, bg-secondary, bg-primary,
 * text-muted-foreground, border-border, ring-primary, and the rounded-lg/
 * rounded-xl/rounded-md scale) don't exist in this project — it runs its
 * own token set (ground/ground-alt/ink/hairline/dark) with radius kept to
 * either 0, full, or an explicit pixel value everywhere else, no named
 * scale. Swapped to match so it actually renders instead of silently
 * dropping every one of those classes. The interaction/animation logic
 * (drag-to-swipe, stack/grid/list morph, spring transitions) is untouched.
 *
 * Content model: this project's only use of it (ClientLogoStack) wants the
 * whole card to BE the client's logo — stack and grid render the full
 * `icon` as a padded, edge-to-edge tile, no name visible. List is the one
 * exception: its cards are full-width, short "skinny" rows, so a bare logo
 * tile would look lost — that's the one layout that shows a small logo
 * swatch plus the company name.
 */
export type LayoutMode = 'stack' | 'grid' | 'list'

export interface CardData {
  id: string
  title: string
  /** Unused by the current (logo-tile) rendering, kept for API flexibility. */
  description?: string
  icon?: ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

// Stack and grid cards are the same fixed square — switching between those
// two views repositions cards, it never resizes them. List rows are a
// distinct short, full-width shape (hence showing the company name there).
// Stack is the first, featured view — its tile runs a fair bit larger than
// grid/list, to fill the space rather than leaving it mostly blank.
const STACK_CARD_SIZE = 300
const GRID_CARD_SIZE = 160
// Extra room around the stack's tile so the fanned-out cards behind it
// (offset/rotated per position) aren't clipped by the container.
const STACK_FAN_PAD = 80
const GRID_COLUMNS = 2
const GRID_GAP = 12
const GRID_WIDTH = GRID_COLUMNS * GRID_CARD_SIZE + (GRID_COLUMNS - 1) * GRID_GAP
const LIST_ROW_HEIGHT = 64
const LIST_LOGO_SIZE = 40

function getContainerStyle(layout: LayoutMode): CSSProperties {
  switch (layout) {
    case 'stack':
      return { position: 'relative', width: STACK_CARD_SIZE + STACK_FAN_PAD, height: STACK_CARD_SIZE + STACK_FAN_PAD }
    case 'grid':
      // An explicit width (matching the tracks exactly, not just their
      // sizes) is what gives `mx-auto` actual slack to center within —
      // otherwise the grid container itself defaults to 100% of its
      // parent, and 2 fixed-width tracks just leave the surplus as blank
      // space on the right instead of splitting it evenly on both sides.
      return { display: 'grid', gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${GRID_CARD_SIZE}px)`, gap: GRID_GAP, width: GRID_WIDTH }
    case 'list':
      return { display: 'flex', flexDirection: 'column', gap: GRID_GAP, width: '100%' }
  }
}

function getCardSizeStyle(layout: LayoutMode): CSSProperties {
  switch (layout) {
    case 'list':
      return { width: '100%', height: LIST_ROW_HEIGHT }
    case 'stack':
      return { width: STACK_CARD_SIZE, height: STACK_CARD_SIZE }
    case 'grid':
      return { width: GRID_CARD_SIZE, height: GRID_CARD_SIZE }
  }
}

export function Component({ cards = [], className, defaultLayout = 'stack', onCardClick }: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case 'stack':
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case 'grid':
        return { top: 0, left: 0, zIndex: 1, rotate: 0 }
      case 'list':
        return { top: 0, left: 0, zIndex: 1, rotate: 0 }
    }
  }

  const displayCards = layout === 'stack' ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn('space-y-4', className)}>
      {/* Layout toggle */}
      <div className="mx-auto flex w-fit items-center justify-center gap-1 rounded-[10px] bg-ground-alt/70 p-1">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                'rounded-[8px] p-2 transition-all',
                layout === mode ? 'bg-ink text-ground' : 'text-ink-muted hover:bg-ground-alt hover:text-ink'
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards container */}
      <LayoutGroup>
        <motion.div layout className="mx-auto" style={getContainerStyle(layout)}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === 'stack' && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  drag={isTopCard ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    'cursor-pointer overflow-hidden rounded-[14px] border border-hairline bg-ground',
                    'transition-colors hover:border-ink/40',
                    layout === 'stack' && 'absolute',
                    layout === 'list' && 'p-4',
                    isExpanded && 'ring-2 ring-ink'
                  )}
                  style={{ ...getCardSizeStyle(layout), backgroundColor: card.color || undefined }}
                >
                  {layout === 'list' ? (
                    <div className="flex h-full items-center gap-4">
                      {card.icon && (
                        <div
                          className="relative shrink-0 overflow-hidden rounded-[8px] bg-ground-alt"
                          style={{ width: LIST_LOGO_SIZE, height: LIST_LOGO_SIZE }}
                        >
                          {card.icon}
                        </div>
                      )}
                      <span className="truncate font-semibold text-ink">{card.title}</span>
                    </div>
                  ) : (
                    // Stack and grid: the logo fills the entire tile, edge to
                    // edge — no padding, and `object-cover` forced regardless
                    // of the per-logo `fit` choice ClientLogoStack made for
                    // list's small swatch, so nothing letterboxes.
                    card.icon && (
                      <div className="relative h-full w-full [&_img]:!object-cover">{card.icon}</div>
                    )
                  )}

                  {isTopCard && (
                    <div className="absolute inset-x-0 bottom-2 flex justify-center">
                      <span className="rounded-full bg-ground/80 px-2 py-0.5 text-xs text-ink-faint backdrop-blur-sm">
                        Swipe to navigate
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === 'stack' && cards.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                index === activeIndex ? 'w-4 bg-ink' : 'w-1.5 bg-ink-faint hover:bg-ink-muted'
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
