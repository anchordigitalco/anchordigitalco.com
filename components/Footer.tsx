import Link from 'next/link'
import { Mail, MapPin, Instagram, Linkedin } from 'lucide-react'
import { LogoFull } from '@/components/BrandLogo'

const footerNav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Start a Project', href: '/start' },
  { label: 'Meet the Team', href: '/team' },
]

const footerServices = [
  { label: 'Website Design & Dev', href: '/services#design-dev' },
  { label: 'Brand Digital Systems', href: '/services#brand-systems' },
  { label: 'E-Commerce Stores', href: '/services#brand-systems' },
  { label: 'Ongoing Maintenance', href: '/services#maintenance' },
  { label: 'Website in 7 Days', href: '/pricing#fast-launch' },
]

export default function Footer() {
  return (
    <footer className="relative bg-charcoal-800 overflow-hidden border-t border-charcoal-700">
      {/* Accent top line */}
      <div className="divider-accent" />

      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.12]"
          style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5" aria-label="Bello Bleecker home">
              <LogoFull imageHeight={72} />
            </Link>
            <p className="font-sans text-sm text-charcoal-300 leading-relaxed mb-6 max-w-[240px] font-400">
              Modern digital systems for businesses that want to stand out.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-charcoal-400 hover:text-gold transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-300 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-charcoal-300 hover:text-charcoal-100 transition-colors duration-200 font-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-300 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-charcoal-300 hover:text-charcoal-100 transition-colors duration-200 font-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs font-600 tracking-[0.15em] uppercase text-charcoal-300 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <Link
                  href="/start"
                  className="font-sans text-sm text-charcoal-300 hover:text-charcoal-100 transition-colors font-400"
                >
                  Contact Us
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-charcoal-300 font-400">
                  New York, NY
                  <br />
                  <span className="text-charcoal-400 text-xs">Serving clients nationwide</span>
                </span>
              </li>
            </ul>
            <Link
              href="/start"
              className="inline-block mt-6 font-sans text-sm font-500 text-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/5 px-5 py-2.5 rounded-md transition-all duration-200"
            >
              Start a Project →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-charcoal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-charcoal-400 font-400">
            © 2026 Bello Bleecker Digital Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-sans text-xs text-charcoal-400 hover:text-charcoal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-sans text-xs text-charcoal-400 hover:text-charcoal-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
