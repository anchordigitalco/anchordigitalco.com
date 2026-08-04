/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Replaced, not extended — radius is a decision, not a reflex. Only "none"
    // (the sitewide default) and "full" (the hero CTA pill, slide-indicator
    // dots) exist. rounded-md/lg/xl/2xl are intentionally unavailable.
    borderRadius: {
      none: '0px',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        // Headings and body copy sitewide.
        sans: ['var(--font-karla)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Chrome only: nav links, buttons, and the `label` size below.
        rounded: ['var(--font-varela-round)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        ground: 'var(--ground)',
        'ground-alt': 'var(--ground-alt)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        dark: 'var(--dark)',
        'dark-ink': 'var(--dark-ink)',
        hairline: 'var(--hairline)',
      },
      fontSize: {
        // Two real sizes carry the page: enormous headings, small everything
        // else. Almost nothing sits between `lead` and `body` on purpose.
        hero: ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        display: ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        lead: ['clamp(1.5rem, 2.6vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        body: ['1.0625rem', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        small: ['0.875rem', { lineHeight: '1.45', letterSpacing: '0em' }],
        label: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontFamily: 'var(--font-varela-round)' }],
      },
      maxWidth: {
        site: '1680px',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
