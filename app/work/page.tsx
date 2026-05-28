import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Bello Bleecker — websites and digital systems built for brands, creators, and growing businesses.',
}

const projects = [
  {
    name: 'Akil Bello',
    category: 'Personal Brand',
    description:
      'A sleek personal brand site for Akil Bello — educator, test-prep expert, and advocate for equity in education. Built to establish digital authority and drive speaking and consulting inquiries.',
    url: 'https://akilbello.com',
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
              Selected work.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-charcoal-300 leading-relaxed max-w-2xl">
              Every site is built custom — no templates, no compromises.
            </p>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-24 lg:py-32 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-charcoal-900 border border-charcoal-700 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
              >
                {/* Live preview */}
                <div className="relative aspect-video overflow-hidden bg-charcoal-700">
                  <iframe
                    src={project.url}
                    title={`${project.name} website preview`}
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
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-900/80 border border-charcoal-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-gold" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-sans text-xs text-gold font-600 tracking-wide uppercase mb-1">{project.category}</p>
                      <h2 className="font-cormorant text-2xl font-700 text-cream tracking-tight">{project.name}</h2>
                    </div>
                    <ArrowUpRight size={18} className="text-charcoal-500 group-hover:text-gold transition-colors mt-1 flex-shrink-0" />
                  </div>
                  <p className="font-sans text-sm text-charcoal-300 leading-relaxed mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-sans text-xs text-charcoal-300 bg-charcoal-800 border border-charcoal-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
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
