import { Logo } from '@/components/BrandLogo'

export default function Footer() {
  return (
    <footer data-theme="dark" className="bg-dark" style={{ paddingTop: 'var(--section-y)', paddingBottom: '2rem' }}>
      <div style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo invert />
          </div>

          <form className="w-full max-w-sm">
            <label htmlFor="footer-email" className="text-label text-dark-ink opacity-60">
              Stay in the loop
            </label>
            <div className="mt-2 flex items-end gap-4 border-b border-white/25">
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent py-2 text-small text-dark-ink placeholder:text-dark-ink placeholder:opacity-40 focus:outline-none"
              />
              <button type="submit" className="pb-2 text-small text-dark-ink hover:opacity-60">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-small text-dark-ink opacity-60 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-6">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
