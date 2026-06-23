/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // cormorant maps to Sora — display/heading font throughout the site
        cormorant: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#2B7FFF',
          light: '#5BA8FF',
          dark: '#1060E0',
          muted: 'rgba(43, 127, 255, 0.12)',
          glow: 'rgba(43, 127, 255, 0.08)',
        },
        // Dark theme — 900 is the darkest (main bg), 50 is near-white
        charcoal: {
          DEFAULT: '#0A0D18',
          50:  '#EEF2FF',
          100: '#D0DAFF',
          200: '#A8BAE0',
          300: '#7080A0',
          400: '#485878',
          500: '#303D58',
          600: '#222D48',
          700: '#182038',
          800: '#0E1528',
          900: '#080B18',
        },
        cream: '#EEF2FF',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '25%': { transform: 'translate(8%, -12%) scale(1.06)' },
          '50%': { transform: 'translate(-6%, 8%) scale(0.94)' },
          '75%': { transform: 'translate(10%, 4%) scale(1.03)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(-10%, 6%) scale(1.1)' },
          '66%': { transform: 'translate(6%, -10%) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-accent': {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.30', transform: 'scale(1.03)' },
        },
        'slide-progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        blob1: 'blob1 22s ease-in-out infinite',
        blob2: 'blob2 28s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-accent': 'pulse-accent 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(43, 127, 255, 0.4)',
        'gold-lg': '0 0 40px rgba(43, 127, 255, 0.20)',
        surface: '0 2px 16px rgba(0,0,0,0.4)',
        'surface-lg': '0 8px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
