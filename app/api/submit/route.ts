import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const RECIPIENTS = ['adam@anchordigitalco.com', 'jackson@anchordigitalco.com']

// Every field lands in an HTML email verbatim below — without this, a
// submission containing `<script>` or a stray `<img onerror=...>` would
// render as live HTML in whoever's inbox reads it, not as plain text.
function escapeHtml(value: unknown): string {
  if (value === undefined || value === null || value === '') return '—'
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Simple presence/shape checks — not exhaustive validation, just enough to
// reject obviously-malformed or abusive payloads before they reach
// Nodemailer. `need`/`message` are the only free-text fields with real
// length, since a legitimate inquiry is never going to run tens of
// thousands of characters.
const MAX_SHORT = 200
const MAX_LONG = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: Record<string, unknown>): string | null {
  if (typeof data.name !== 'string' || !data.name.trim()) return 'Name is required.'
  if (data.name.length > MAX_SHORT) return 'Name is too long.'
  if (typeof data.email !== 'string' || !EMAIL_RE.test(data.email)) return 'A valid email is required.'
  if (data.email.length > MAX_SHORT) return 'Email is too long.'
  for (const field of ['company', 'describes', 'describesOther', 'timeline'] as const) {
    if (data[field] !== undefined && (typeof data[field] !== 'string' || (data[field] as string).length > MAX_SHORT)) {
      return 'One of the fields is too long.'
    }
  }
  for (const field of ['need', 'message'] as const) {
    if (data[field] !== undefined && (typeof data[field] !== 'string' || (data[field] as string).length > MAX_LONG)) {
      return 'One of the fields is too long.'
    }
  }
  return null
}

// The client-side checkbox only proves someone clicked it — a scripted
// request can send any string as `recaptchaToken`. This is the actual
// enforcement: the token is redeemed against Google's own endpoint using
// the secret key, which only Google and this server ever see.
async function verifyCaptcha(token: unknown): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error('RECAPTCHA_SECRET_KEY is not set — rejecting submission.')
    return false
  }
  if (typeof token !== 'string' || !token) return false

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })
  const result = await res.json()
  return result.success === true
}

// In-memory per-IP throttle. This resets on every cold start/redeploy on
// serverless hosting (Vercel functions don't share memory across
// instances), so it's a real but partial mitigation against casual
// scripted abuse, not a substitute for a durable store (Upstash/Vercel KV)
// if spam becomes an actual problem.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    const data = await req.json()

    const validationError = validate(data)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    if (!(await verifyCaptcha(data.recaptchaToken))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 })
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0E1528; color: #EEF2FF; border-radius: 8px;">
        <h2 style="color: #2B7FFF; margin-bottom: 4px;">New Project Inquiry</h2>
        <p style="color: #7080A0; margin-top: 0; margin-bottom: 24px; font-size: 14px;">Submitted via anchordigitalco.com</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0; width: 40%;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.company)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Describes them</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.describes)}${data.describes === 'Other' && data.describesOther ? ` (${escapeHtml(data.describesOther)})` : ''}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">What they need</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.need)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Timeline</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${escapeHtml(data.timeline)}</td></tr>
          <tr><td style="padding: 10px 0; color: #7080A0; vertical-align: top;">Message</td><td style="padding: 10px 0;">${escapeHtml(data.message)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #182038; border-radius: 6px; font-size: 13px; color: #7080A0;">
          Reply to this email to reach the client at ${escapeHtml(data.email)}.
        </div>
      </div>
    `

    await transporter.sendMail({
      // The "From" address has to match the authenticated Gmail account
      // (GMAIL_USER) or Gmail silently rewrites/flags it, which can bounce
      // or spam-fold the message. Recipients (the inbox this actually needs
      // to land in) are set separately below and are unaffected by this.
      from: `Anchor Digital <${process.env.GMAIL_USER}>`,
      to: RECIPIENTS,
      replyTo: data.email,
      subject: `New Inquiry: ${data.name || 'Unknown'} — ${data.describes || ''}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    // Logged in full server-side; the client only ever gets a generic
    // message so internal error text/library details can't leak out.
    console.error('Email error:', String(err))
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
