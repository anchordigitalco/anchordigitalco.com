'use client'
import { cn } from '@/lib/utils'
import {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  ElementType,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react'

const MouseEnterContext = createContext<[boolean, (v: boolean) => void] | undefined>(undefined)

/**
 * Mouse-move-driven 3D tilt — pure `transform`, no scroll dependency, so
 * it's safe to drop in anywhere without touching the site's scroll
 * infrastructure. Colorless by design; callers supply the card's actual
 * face (background/border/text) via `className`/children.
 */
export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children?: ReactNode
  className?: string
  containerClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }

  return (
    <MouseEnterContext.Provider value={[entered, setEntered]}>
      <div className={cn('flex items-center justify-center', containerClassName)} style={{ perspective: '1000px' }}>
        <div
          ref={ref}
          onMouseEnter={() => setEntered(true)}
          onMouseMove={onMove}
          onMouseLeave={() => {
            setEntered(false)
            if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
          }}
          className={cn('relative flex items-center justify-center transition-transform duration-200 ease-linear', className)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('[transform-style:preserve-3d]', className)}>{children}</div>
}

export function CardItem({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  translateX?: number
  translateY?: number
  translateZ?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  const [entered] = useMouseEnter()

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transform = entered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : `translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0) rotateZ(0)`
  }, [entered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ])

  return (
    <Tag ref={ref} className={cn('w-fit transition-transform duration-200 ease-linear', className)} {...rest}>
      {children}
    </Tag>
  )
}

function useMouseEnter() {
  const ctx = useContext(MouseEnterContext)
  if (!ctx) throw new Error('useMouseEnter must be used within a CardContainer')
  return ctx
}
