import { Karla, Varela_Round, Quicksand } from 'next/font/google'

/**
 * Karla — the single family for headings and body copy sitewide. Soft,
 * humanist edges rather than Switzer's neutral grotesk, without going as
 * far as a fully rounded geometric face for running text.
 */
export const karla = Karla({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
})

/**
 * Varela Round — reserved for chrome only: nav links, buttons, and the
 * `label` type scale (see tailwind.config.js). Fully rounded terminals,
 * used deliberately in the UI you touch rather than in every letterform
 * on the page.
 */
export const varelaRound = Varela_Round({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-varela-round',
  display: 'swap',
})

/**
 * Quicksand — kept as-is for the homepage hero's "anchor digital" text
 * only, left untouched by the sitewide Karla/Varela Round change.
 */
export const quicksand = Quicksand({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})
