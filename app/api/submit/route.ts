import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = ['adam@bellobleecker.com', 'jackson@bellobleecker.com']

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0E1528; color: #EEF2FF; border-radius: 8px;">
        <h2 style="color: #2B7FFF; margin-bottom: 4px;">New Project Inquiry</h2>
        <p style="color: #7080A0; margin-top: 0; margin-bottom: 24px; font-size: 14px;">Submitted via bellobleecker.com</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0; width: 40%;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.name || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;"><a href="mailto:${data.email}" style="color: #2B7FFF;">${data.email || '—'}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.phone || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Business</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.businessName || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Industry</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.industry || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Current Site</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.currentWebsite || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Needs</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${(data.projectNeeds || []).join(', ') || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Style</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.stylePreference || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Theme</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.themePreference || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Budget</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.budget || '—'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #182038; color: #7080A0;">Launch Date</td><td style="padding: 10px 0; border-bottom: 1px solid #182038;">${data.launchDate || '—'}</td></tr>
          <tr><td style="padding: 10px 0; color: #7080A0;">Found Us Via</td><td style="padding: 10px 0;">${data.referral || '—'}</td></tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #182038; border-radius: 6px; font-size: 13px; color: #7080A0;">
          Reply directly to this email to reach the client.
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Bello Bleecker <noreply@bellobleecker.com>',
      to: RECIPIENTS,
      replyTo: data.email,
      subject: `New Inquiry: ${data.businessName || 'Unknown Business'} — ${data.industry || ''}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
