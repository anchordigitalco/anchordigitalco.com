import type Lenis from 'lenis'

/**
 * The single Lenis instance SmoothScrollProvider creates for the whole
 * document, exposed here so components that don't own it — like Hero's
 * scroll-expand sequence, which needs to briefly `.stop()`/`.start()`
 * scrolling for its "hold" beat — can reach it without prop-drilling or a
 * context provider for what's otherwise a singleton per page.
 */
let instance: Lenis | null = null

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis
}

export function getLenisInstance(): Lenis | null {
  return instance
}
