import crypto from 'crypto'
import express from 'express'
import Publication from '../models/Publication.js'
import Course from '../models/Course.js'
import Product from '../models/Product.js'
import { sendAccessEmail, sendOwnerNotification } from '../utils/mailer.js'

const router = express.Router()

// Escape all regex metacharacters to prevent ReDoS
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractSlug(url) {
  if (!url) return null
  return url.split('/').pop().split('?')[0].trim()
}

async function findPurchasedItem(paystackSlug) {
  if (!paystackSlug) return { item: null, itemType: null }

  // Anchor to end of URL string — safe escaped regex, no ReDoS risk
  const slugRegex = new RegExp(escapeRegex(paystackSlug) + '$', 'i')

  const publication = await Publication.findOne({ 'price.paystackUrl': slugRegex })
  if (publication) return { item: publication, itemType: 'publication' }

  const course = await Course.findOne({ 'pricing.paymentUrl': slugRegex })
  if (course) return { item: course, itemType: 'course' }

  const product = await Product.findOne({ 'pricing.paystackUrl': slugRegex })
  if (product) return { item: product, itemType: 'product' }

  return { item: null, itemType: null }
}

// Paystack sends application/json — use express.raw() to preserve the raw body
// for HMAC signature verification. This route must be registered BEFORE express.json().
router.post('/paystack', express.raw({ type: 'application/json', limit: '1mb' }), async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature']
    const secret    = process.env.PAYSTACK_SECRET_KEY

    if (!secret) {
      console.error('[webhook] PAYSTACK_SECRET_KEY is not set')
      return res.sendStatus(500)
    }

    if (!signature) {
      return res.sendStatus(401)
    }

    // Timing-safe HMAC comparison — prevents signature oracle timing attacks
    const hash       = crypto.createHmac('sha512', secret).update(req.body).digest('hex')
    const hashBuf    = Buffer.from(hash, 'hex')
    const sigBuf     = Buffer.from(signature, 'hex')
    const sigValid   = hashBuf.length === sigBuf.length && crypto.timingSafeEqual(hashBuf, sigBuf)

    if (!sigValid) {
      console.warn('[webhook] Invalid Paystack signature — request rejected')
      return res.sendStatus(401)
    }

    const event = JSON.parse(req.body.toString())

    // Acknowledge immediately — Paystack requires a 200 within 5 seconds
    res.sendStatus(200)

    if (event.event !== 'charge.success') return

    const { customer, source, amount, currency, reference } = event.data
    const buyerEmail = customer?.email
    const buyerName  = [customer?.first_name, customer?.last_name].filter(Boolean).join(' ') || 'Valued Customer'

    if (!buyerEmail) {
      console.warn('[webhook] charge.success with no customer email — skipping')
      return
    }

    const paystackSlug = source?.identifier || extractSlug(source?.url)
    const { item, itemType } = await findPurchasedItem(paystackSlug)

    if (!item) {
      console.warn(`[webhook] No item matched slug "${paystackSlug}" — sending generic confirmation`)
    }

    await Promise.all([
      sendAccessEmail({ buyerEmail, buyerName, item, itemType, amount, currency, reference }),
      sendOwnerNotification({ buyerEmail, buyerName, item, itemType, amount, currency, reference }),
    ])

    console.log(`[webhook] Emails sent to ${buyerEmail} for "${item?.title || item?.name || paystackSlug}"`)
  } catch (err) {
    console.error('[webhook] Error processing Paystack event:', err.message)
  }
})

export default router
