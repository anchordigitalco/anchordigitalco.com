import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug)
  const prevProject = PROJECTS[currentIndex - 1] || null
  const nextProject = PROJECTS[currentIndex + 1] || null

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-40 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          pointerEvents: 'none',
        }} />

        {/* Accent glow */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accentColor}44 0%, transparent 70%)`, filter: 'blur(80px)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-sm text-white/60 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>

          <div className="max-w-3xl">
            <span
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-xl border mb-6 font-500"
              style={{ color: project.accentColor, borderColor: `${project.accentColor}44`, background: `${project.accentColor}11` }}
            >
              {project.industry}
            </span>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,7rem)] font-300 text-white leading-none mb-4">
              {project.name}
            </h1>
            <p className="font-cormorant text-2xl italic text-white/70 mb-6">
              {project.tagline}
            </p>
            <p className="font-sans text-base lg:text-lg text-white/60 leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Result callout */}
      <section className="bg-charcoal-900 border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300">
                Result
              </span>
            </div>
            <p className="font-cormorant text-xl italic text-gold">{project.result}</p>
          </div>
        </div>
      </section>

      {/* Case study body */}
      <article className="py-24 lg:py-32 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 prose-luxury space-y-16">
              {/* Overview */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-gold" />
                  <span className="font-sans text-xs tracking-[0.15em] uppercase text-gold font-500">Overview</span>
                </div>
                <h2 className="font-cormorant text-3xl lg:text-4xl font-500 text-cream mb-5">
                  Project Overview
                </h2>
                <p className="font-sans text-base text-charcoal-200 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Problem/Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-7">
                  <h3 className="font-cormorant text-2xl font-500 text-cream mb-4">The Problem</h3>
                  <p className="font-sans text-sm text-charcoal-300 leading-relaxed">{project.problem}</p>
                </div>
                <div className="bg-charcoal-800 border border-gold/20 rounded-xl p-7">
                  <h3 className="font-cormorant text-2xl font-500 text-gold mb-4">The Solution</h3>
                  <p className="font-sans text-sm text-charcoal-200 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Visual placeholder blocks */}
              <div className="space-y-4">
                <div className={`h-[300px] lg:h-[400px] rounded-xl bg-gradient-to-br ${project.gradient} border border-charcoal-700 relative overflow-hidden`}>
                  <div
                    className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-30"
                    style={{ background: `radial-gradient(circle, ${project.accentColor}55 0%, transparent 70%)`, filter: 'blur(40px)' }}
                  />
                  <div className="absolute inset-8 space-y-3 opacity-40">
                    <div className="h-3 w-1/2 rounded-xl" style={{ background: project.accentColor }} />
                    <div className="h-2 w-3/4 bg-white/20 rounded-xl" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-xl" />
                  </div>
                  <div className="absolute bottom-6 left-8 font-sans text-xs text-white/30 tracking-wide">
                    Desktop View
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className={`h-[180px] rounded-xl bg-gradient-to-br ${project.gradient} border border-charcoal-700 relative overflow-hidden`}
                    >
                      <div
                        className="absolute bottom-0 left-0 w-[200px] h-[200px] opacity-25"
                        style={{ background: `radial-gradient(circle, ${project.accentColor}55 0%, transparent 70%)`, filter: 'blur(30px)' }}
                      />
                      <div className="absolute bottom-4 left-4 font-sans text-xs text-white/30 tracking-wide">
                        {n === 1 ? 'Mobile View' : 'Detail View'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Features built */}
              <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-7 sticky top-28">
                <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal-300 mb-6">
                  Features Built
                </h3>
                <ul className="space-y-3.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center">
                        <Check size={9} strokeWidth={3} className="text-gold" />
                      </div>
                      <span className="font-sans text-sm text-charcoal-200 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-charcoal-700">
                  <div className="mb-4">
                    <span className="font-sans text-xs text-charcoal-400">Client Result</span>
                    <p className="font-cormorant text-lg italic text-gold mt-1">{project.result}</p>
                  </div>
                </div>

                <Link
                  href="/start"
                  className="btn-primary w-full text-center block font-sans text-sm py-3.5 rounded-xl mt-6"
                >
                  Start a Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Project navigation */}
      <nav className="border-t border-charcoal-700 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between gap-8">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="flex items-center gap-3 group flex-1"
              >
                <ArrowLeft size={18} className="text-charcoal-400 group-hover:text-gold transition-colors" />
                <div>
                  <div className="font-sans text-xs text-charcoal-400 mb-1">Previous</div>
                  <div className="font-cormorant text-lg font-500 text-cream group-hover:text-gold transition-colors">
                    {prevProject.name}
                  </div>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            <Link
              href="/work"
              className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal-400 hover:text-cream transition-colors flex-shrink-0"
            >
              All Work
            </Link>

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="flex items-center gap-3 group flex-1 justify-end text-right"
              >
                <div>
                  <div className="font-sans text-xs text-charcoal-400 mb-1">Next</div>
                  <div className="font-cormorant text-lg font-500 text-cream group-hover:text-gold transition-colors">
                    {nextProject.name}
                  </div>
                </div>
                <ArrowRight size={18} className="text-charcoal-400 group-hover:text-gold transition-colors" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </nav>
    </>
  )
}
