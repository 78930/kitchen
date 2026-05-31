import nodemailer from 'nodemailer'

const EMERALD = '#0F3D2E'
const GOLD = '#F3B942'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null // email is optional — booking still succeeds if unconfigured
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: String(SMTP_SECURE) !== 'false',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return transporter
}

function shell(title, bodyHtml) {
  return `
  <div style="background:#f9f9f9;padding:32px 0;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,61,46,0.12);">
          <tr>
            <td style="background:${EMERALD};padding:28px 32px;text-align:center;">
              <div style="font-size:26px;font-weight:700;color:${GOLD};font-family:Georgia,serif;">The Madhu's Kitchen</div>
            </td>
          </tr>
          <tr><td style="height:4px;background:${GOLD};"></td></tr>
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:22px;color:${EMERALD};font-family:Georgia,serif;">${title}</h1>
            ${bodyHtml}
          </td></tr>
          <tr>
            <td style="background:${EMERALD};padding:20px 32px;text-align:center;color:#cdddd5;font-size:12px;">
              Plot No. 4, RTC Colony, Tirumalgherry, Secunderabad — 500015<br/>
              +91 63036 44615 · sa.hyderabadcaterers@gmail.com
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </div>`
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 0;color:#6b7c74;font-size:13px;width:42%;">${label}</td>
    <td style="padding:8px 0;color:${EMERALD};font-size:14px;font-weight:600;">${value}</td>
  </tr>`
}

function detailTable(b) {
  const date = new Date(b.event_date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="border-collapse:collapse;border-top:1px solid #eee;border-bottom:1px solid #eee;margin:8px 0;">
    ${row('Event Type', b.event_type)}
    ${row('Event Date', date)}
    ${row('Guest Count', `${b.guest_count} guests`)}
    ${row('Package', b.selected_tier)}
    ${b.custom_notes ? row('Notes', b.custom_notes) : ''}
  </table>`
}

export async function sendBookingEmails(b) {
  const t = getTransporter()
  if (!t) return { sent: false, reason: 'SMTP not configured' }

  const from = process.env.MAIL_FROM || process.env.SMTP_USER
  const admin = process.env.ADMIN_EMAIL || 'sa.hyderabadcaterers@gmail.com'

  const clientHtml = shell(
    `Thank you, ${b.customer_name}!`,
    `<p style="color:#3d4a44;font-size:15px;line-height:1.6;">
       We've received your catering request and our team is reviewing the details below.
       A representative will reach out shortly to confirm your booking and craft a tailored quote.
     </p>
     ${detailTable(b)}
     <p style="color:#3d4a44;font-size:15px;line-height:1.6;">
       Need to chat sooner? Message us on WhatsApp at +91 63036 44615.
     </p>
     <p style="color:#6b7c74;font-size:13px;">Status: <strong style="color:${GOLD};">Under Review</strong></p>`,
  )

  const adminHtml = shell(
    'New Booking Request',
    `<p style="color:#3d4a44;font-size:15px;line-height:1.6;">A new catering booking has arrived.</p>
     ${detailTable(b)}
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
       ${row('Client', b.customer_name)}
       ${row('Phone', b.phone)}
       ${row('Email', b.email)}
     </table>`,
  )

  const results = await Promise.allSettled([
    t.sendMail({
      from, to: b.email,
      subject: 'Your The Madhu\'s Kitchen booking request is under review',
      html: clientHtml,
    }),
    t.sendMail({
      from, to: admin,
      subject: `New Booking · ${b.event_type} · ${b.guest_count} guests`,
      html: adminHtml,
    }),
  ])
  return { sent: results.every((r) => r.status === 'fulfilled'), results }
}

export async function sendContactEmails(c) {
  const t = getTransporter()
  if (!t) return { sent: false, reason: 'SMTP not configured' }

  const from = process.env.MAIL_FROM || process.env.SMTP_USER
  const admin = process.env.ADMIN_EMAIL || 'sa.hyderabadcaterers@gmail.com'

  const clientHtml = shell(
    `Thank you for reaching out, ${c.name}!`,
    `<p style="color:#3d4a44;font-size:15px;line-height:1.6;">
       We've received your message and our team will get back to you very soon.
     </p>
     <blockquote style="margin:12px 0;padding:12px 16px;background:#f9f9f9;border-left:3px solid ${GOLD};color:#3d4a44;font-style:italic;">
       ${c.message}
     </blockquote>`,
  )

  const adminHtml = shell(
    'New Contact Enquiry',
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
       ${row('Name', c.name)}
       ${row('Email', c.email)}
       ${row('Phone', c.phone || '—')}
     </table>
     <blockquote style="margin:12px 0;padding:12px 16px;background:#f9f9f9;border-left:3px solid ${GOLD};color:#3d4a44;">
       ${c.message}
     </blockquote>`,
  )

  const results = await Promise.allSettled([
    t.sendMail({ from, to: c.email, subject: "We received your message · The Madhu's Kitchen", html: clientHtml }),
    t.sendMail({ from, to: admin, subject: `New Enquiry from ${c.name}`, html: adminHtml }),
  ])
  return { sent: results.every((r) => r.status === 'fulfilled'), results }
}
