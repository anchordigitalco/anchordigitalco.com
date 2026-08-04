import { Logo } from '@/components/BrandLogo'

export default function Footer() {
  return (
    <footer data-theme="dark" className="bg-dark" style={{ paddingTop: 'var(--section-y)', paddingBottom: '2rem' }}>
      <div style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div className="border-b border-white/10 pb-10">
          <Logo invert />
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
