'use client'
import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoFull } from '@/components/BrandLogo'
import Reveal from '@/components/Reveal'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/start' },
]

export default function Header() {
  // Whether this page opens on a photo/video hero (data-theme="dark" on
  // its first section) — only those need a transparent, light-text header
  // that inverts once you scroll past them. Text-only heroes (Team,
  // Pricing, Contact) are data-theme="light" and just get the solid bar
  // from the very top, no transparent phase at all.
  const [heroIsPhoto, setHeroIsPhoto] = useState(false)
  // Whether that hero photo is still filling the header's own strip
  // right now.
  const [overHero, setOverHero] = useState(false)
  // Narrower than heroIsPhoto — true only for the homepage's video hero
  // (marked with data-hero-video), never a PageHero photo. The logo hides
  // only over the video; the bar/text-color logic below still treats both
  // kinds of dark hero the same way.
  const [heroIsVideo, setHeroIsVideo] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Header lives in the root layout and never remounts across client-side
  // navigations — only the routed page content swaps out. Depending on
  // pathname forces both effects below to re-run on every route change,
  // so a stale hero-photo flag from the previous page doesn't linger.
  const pathname = usePathname()

  // Determine the new page's hero type before paint. Can't do this via a
  // useState lazy initializer — the server has no DOM to check, always
  // renders `false`, and React does not patch up a mismatched attribute
  // on hydration, so a client-only initial guess would leave the wrong
  // value permanently instead of momentarily. useLayoutEffect runs after
  // hydration (matching the server's `false`, so no mismatch) but before
  // paint, so the correction is never visible as a flash.
  useLayoutEffect(() => {
    const first = document.querySelector<HTMLElement>('main [data-theme]')
    const isPhoto = first?.getAttribute('data-theme') === 'dark'
    setHeroIsPhoto(isPhoto)
    setOverHero(isPhoto)
    setHeroIsVideo(first?.hasAttribute('data-hero-video') ?? false)
  }, [pathname])

  // Whether the hero photo still fills the header's own strip is just one
  // element's bounding rect compared to the header's height — not a
  // continuous per-section theme match down the whole page. Earlier
  // approaches tried to track every section's data-theme as you scrolled
  // past it (IntersectionObserver enter/exit events, then sampling
  // whatever was actually painted under the header every frame); both
  // worked but meant the header kept re-deciding its color for the
  // entire page, and both had their own edge cases (untagged gaps around
  // boxed panels, a few frames of lag under heavy scroll). Tying it to
  // one known element removes that whole class of bug: past the hero,
  // the header just stays on its one fixed bar/dark-text look for the
  // rest of the page, whether the section behind it is itself light or
  // dark — the bar makes what's behind it irrelevant.
  useEffect(() => {
    if (!heroIsPhoto) return
    const hero = document.querySelector<HTMLElement>('main [data-theme]')
    if (!hero) return
    let raf = 0

    const check = () => {
      const navHeight =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 88
      setOverHero(hero.getBoundingClientRect().bottom > navHeight)
      raf = requestAnimationFrame(check)
    }

    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [heroIsPhoto, pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const textColor = overHero ? 'text-dark-ink' : 'text-ink-muted'

  return (
    <>
      <header
        data-theme={overHero ? 'dark' : 'light'}
        style={{ zIndex: 'var(--z-header)' }}
        className={`fixed top-0 left-0 right-0 transition-colors duration-300 ${overHero ? 'bg-transparent' : 'bg-ground'}`}
      >
        <div
          className="flex items-center justify-between"
          style={{ height: 'var(--nav-height)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
        >
          <Link
            href="/"
            aria-label="Anchor Digital home"
            aria-hidden={overHero && heroIsVideo}
            tabIndex={overHero && heroIsVideo ? -1 : undefined}
            className={`header-text transition-opacity duration-300 ${textColor} ${overHero && heroIsVideo ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          >
            <LogoFull invert={overHero} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-text font-rounded transition-colors duration-300 text-small ${textColor} hover:opacity-60`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden header-text font-rounded transition-colors duration-300 text-small ${textColor}`}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile full-screen panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 'var(--z-overlay)' }}
            className="fixed inset-0 bg-ground"
          >
            <div className="flex items-center justify-between" style={{ height: 'var(--nav-height)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
              <Link href="/" aria-label="Anchor Digital home" onClick={() => setMobileOpen(false)}>
                <LogoFull />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-ink-muted text-small font-rounded">
                Close
              </button>
            </div>
            <nav className="flex flex-col justify-center gap-2" style={{ height: 'calc(100% - var(--nav-height))', paddingLeft: 'var(--gutter)' }}>
              {NAV_LINKS.map((link, i) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-ink font-rounded">
                  <Reveal as="span" split="none" delay={i * 0.07} className="text-display block">
                    {link.label}
                  </Reveal>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
