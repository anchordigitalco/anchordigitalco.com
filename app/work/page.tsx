import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Bello Bleecker — websites and digital systems built for brands, creators, and growing businesses.',
}

const projects = [
  {
    name: 'Ray Cuevo Training',
    category: 'Fitness & Coaching',
    description:
      'A high-performance training site for Ray Cuevo — fitness coach and athlete. Built to drive client inquiries, showcase credentials, and establish a strong digital presence in the competitive fitness space.',
    url: 'https://raycuevotraining.com',
    tags: ['Fitness & Coaching', 'Web Design', 'Dev'],
  },
  {
    name: 'Akil Bello',
    category: 'Personal Brand',
    description:
      'A sleek personal brand site for Akil Bello — educator, test-prep expert, and advocate for equity in education. Built to establish digital authority and drive speaking and consulting inquiries.',
    url: 'https://akilbello.com',
    beforeUrl: 'https://web.archive.org/web/20250702042218/https://akilbello.com/',
    tags: ['Personal Brand', 'Web Design', 'Dev'],
  },
  {
    name: 'Marcus Bleecker',
    category: 'Personal Brand',
    description:
      'A modern personal brand site for Marcus Bleecker. Built to establish a strong digital presence and showcase his work and story.',
    url: 'https://marcusbleecker.com',
    tags: ['Personal Brand', 'Web Design', 'Dev'],
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[400px] opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, rgba(43,127,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold font-600">
                Our Work
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,6.5rem)] font-700 text-cream leading-none mb-6 tracking-tight">
              Our work.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-charcoal-300 leading-relaxed max-w-2xl">
              Every site is built custom — no templates, no compromises. We work across personal brands, restaurants, e-commerce, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-24 lg:py-32 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
            {/* Coming soon card */}
            <div className="bg-charcoal-900 border border-charcoal-700 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
              <div className="relative aspect-video overflow-hidden bg-charcoal-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-charcoal-700 border border-charcoal-600 flex items-center justify-center mx-auto mb-3">
                    <Clock size={22} className="text-gold" />
                  </div>
                  <span className="font-sans text-xs text-charcoal-400 tracking-widest uppercase">In Progress</span>
                </div>
              </div>
              <div className="p-6">
                <p className="font-sans text-xs text-gold font-600 tracking-wide uppercase mb-1">In Progress</p>
                <h2 className="font-cormorant text-2xl font-700 text-cream tracking-tight mb-3">More Coming Soon</h2>
                <p className="font-sans text-sm text-charcoal-300 leading-relaxed mb-5">
                  We are currently building out new projects. Check back soon — or become one of them.
                </p>
                <Link
                  href="/start"
                  className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 rounded-lg"
                >
                  Start Your Project <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-charcoal-900 border-t border-charcoal-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-cormorant text-3xl lg:text-4xl font-700 text-cream mb-4 tracking-tight">
            Want your brand here?
          </h3>
          <p className="font-sans text-charcoal-300 mb-8 text-sm leading-relaxed">
            Every great site starts with a conversation. Tell us what you&apos;re building.
          </p>
          <Link
            href="/start"
            className="btn-primary inline-flex items-center gap-2 font-sans text-base px-10 py-5 rounded-lg"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
