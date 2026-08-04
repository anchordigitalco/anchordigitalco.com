'use client'
import { useEffect, useState } from 'react'

/**
 * Single source of truth for prefers-reduced-motion. Every animated component
 * checks this instead of re-querying matchMedia itself.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  return reduced
}
