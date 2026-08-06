'use client'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void; 'expired-callback'?: () => void }
      ) => number
      reset: (widgetId?: number) => void
    }
    onRecaptchaApiLoad?: () => void
  }
}

const SCRIPT_ID = 'recaptcha-api-script'

/**
 * Hand-rolled wrapper around Google reCAPTCHA v2's "I'm not a robot"
 * checkbox — no new dependency for what's a ~20-line script-loader.
 * Loads the API script once (shared across every instance on the page via
 * the script id + a global `onRecaptchaApiLoad` callback), then renders
 * the widget explicitly once the API is ready. Site key is public by
 * design (it's meant to ship to the browser); the secret key stays
 * server-side only, used in the API route to actually verify the token.
 */
export function Recaptcha({ onChange }: { onChange: (token: string | null) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  useEffect(() => {
    if (!siteKey) return
    if (window.grecaptcha) {
      setReady(true)
      return
    }
    if (document.getElementById(SCRIPT_ID)) return
    window.onRecaptchaApiLoad = () => setReady(true)
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaApiLoad&render=explicit'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [siteKey])

  useEffect(() => {
    if (!ready || !siteKey || !containerRef.current || widgetId.current !== null || !window.grecaptcha) return
    widgetId.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onChange(token),
      'expired-callback': () => onChange(null),
    })
  }, [ready, siteKey, onChange])

  if (!siteKey) {
    return (
      <p className="text-label text-ink-muted">
        reCAPTCHA isn&apos;t configured yet — set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
      </p>
    )
  }

  return <div ref={containerRef} />
}
