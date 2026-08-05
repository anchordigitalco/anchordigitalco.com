import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Standard shadcn/ui class-merging helper — combines conditional class
 * strings (clsx) and resolves conflicting Tailwind utilities in favor of
 * whichever comes last (tailwind-merge). Used by components/ui primitives. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
