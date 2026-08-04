import Link from 'next/link'
import { ReactNode } from 'react'

export default function TextLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link href={href} className={`group relative inline-block text-small ${className}`}>
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current origin-left scale-x-0 transition-transform duration-300 ease-reveal group-hover:scale-x-100" />
    </Link>
  )
}
