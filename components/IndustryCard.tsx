'use client'
import { motion } from 'framer-motion'
import {
  UtensilsCrossed, Shirt, User, Scissors, Camera,
  Building2, MapPin, BookOpen, Briefcase, type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  utensils: UtensilsCrossed,
  shirt: Shirt,
  user: User,
  scissors: Scissors,
  camera: Camera,
  building: Building2,
  'map-pin': MapPin,
  'book-open': BookOpen,
  briefcase: Briefcase,
}

interface IndustryCardProps {
  icon: string
  title: string
  description: string
  index?: number
}

export default function IndustryCard({ icon, title, description, index = 0 }: IndustryCardProps) {
  const Icon: LucideIcon = iconMap[icon] || User

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-charcoal-700 p-6 rounded-lg overflow-hidden cursor-default transition-all duration-300 hover:border-gold/40 shadow-surface hover:shadow-gold"
    >
      {/* Blue top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left rounded-t-lg" />

      {/* Icon */}
      <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 group-hover:bg-gold/15 transition-colors duration-300">
        <Icon size={18} className="text-gold" />
      </div>

      {/* Title */}
      <h3 className="font-sans text-base font-600 text-charcoal-100 mb-2 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-charcoal-300 leading-relaxed font-400">
        {description}
      </p>
    </motion.div>
  )
}
