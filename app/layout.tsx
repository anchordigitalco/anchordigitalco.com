import type { Metadata, Viewport } from 'next'
import { karla, varelaRound } from './fonts'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://anchordigitalco.com'),
  title: {
    default: 'Anchor Digital',
    template: '%s | Anchor Digital',
  },
  description:
    'Premium digital consulting for brands, restaurants, creators, and growing businesses. We design sleek, high-performing websites and digital systems.',
  keywords: ['digital consulting', 'web design', 'web development', 'New York', 'restaurant website', 'e-commerce', 'brand website'],
  openGraph: {
    title: 'Anchor Digital',
    description: 'Premium digital consulting for brands, restaurants, creators, and growing businesses.',
    url: 'https://anchordigitalco.com',
    siteName: 'Anchor Digital',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anchor Digital',
    description: 'Premium digital consulting for brands, restaurants, creators, and growing businesses.',
  },
  robots: { index: true, follow: true },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Anchor Digital',
  url: 'https://anchordigitalco.com',
  areaServed: ['Maine', 'New York', 'United States'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${karla.variable} ${varelaRound.variable}`}>
      <body className="font-sans bg-ground text-ink min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
