/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    // Every next/image call site sitewide uses quality={92} — this is the
    // one value that needs to be here, not a pre-emptive full range. Was
    // producing a "quality not configured" warning on every image and
    // will be a hard requirement starting in Next.js 16.
    qualities: [92],
  },
  // Baseline hardening headers, applied site-wide. Deliberately no
  // Content-Security-Policy here: the site relies on GSAP/Framer Motion
  // inline style mutation, a couple of inline `<style>`/`<script
  // type="application/ld+json">` blocks, and live third-party iframes in
  // SitePreview — a correct CSP for that mix needs real testing against
  // every page, not a value guessed at once and left unverified.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
