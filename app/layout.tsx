import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bellobleecker.com'),
  title: {
    default: 'Bello Bleecker Digital Consulting',
    template: '%s | Bello Bleecker',
  },
  description:
    'Premium digital consulting for brands, restaurants, creators, and growing businesses. We design sleek, high-performing websites and digital systems.',
  keywords: ['digital consulting', 'web design', 'web development', 'New York', 'restaurant website', 'e-commerce', 'brand website'],
  openGraph: {
    title: 'Bello Bleecker Digital Consulting',
    description: 'Premium digital consulting for brands, restaurants, creators, and growing businesses.',
    url: 'https://bellobleecker.com',
    siteName: 'Bello Bleecker',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bello Bleecker Digital Consulting',
    description: 'Premium digital consulting for brands, restaurants, creators, and growing businesses.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-charcoal-900 text-cream min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
