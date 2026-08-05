import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Statement from '@/components/home/Statement'
import UpdatesCarousel from '@/components/home/UpdatesCarousel'
import PillarCycle from '@/components/sections/PillarCycle'
import FeatureBlocks from '@/components/home/FeatureBlocks'
import Closer from '@/components/home/Closer'

export const metadata: Metadata = {
  title: { absolute: 'Anchor Digital: Web Design & SEO for Small Businesses | Maine & New York' },
  description: 'We design, build, and maintain websites for trades, local businesses, and independent brands across Maine and New York. Free 15-minute consultation. Launched in 7–14 days.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <UpdatesCarousel />
      <PillarCycle />
      <FeatureBlocks />
      <Closer />
    </>
  )
}
