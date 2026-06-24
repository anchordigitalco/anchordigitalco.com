'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
import clsx from 'clsx'

interface PricingCardProps {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
  index?: number
}

export default function PricingCard({
  name, price, period, tagline, features, cta, highlighted = false, badge, index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'relative flex flex-col rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-200',
        highlighted
          ? 'bg-charcoal-800 border-2 border-gold shadow-gold-lg scale-[1.02] lg:scale-[1.04]'
          : 'bg-charcoal-800 border border-charcoal-600 hover:border-charcoal-500 shadow-surface'
      )}
    >
      {/* Accent top stripe for highlighted */}
      {highlighted && (
        <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold" />
      )}

      {badge && (
        <div className="absolute top-5 right-5">
          <span className="font-sans text-[10px] font-700 tracking-[0.15em] uppercase bg-gold text-white px-2.5 py-1 rounded-md">
            {badge}
          </span>
        </div>
      )}

      <div className="p-7 lg:p-8 flex flex-col flex-1">
        <div className="mb-6">
          <span className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-400 mb-2 block">Plan</span>
          <h3 className={clsx(
            'font-cormorant text-3xl font-700 mb-1 tracking-tight',
            highlighted ? 'text-gold' : 'text-charcoal-100'
          )}>
            {name}
          </h3>
          <p className="font-sans text-sm text-charcoal-200 font-400">{tagline}</p>
        </div>

        <div className="flex items-baseline gap-1 mb-7 pb-7 border-b border-charcoal-700">
          <span className={clsx(
            'font-cormorant text-5xl lg:text-6xl font-700 tracking-tight',
            highlighted ? 'text-charcoal-100' : 'text-charcoal-200'
          )}>
            {price}
          </span>
          <span className="font-sans text-sm text-charcoal-200 font-400">{period}</span>
        </div>

        <ul className="space-y-3.5 flex-1 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className={clsx(
                'flex-shrink-0 mt-0.5 w-4 h-4 rounded-md flex items-center justify-center',
                highlighted ? 'bg-gold/15 text-gold' : 'bg-charcoal-800 text-charcoal-300 border border-charcoal-600'
              )}>
                <Check size={10} strokeWidth={3} className={highlighted ? 'text-gold' : 'text-charcoal-300'} />
              </div>
              <span className="font-sans text-sm text-charcoal-200 leading-relaxed font-400">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/start"
          className={clsx(
            'w-full text-center font-sans text-sm font-600 py-4 rounded-lg transition-[border-color,color,background-color] duration-200',
            highlighted
              ? 'btn-primary'
              : 'border border-charcoal-600 text-charcoal-200 hover:border-gold/40 hover:text-gold hover:bg-gold/5'
          )}
        >
          {cta}
        </Link>
      </div>
    </motion.div>
  )
}
