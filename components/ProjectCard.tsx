'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  name: string
  category: string
  description: string
  url: string
  beforeUrl?: string
  tags: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  const [view, setView] = useState<'after' | 'before'>('after')
  const [auto, setAuto] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!project.beforeUrl || !auto) return
    intervalRef.current = setInterval(() => {
      setView((v) => (v === 'after' ? 'before' : 'after'))
    }, 3000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [auto, project.beforeUrl])

  const handleManualSelect = (v: 'after' | 'before') => {
    setAuto(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setView(v)
  }

  return (
    <div
      className="group bg-charcoal-900 border border-charcoal-700 rounded-2xl overflow-hidden hover:border-gold/40 transition-[border-color,box-shadow] duration-200"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
    >
      {/* Before / After toggle */}
      {project.beforeUrl && (
        <div className="flex items-center gap-1 px-4 pt-4">
          <button
            onClick={() => handleManualSelect('after')}
            className={`font-sans text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
              view === 'after'
                ? 'bg-gold text-charcoal-900 font-600'
                : 'text-charcoal-400 hover:text-cream border border-charcoal-700'
            }`}
          >
            After
          </button>
          <button
            onClick={() => handleManualSelect('before')}
            className={`font-sans text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
              view === 'before'
                ? 'bg-charcoal-300 text-charcoal-900 font-600'
                : 'text-charcoal-400 hover:text-cream border border-charcoal-700'
            }`}
          >
            Before
          </button>
        </div>
      )}

      {/* Live preview */}
      <a
        href={view === 'before' ? project.beforeUrl : project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden bg-charcoal-700 mt-3 mx-4 rounded-xl"
        style={{ aspectRatio: '16/9' }}
      >
        <iframe
          key={view}
          src={view === 'before' ? project.beforeUrl : project.url}
          title={`${project.name} ${view} preview`}
          scrolling="no"
          className="absolute top-0 left-0 border-0"
          style={{
            width: '1440px',
            height: '900px',
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        />
        <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal-900/80 border border-charcoal-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowUpRight size={14} className="text-gold" />
        </div>
        {view === 'before' && (
          <div className="absolute bottom-3 left-3 font-sans text-xs bg-charcoal-900/80 border border-charcoal-700 text-charcoal-300 px-2 py-1 rounded-md">
            Archived — before Bello Bleecker
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="font-sans text-xs text-gold font-600 tracking-wide uppercase mb-1">{project.category}</p>
            <h2 className="font-cormorant text-2xl font-700 text-cream tracking-tight">{project.name}</h2>
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <ArrowUpRight size={18} className="text-charcoal-500 hover:text-gold transition-colors mt-1 flex-shrink-0" />
          </a>
        </div>
        <p className="font-sans text-sm text-charcoal-200 leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="font-sans text-xs text-charcoal-200 bg-charcoal-800 border border-charcoal-700 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
