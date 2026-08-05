import Image from 'next/image'
import { Component as MorphingCardStack, type CardData } from '@/components/ui/morphing-card-stack'

const LOGOS: { id: string; name: string; src: string; fit: 'cover' | 'contain' }[] = [
  { id: 'fairtest', name: 'FairTest', src: '/logos/fairtest.jpg', fit: 'cover' },
  { id: 'score-signal', name: 'Score Signal', src: '/logos/score-signal-logo-icon.png', fit: 'contain' },
  { id: 'bell-curves', name: 'Bell Curves', src: '/logos/bell-curves.jpg', fit: 'contain' },
  { id: 'a-better-chance', name: 'A Better Chance', src: '/logos/a-better-chance.jpg', fit: 'contain' },
]

const cards: CardData[] = LOGOS.map((logo) => ({
  id: logo.id,
  title: logo.name,
  icon: (
    <div className="relative h-full w-full">
      <Image
        src={logo.src}
        alt={`${logo.name} logo`}
        fill
        sizes="300px"
        quality={92}
        // Just a handful of small thumbnails, and every one of them IS the visible
        // content of its card (stack/grid) — skipping next/image's default
        // lazy-load avoids a blank tile flashing while a card that's
        // already on-screen waits for its logo to load in.
        priority
        className={logo.fit === 'cover' ? 'object-cover' : 'object-contain'}
      />
    </div>
  ),
}))

/** Replaces the old flat ClientLogos grid — same clients, shown as an
 * interactive stack that can morph into a grid or list. */
export default function ClientLogoStack({ className = '' }: { className?: string }) {
  return <MorphingCardStack cards={cards} className={className} />
}
