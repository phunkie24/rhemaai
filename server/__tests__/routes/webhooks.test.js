import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals'
import crypto from 'crypto'
import { setupTestDB } from '../helpers/db.js'

// ── Mock nodemailer before any module that imports it is loaded ──────────────
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-msg-id' })

jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
  },
}))

// Dynamic imports AFTER mock is registered
const { default: request }     = await import('supertest')
const { default: app }         = await import('../../app.js')
const { default: Publication } = await import('../../models/Publication.js')
const { default: Course }      = await import('../../models/Course.js')
const { default: Product }     = await import('../../models/Product.js')

setupTestDB()

const TEST_SECRET = 'test_paystack_secret_key_for_unit_tests_only'
const ENDPOINT    = '/api/webhooks/paystack'

function sign(body, secret = TEST_SECRET) {
  return crypto.createHmac('sha512', secret).update(body).digest('hex')
}

// Build a JSON string for a Paystack charge.success event
function chargeEvent({ identifier = 'rhemaai-test-item', amount = 1500000, currency = 'NGN', email = 'buyer@test.com' } = {}) {
  return JSON.stringify({
    event: 'charge.success',
    data: {
      reference: 'REF-TEST-001',
      amount,
      currency,
      customer: { email, first_name: 'Ada', last_name: 'Okonkwo' },
      source:   { type: 'payment_page', identifier },
    },
  })
}

// NOT async — keeps the SuperTest object unwrapped so .expect() works
function send(body, signature) {
  const req = request(app)
    .post(ENDPOINT)
    .set('Content-Type', 'application/json')
    .send(body)
  if (signature !== undefined) req.set('x-paystack-signature', signature)
  return req
}

const settle = () => new Promise((r) => setTimeout(r, 100))

beforeAll(() => {
  process.env.PAYSTACK_SECRET_KEY = TEST_SECRET
  process.env.EMAIL_USER          = 'noreply@rhemaaisolutions.tech'
  process.env.NODE_ENV            = 'test'
})

beforeEach(() => mockSendMail.mockClear())

// =============================================================================
describe('POST /api/webhooks/paystack', () => {

  // ── Security: signature verification ─────────────────────────────────────
  describe('Security — signature verification', () => {
    it('returns 401 when x-paystack-signature header is absent', async () => {
      const body = chargeEvent()
      await send(body).expect(401)
      await settle()
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('returns 401 when signature does not match body', async () => {
      const body = chargeEvent()
      await send(body, 'deadbeef'.repeat(16)).expect(401)
      await settle()
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('returns 401 when body is tampered after signing', async () => {
      const original  = chargeEvent()
      const signature = sign(original)
      const tampered  = original.replace('charge.success', 'charge.failed')
      await send(tampered, signature).expect(401)
      await settle()
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('returns 401 when signature uses the wrong secret', async () => {
      const body = chargeEvent()
      await send(body, sign(body, 'attacker_secret')).expect(401)
    })

    it('returns 200 when signature is correct', async () => {
      const body = chargeEvent()
      await send(body, sign(body)).expect(200)
    })
  })

  // ── Event routing ─────────────────────────────────────────────────────────
  describe('Event routing', () => {
    it('acknowledges non-charge.success events (200) without sending email', async () => {
      const body = JSON.stringify({ event: 'transfer.success', data: {} })
      await send(body, sign(body)).expect(200)
      await settle()
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('skips email when customer email is missing from payload', async () => {
      const body = JSON.stringify({
        event: 'charge.success',
        data: {
          reference: 'R1', amount: 100, currency: 'NGN',
          customer: { first_name: 'Ghost' },
          source:   { type: 'payment_page', identifier: 'some-slug' },
        },
      })
      await send(body, sign(body)).expect(200)
      await settle()
      expect(mockSendMail).not.toHaveBeenCalled()
    })
  })

  // ── Item matching: publications ───────────────────────────────────────────
  describe('Item matching — publications', () => {
    it('sends buyer access email containing document URL', async () => {
      await Publication.create({
        title: 'Enterprise Agentic AI Playbook', slug: 'enterprise-agentic-ai-playbook',
        type: 'book', summary: 'Comprehensive enterprise AI patterns.',
        published: true, publishedAt: new Date(),
        documentUrl: 'https://cdn.rhemaai.com/playbook.pdf',
        price: { amountNGN: 12000, paystackUrl: 'https://paystack.shop/pay/rhemaai-agentic-ai-playbook' },
      })

      const body = chargeEvent({ identifier: 'rhemaai-agentic-ai-playbook' })
      await send(body, sign(body)).expect(200)
      await settle()

      expect(mockSendMail).toHaveBeenCalledTimes(2)
      const [buyerCall, ownerCall] = mockSendMail.mock.calls
      expect(buyerCall[0].to).toBe('buyer@test.com')
      expect(buyerCall[0].subject).toContain('Enterprise Agentic AI Playbook')
      expect(buyerCall[0].html).toContain('cdn.rhemaai.com/playbook.pdf')
      expect(ownerCall[0].to).toBe('noreply@rhemaaisolutions.tech')
    })
  })

  // ── Item matching: courses ────────────────────────────────────────────────
  describe('Item matching — courses', () => {
    it('sends buyer access email containing the course YouTube URL', async () => {
      await Course.create({
        title: 'Agentic AI Masterclass', slug: 'agentic-ai-masterclass',
        category: 'agentic-ai', youtubeUrl: 'https://www.youtube.com/playlist?list=PLrhemaai123',
        youtubeId: 'PLrhemaai123', published: true, publishedAt: new Date(),
        pricing: { isFree: false, amountNGN: 25000, amount: 49, paymentUrl: 'https://paystack.shop/pay/rhemaai-agentic-ai-masterclass' },
      })

      const body = chargeEvent({ identifier: 'rhemaai-agentic-ai-masterclass' })
      await send(body, sign(body)).expect(200)
      await settle()

      expect(mockSendMail).toHaveBeenCalledTimes(2)
      const [buyerCall] = mockSendMail.mock.calls
      expect(buyerCall[0].to).toBe('buyer@test.com')
      expect(buyerCall[0].subject).toContain('Agentic AI Masterclass')
      expect(buyerCall[0].html).toContain('PLrhemaai123')
    })
  })

  // ── Item matching: products ───────────────────────────────────────────────
  describe('Item matching — products', () => {
    it('sends buyer access email containing the product asset URL', async () => {
      await Product.create({
        name: 'Enterprise AI Control Room', slug: 'enterprise-ai-control-room',
        summary: 'Govern AI agents at scale.',
        published: true, publishedAt: new Date(),
        assetUrl: 'https://cdn.rhemaai.com/control-room.zip',
        pricing: { amountNGN: 150000, amount: 299, paystackUrl: 'https://paystack.shop/pay/rhemaai-ai-control-room' },
      })

      const body = chargeEvent({ identifier: 'rhemaai-ai-control-room' })
      await send(body, sign(body)).expect(200)
      await settle()

      expect(mockSendMail).toHaveBeenCalledTimes(2)
      const [buyerCall] = mockSendMail.mock.calls
      expect(buyerCall[0].subject).toContain('Enterprise AI Control Room')
      expect(buyerCall[0].html).toContain('control-room.zip')
    })
  })

  // ── Unmatched slug ────────────────────────────────────────────────────────
  describe('Unmatched slug', () => {
    it('sends generic payment confirmation when slug matches no DB item', async () => {
      const body = chargeEvent({ identifier: 'unknown-slug-xyz' })
      await send(body, sign(body)).expect(200)
      await settle()

      expect(mockSendMail).toHaveBeenCalledTimes(2)
      const [buyerCall] = mockSendMail.mock.calls
      expect(buyerCall[0].to).toBe('buyer@test.com')
      expect(buyerCall[0].subject).toContain('Payment Confirmed')
    })
  })

  // ── Amount formatting ─────────────────────────────────────────────────────
  describe('Amount formatting', () => {
    it('formats NGN amounts with ₦ sign in owner notification subject', async () => {
      const body = chargeEvent({ amount: 2500000, currency: 'NGN' })
      await send(body, sign(body)).expect(200)
      await settle()

      const [, ownerCall] = mockSendMail.mock.calls
      expect(ownerCall[0].subject).toContain('₦25,000')
    })

    it('formats USD amounts with $ sign in owner notification subject', async () => {
      const body = chargeEvent({ amount: 4999, currency: 'USD' })
      await send(body, sign(body)).expect(200)
      await settle()

      const [, ownerCall] = mockSendMail.mock.calls
      expect(ownerCall[0].subject).toContain('$49.99')
    })
  })

  // ── Security: ReDoS resistance ────────────────────────────────────────────
  describe('Security — ReDoS resistance', () => {
    it('handles slug with regex metacharacters without crashing or hanging', async () => {
      const body = chargeEvent({ identifier: 'slug.with+special*chars(here)' })
      await send(body, sign(body)).expect(200)
      await settle()
      // Must send generic email — not crash or stall
      expect(mockSendMail).toHaveBeenCalledTimes(2)
    })
  })
})
