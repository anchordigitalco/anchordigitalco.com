'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { LogoFull, LogoMarkImage } from '@/components/BrandLogo'
import clsx from 'clsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled
            ? 'bg-charcoal-900/95 backdrop-blur-xl border-b border-charcoal-700 shadow-surface'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-28">
            <Link href="/" aria-label="Bello Bleecker home" className="mt-4">
              <LogoFull imageHeight={140} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'font-sans text-sm font-500 tracking-wide transition-colors duration-200 relative group',
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-charcoal-300 hover:text-charcoal-100'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              ))}
              <Link
                href="/start"
                className="btn-primary font-sans text-sm px-5 py-2.5 rounded-md"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-charcoal-300 hover:text-charcoal-100 transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-charcoal-900"
          >
            {/* Blue glow */}
            <div
              className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />

            <div className="relative h-full flex flex-col px-8 py-8">
              <div className="flex items-center justify-between">
                <LogoMarkImage />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-charcoal-400 hover:text-charcoal-100 transition-colors p-2"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="font-cormorant text-4xl font-700 text-charcoal-200 hover:text-gold transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                className="pb-4"
              >
                <Link
                  href="/start"
                  className="btn-primary inline-block font-sans text-sm px-8 py-4 rounded-md w-full text-center"
                >
                  Start a Project
                </Link>
                <p className="font-sans text-xs text-charcoal-400 text-center mt-4 tracking-wide">
                  hello@bellobleecker.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
