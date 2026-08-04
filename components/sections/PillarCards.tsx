import Image, { StaticImageData } from 'next/image'
import FadeUp from '@/components/FadeUp'
import designImage from '@/public/pillar-images/design.png'
import innovationImage from '@/public/pillar-images/innovation.png'
import growthImage from '@/public/pillar-images/growth.png'

interface Card {
  title: string
  description: string
  image: StaticImageData | null
  alt: string
}

const CARDS: Card[] = [
  {
    title: 'Design',
    description: 'A custom homepage concept built around your brand, before a single line of code is written.',
    image: designImage,
    alt: 'Custom homepage design concept laid out on paper',
  },
  {
    title: 'Innovation',
    description: 'Modern features and creative problem-solving that make your site feel current, not off-the-shelf.',
    image: innovationImage,
    alt: 'Anchor Digital branding displayed on a wall in a modern office space',
  },
  {
    title: 'Growth',
    description: 'Monthly updates, SEO monitoring, and consulting that keeps your site evolving with your business.',
    image: growthImage,
    alt: 'Analytics dashboard showing site growth metrics',
  },
]

/**
 * Design/Innovation/Growth as photo cards — the same three source images as
 * the landing page's pillar cycle, laid out statically rather than cycling.
 */
export default function PillarCards() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {CARDS.map((card, i) => (
        <FadeUp key={card.title} delay={i * 0.08}>
          <div
            className="relative overflow-hidden border border-hairline bg-ground-alt"
            style={{ aspectRatio: '1376 / 768' }}
          >
            {card.image && (
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                quality={92}
                placeholder="blur"
                className="object-cover"
              />
            )}
          </div>
          <h3 className="mt-6 text-body text-ink">{card.title}</h3>
          <p className="mt-2 max-w-[32ch] text-small text-ink-muted">{card.description}</p>
        </FadeUp>
      ))}
    </div>
  )
}
