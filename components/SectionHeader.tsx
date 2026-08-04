import Reveal from '@/components/Reveal'
import FadeUp from '@/components/FadeUp'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2>
        <Reveal as="span" split="lines" className="block text-lead font-normal text-ink">
          {[title]}
        </Reveal>
      </h2>
      {subtitle && (
        <FadeUp delay={0.15}>
          <p className="mt-4 text-body text-ink-muted">{subtitle}</p>
        </FadeUp>
      )}
    </div>
  )
}
