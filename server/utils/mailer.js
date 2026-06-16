import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port:   Number(process.env.EMAIL_PORT || 465),
  secure: Number(process.env.EMAIL_PORT || 465) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function buildAccessBlock(item, itemType) {
  if (!item) {
    return `<p style="color:#475569;">Our team will send your access details to this email within 24 hours.</p>`
  }

  if (itemType === 'publication') {
    const url = item.documentUrl || item.price?.kindleUrl || item.price?.paymentUrl
    return url
      ? `<p>Access your publication using the link below:</p>
         <p style="margin:16px 0;">
           <a href="${url}" style="display:inline-block;padding:12px 24px;background:#0f766e;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;">
             Download / Access Now
           </a>
         </p>`
      : `<p style="color:#475569;">Our team will send your download link within 24 hours.</p>`
  }

  if (itemType === 'course') {
    const url = item.youtubeUrl || (item.youtubeId ? `https://www.youtube.com/watch?v=${item.youtubeId}` : null)
    return url
      ? `<p>Access your course using the link below:</p>
         <p style="margin:16px 0;">
           <a href="${url}" style="display:inline-block;padding:12px 24px;background:#0f766e;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;">
             Watch Course Now
           </a>
         </p>`
      : `<p style="color:#475569;">Our team will send your course access within 24 hours.</p>`
  }

  if (itemType === 'product') {
    const url = item.assetUrl || item.productUrl || item.demoUrl
    return url
      ? `<p>Access your product using the link below:</p>
         <p style="margin:16px 0;">
           <a href="${url}" style="display:inline-block;padding:12px 24px;background:#0f766e;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;">
             Access Product
           </a>
         </p>`
      : `<p style="color:#475569;">Our team will send your access details within 24 hours.</p>`
  }

  return `<p style="color:#475569;">Our team will send your access details within 24 hours.</p>`
}

function buildSubject(item, itemType) {
  if (!item) return 'Your RhemaAI Purchase — Payment Confirmed'
  if (itemType === 'publication') return `Your RhemaAI Publication — ${item.title}`
  if (itemType === 'course')      return `Your RhemaAI Course — ${item.title}`
  if (itemType === 'product')     return `Your RhemaAI Product — ${item.name}`
  return 'Your RhemaAI Purchase — Payment Confirmed'
}

function formatAmount(amount, currency) {
  const value = amount / 100
  return currency === 'NGN'
    ? `₦${value.toLocaleString('en-NG')}`
    : `$${value.toFixed(2)}`
}

export async function sendAccessEmail({ buyerEmail, buyerName, item, itemType, amount, currency, reference }) {
  const itemTitle  = item?.title || item?.name || 'Your Purchase'
  const subject    = buildSubject(item, itemType)
  const accessBlock = buildAccessBlock(item, itemType)
  const amountLabel = formatAmount(amount, currency)

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#07111f,#10233a);padding:32px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">RhemaAI Solutions Ltd</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">Enterprise AI · Data Engineering · Cloud Architecture</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#fff;padding:36px 40px;">
                <p style="margin:0 0 8px;color:#0f172a;font-size:16px;font-weight:700;">Hi ${buyerName},</p>
                <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
                  Your payment of <strong style="color:#0f172a;">${amountLabel}</strong> has been confirmed. Thank you for your purchase.
                </p>

                <!-- Item card -->
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin-bottom:28px;">
                  <p style="margin:0 0 4px;color:#0f766e;font-size:11px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;">Purchase confirmed</p>
                  <h2 style="margin:0 0 16px;color:#0f172a;font-size:18px;font-weight:900;">${itemTitle}</h2>
                  ${accessBlock}
                </div>

                <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;">
                  Payment reference: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${reference}</code>
                </p>
                <p style="margin:0;color:#94a3b8;font-size:12px;">
                  Questions? Reply to this email or write to
                  <a href="mailto:${process.env.EMAIL_USER}" style="color:#0f766e;">${process.env.EMAIL_USER}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
                <p style="margin:0;color:#94a3b8;font-size:11px;text-align:center;">
                  © ${new Date().getFullYear()} RhemaAI Solutions Ltd · Enterprise AI & Data Consulting
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `

  await transporter.sendMail({
    from:    `"RhemaAI Solutions Ltd" <${process.env.EMAIL_USER}>`,
    to:      buyerEmail,
    subject,
    html,
  })
}

export async function sendOwnerNotification({ buyerEmail, buyerName, item, itemType, amount, currency, reference }) {
  const itemTitle   = item?.title || item?.name || 'Unknown item'
  const amountLabel = formatAmount(amount, currency)

  await transporter.sendMail({
    from:    `"RhemaAI Payments" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_USER,
    subject: `New sale — ${amountLabel} — ${itemTitle}`,
    html: `
      <p><strong>New payment received</strong></p>
      <ul>
        <li>Item: ${itemTitle} (${itemType || 'unknown'})</li>
        <li>Amount: ${amountLabel}</li>
        <li>Buyer: ${buyerName} &lt;${buyerEmail}&gt;</li>
        <li>Reference: ${reference}</li>
      </ul>
    `,
  })
}
