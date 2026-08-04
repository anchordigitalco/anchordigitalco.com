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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0E1528; color: #EEF2FF; border-radius: 8px;">
        <h2 style="color: #2B7FFF; margin-bottom: 4px;">New Project Inquiry</h2>
        <p style="color: #7080A0; margin-top: 0; margin-bottom: 24px; font-size: 14px;">Submitted via anchordigitalco.com</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0; width: 40%;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.name || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.email || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.company || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Describes them</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.describes || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">What they need</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.need || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Timeline</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.timeline || '—'}</td></tr>
          <tr><td style="padding: 10px 0; color: #7080A0; vertical-align: top;">Message</td><td style="padding: 10px 0;">${data.message || '—'}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #182038; border-radius: 6px; font-size: 13px; color: #7080A0;">
          Reply to this email to reach the client at ${data.email || '—'}.
        </div>
      </div>
    `

    await transporter.sendMail({
      from: 'Anchor Digital <adam@anchordigitalco.com>',
      to: RECIPIENTS,
      replyTo: data.email,
      subject: `New Inquiry: ${data.name || 'Unknown'} — ${data.describes || ''}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email error:', String(err))
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
