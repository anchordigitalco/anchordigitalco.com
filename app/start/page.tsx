import type { Metadata } from 'next'
import Image from 'next/image'
import StartFlow from '@/components/sections/StartFlow'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: "Tell us what you need. We'll get back to you quickly with a clear path forward.",
}

export default function StartPage() {
  return (
    <section
      data-theme="light"
      aria-label="Start a project"
      className="bg-ground"
      style={{
        paddingTop: 'calc(var(--nav-height) + var(--gutter))',
        paddingBottom: 'var(--gutter)',
        paddingLeft: 'var(--gutter)',
        paddingRight: 'var(--gutter)',
      }}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-7">
        <div className="rounded-[20px] shadow-2xl md:col-span-3 md:self-start">
          <div className="relative min-h-[70svh] overflow-hidden rounded-[20px] md:min-h-[calc(100svh-var(--nav-height)-var(--gutter)*2)]">
            <Image
              src="/images/contact-header.png"
              alt=""
              fill
              priority
              quality={92}
              sizes="(min-width: 768px) 43vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col justify-center"
              style={{ height: '30%', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              <h1>
                <Reveal as="span" split="lines" immediate className="block text-lead font-bold text-ink">
                  {['Start a project']}
                </Reveal>
              </h1>
              <p className="mt-2 text-small text-ink">Tell us what you need. We reply to everything.</p>
              <Reveal as="p" split="words" immediate className="mt-4 max-w-[34ch] text-small text-ink">
                Tell us about your business and what you&apos;re building.
              </Reveal>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:col-span-4 md:col-start-4">
          <StartFlow />
        </div>
      </div>
    </section>
  )
}
