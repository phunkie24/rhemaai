import { beforeEach, afterEach, describe, expect, it, jest } from '@jest/globals'
import { setupTestDB } from '../helpers/db.js'
import { validContact } from '../helpers/fixtures.js'

const sendMail = jest.fn().mockResolvedValue({ messageId: 'test-only' })
jest.unstable_mockModule('nodemailer', () => ({
  default: { createTransport: jest.fn(() => ({ sendMail })) },
}))
const { default: request } = await import('supertest')
const { default: app } = await import('../../app.js')
const { default: Contact } = await import('../../models/Contact.js')
const { default: NexusEnquiry } = await import('../../models/NexusEnquiry.js')
const { Subscriber } = await import('../../models/Subscriber.js')
const { default: FormGuardBucket } = await import('../../models/FormGuardBucket.js')
const { consumeFormQuota } = await import('../../utils/formGuard.js')
const { assessmentDimensions } = await import('../../config/assessmentDimensions.js')

setupTestDB()
beforeEach(() => {
  sendMail.mockClear()
  process.env.EMAIL_USER = 'owner@example.com'
  process.env.EMAIL_PASS = 'mock-only-no-smtp-connection'
  process.env.NOTIFY_EMAIL = 'owner@example.com'
  delete process.env.FORM_BLOCKED_SENDERS
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  jest.restoreAllMocks()
  delete process.env.EMAIL_USER
  delete process.env.EMAIL_PASS
  delete process.env.NOTIFY_EMAIL
  delete process.env.FORM_BLOCKED_SENDERS
})

const demo = {
  fullName: 'Amina Bello', workEmail: 'amina@example.com', company: 'Example Energy',
  primaryUseCase: 'Coordinate governed maintenance investigation and approval workflows.', consent: true,
}
const assessment = {
  workEmail: 'assessment@example.com', assessmentScore: 75, assessmentBand: 'Scale Ready', consent: true,
  dimensionScores: Object.entries(assessmentDimensions).map(([slug, name]) => ({ slug, name, score: 75 })),
}

describe('Website form safeguards (real database, mocked SMTP)', () => {
  it.each(['/api/contact', '/api/nexus/demo', '/api/nexus/assessment', '/api/newsletter'])('discards honeypot bots at %s without saving or sending email', async (path) => {
    const response = await request(app).post(path).send({ website: 'https://bot.example' })
    expect(response.status).toBe(201)
    expect(await Contact.countDocuments()).toBe(0)
    expect(await NexusEnquiry.countDocuments()).toBe(0)
    expect(await Subscriber.countDocuments()).toBe(0)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it.each([
    'You have won a prize. Transfer the claim fee to receive your funds.',
    'Please share your password so our team can help with your project.',
    'Your mailbox will be suspended. Visit https://bad.example.com/login to verify your account.',
    'See https://one.example.com and https://two.example.com and https://three.example.com for details.',
    'Please download https://example.com/install.exe for our full project requirements.',
    'Our project brief is <a href="https://example.com">available here</a>.',
    'Please review https://trusted.example@evil.example/ for the requirements.',
  ])('rejects suspicious content before saving or emailing: %s', async (message) => {
    const response = await request(app).post('/api/contact').send({ ...validContact, message })
    expect(response.status).toBe(422)
    expect(await Contact.countDocuments()).toBe(0)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it.each(['Visit bad.example.com', 'Amina\r\nBcc: victim@example.com'])('rejects links or control characters in names: %s', async (name) => {
    const response = await request(app).post('/api/contact').send({ ...validContact, name })
    expect(response.status).toBe(422)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('accepts a legitimate FinTech/security brief with two reference links and no honeypot field', async () => {
    const response = await request(app).post('/api/contact').send({
      ...validContact, name: 'Customer Example', service: 'fintech-blockchain',
      message: 'We need blockchain analytics, private key management and phishing detection. References: https://example.com/brief and https://example.org/spec.',
    })
    expect(response.status).toBe(201)
    expect(sendMail).toHaveBeenCalledTimes(2)
    const messages = sendMail.mock.calls.map(([message]) => message)
    const owner = messages.find((message) => message.to === 'owner@example.com')
    expect(owner.replyTo).toBe(validContact.email)
    expect(owner.html).toContain('have not been verified')
    const reply = messages.find((message) => message.to === validContact.email)
    expect(reply.subject + reply.html).not.toContain('Customer Example')
    expect(reply.headers['Auto-Submitted']).toBe('auto-replied')
  })

  it('prevents simultaneous duplicate submissions from sending duplicate notifications', async () => {
    const responses = await Promise.all(Array.from({ length: 3 }, () => request(app).post('/api/contact').send(validContact)))
    expect(responses.filter((response) => response.status === 201)).toHaveLength(1)
    expect(responses.filter((response) => response.status === 429)).toHaveLength(2)
    expect(await Contact.countDocuments()).toBe(1)
    expect(sendMail).toHaveBeenCalledTimes(2)
  })

  it('groups sender aliases across changing IP addresses and limits automatic replies', async () => {
    const emails = ['first.last@gmail.com', 'firstlast+one@gmail.com', 'f.i.r.s.t.l.a.s.t@googlemail.com', 'firstlast+two@gmail.com']
    const responses = []
    for (const [index, email] of emails.entries()) {
      responses.push(await request(app).post('/api/contact').set('X-Forwarded-For', `198.51.100.${index + 1}`).send({
        ...validContact, email, message: `${validContact.message} Project number ${index}.`,
      }))
    }
    expect(responses.map((response) => response.status)).toEqual([201, 201, 201, 429])
    expect(sendMail.mock.calls.filter(([message]) => emails.includes(message.to))).toHaveLength(1)
    expect(sendMail.mock.calls.filter(([message]) => message.to === 'owner@example.com')).toHaveLength(3)
  })

  it('shares IP limits across different forms and email addresses', async () => {
    for (let index = 0; index < 5; index++) {
      const response = await request(app).post('/api/newsletter').send({ email: `person${index}@example.com` })
      expect(response.status).toBe(201)
    }
    const response = await request(app).post('/api/contact').send(validContact)
    expect(response.status).toBe(429)
    expect(response.headers['retry-after']).toBe('3600')
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('groups rotating IPv6 addresses within the same /64', async () => {
    for (let index = 1; index <= 6; index++) {
      const response = await request(app).post('/api/newsletter')
        .set('X-Forwarded-For', `2001:db8:abcd:1::${index}`).send({ email: `person${index}@example.com` })
      expect(response.status).toBe(index <= 5 ? 201 : 429)
    }
  })

  it('uses sliding windows and permits retry after expiry even before TTL cleanup', async () => {
    const hour = 3600000
    const start = Date.now()
    expect(await consumeFormQuota('test', 'key', 2, hour, new Date(start))).toBeTruthy()
    expect(await consumeFormQuota('test', 'key', 2, hour, new Date(start + hour - 1000))).toBeTruthy()
    expect(await consumeFormQuota('test', 'key', 2, hour, new Date(start + hour + 1))).toBeTruthy()
    expect(await consumeFormQuota('test', 'key', 2, hour, new Date(start + hour + 2))).toBeNull()
    expect(await consumeFormQuota('test', 'key', 2, hour, new Date(start + 3 * hour))).toBeTruthy()
  })

  it('enforces quotas atomically during concurrent requests', async () => {
    const claims = await Promise.all(Array.from({ length: 12 }, () => consumeFormQuota('race', 'same-key', 3, 3600000)))
    expect(claims.filter(Boolean)).toHaveLength(3)
  })

  it('blocks configured sender domains including subdomains', async () => {
    process.env.FORM_BLOCKED_SENDERS = 'unwanted.example.com'
    const response = await request(app).post('/api/contact').send({ ...validContact, email: 'sender@sub.unwanted.example.com' })
    expect(response.status).toBe(422)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('applies content checks to Nexus demo submissions too', async () => {
    const response = await request(app).post('/api/nexus/demo').send({ ...demo, additionalContext: 'Please provide your OTP to continue.' })
    expect(response.status).toBe(422)
    expect(await NexusEnquiry.countDocuments()).toBe(0)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('keeps Gmail demo requests as unverified enquiries and ignores attempted access grants', async () => {
    const response = await request(app).post('/api/nexus/demo').send({
      ...demo, workEmail: 'prospective.customer@gmail.com',
      status: 'replied', role: 'admin', accessGranted: true,
    })
    expect(response.status).toBe(201)
    const saved = await NexusEnquiry.findById(response.body.id).lean()
    expect(saved.status).toBe('new')
    expect(saved.accessGranted).toBeUndefined()
    expect(saved.role).toBeUndefined()
    expect(response.body.token).toBeUndefined()
    const owner = sendMail.mock.calls.find(([message]) => message.to === 'owner@example.com')[0]
    expect(owner.html).toContain('This enquiry has not granted app access')
  })

  it('can block one Gmail sender while accepting other Gmail customers', async () => {
    process.env.FORM_BLOCKED_SENDERS = 'unwanted.sender@gmail.com'
    expect((await request(app).post('/api/contact').send({ ...validContact, email: 'unwanted.sender@gmail.com' })).status).toBe(422)
    expect(sendMail).not.toHaveBeenCalled()
    expect((await request(app).post('/api/contact').send({ ...validContact, email: 'prospective.customer@gmail.com' })).status).toBe(201)
  })

  it('uses server-owned assessment labels instead of reflecting visitor-supplied content', async () => {
    const response = await request(app).post('/api/nexus/assessment').send({
      ...assessment,
      dimensionScores: assessment.dimensionScores.map((dimension) => ({ ...dimension, name: 'Go to https://evil.example.com to pay' })),
    })
    expect(response.status).toBe(201)
    expect(sendMail).toHaveBeenCalledTimes(1)
    expect(sendMail.mock.calls[0][0].html).not.toContain('evil.example')
    expect(sendMail.mock.calls[0][0].html).toContain('Business strategy')
  })

  it('rejects invented and duplicate assessment dimensions', async () => {
    for (const slug of ['fake-dimension', assessment.dimensionScores[1].slug]) {
      const dimensionScores = assessment.dimensionScores.map((dimension, index) => index ? dimension : { ...dimension, slug })
      const response = await request(app).post('/api/nexus/assessment').send({ ...assessment, dimensionScores })
      expect(response.status).toBe(400)
    }
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('reports the email cooldown instead of falsely acknowledging a suppressed assessment email', async () => {
    await request(app).post('/api/nexus/demo').send({ ...demo, workEmail: assessment.workEmail })
    const response = await request(app).post('/api/nexus/assessment').send(assessment)
    expect(response.status).toBe(429)
    expect(await NexusEnquiry.countDocuments({ kind: 'assessment' })).toBe(0)
    expect(sendMail).toHaveBeenCalledTimes(2)
  })

  it('fails closed if the guard database is unavailable', async () => {
    jest.spyOn(FormGuardBucket, 'updateOne').mockRejectedValueOnce(new Error('Database unavailable'))
    const response = await request(app).post('/api/contact').send(validContact)
    expect(response.status).toBe(500)
    expect(await Contact.countDocuments()).toBe(0)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('releases a duplicate reservation when saving fails so the enquiry can be retried', async () => {
    jest.spyOn(Contact, 'create').mockRejectedValueOnce(new Error('Temporary write failure'))
    expect((await request(app).post('/api/contact').send(validContact)).status).toBe(500)
    expect(sendMail).not.toHaveBeenCalled()
    expect((await request(app).post('/api/contact').send(validContact)).status).toBe(201)
    expect(await Contact.countDocuments()).toBe(1)
  })

  it('does not trust forwarded client IP headers from public direct connections', () => {
    const trust = app.get('trust proxy fn')
    expect(trust('198.51.100.1')).toBe(false)
    expect(trust('127.0.0.1')).toBe(true)
  })
})
