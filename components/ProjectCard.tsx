'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  slug: string
  name: string
  industry: string
  tagline: string
  description: string
  gradient: string
  accentColor: string
  result?: string
  index?: number
}

export default function ProjectCard({
  slug, name, industry, tagline, description, gradient, accentColor, result, index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl bg-white border border-charcoal-700 hover:border-gold/40 transition-all duration-500 shadow-surface hover:shadow-surface-lg"
    >
      {/* Visual color block — project identity stays as designed */}
      <div className={`relative h-[200px] lg:h-[260px] bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-25"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)`, filter: 'blur(40px)' }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accentColor}22 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute bottom-8 left-8 right-8 space-y-3 opacity-60">
          <div className="h-2 w-32 rounded-sm" style={{ background: accentColor }} />
          <div className="h-1.5 w-48 bg-white/20 rounded-sm" />
          <div className="h-1.5 w-40 bg-white/10 rounded-sm" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentColor }} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <Link
            href={`/work/${slug}`}
            className="inline-flex items-center gap-2 font-sans text-sm font-600 text-white bg-black/60 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-lg hover:bg-black/80 transition-all duration-200"
          >
            View Project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-400 mb-1.5 block">
              {industry}
            </span>
            <h3 className="font-cormorant text-2xl lg:text-3xl font-700 text-charcoal-100 group-hover:text-gold transition-colors duration-300 tracking-tight">
              {name}
            </h3>
          </div>
          <Link
            href={`/work/${slug}`}
            className="flex-shrink-0 w-9 h-9 rounded-lg border border-charcoal-600 group-hover:border-gold/60 flex items-center justify-center text-charcoal-400 group-hover:text-gold transition-all duration-300"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <p className="font-sans text-sm font-500 text-charcoal-300 mb-3">{tagline}</p>
        <p className="font-sans text-sm text-charcoal-400 leading-relaxed font-400">{description}</p>

        {result && (
          <div className="mt-5 pt-4 border-t border-charcoal-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            <span className="font-sans text-xs font-600 text-gold">{result}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
