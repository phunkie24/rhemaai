import { beforeAll, describe, expect, it } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import NexusEnquiry from '../../models/NexusEnquiry.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
  delete process.env.EMAIL_USER
  delete process.env.EMAIL_PASS
  delete process.env.NOTIFY_EMAIL
})

const validDemo = {
  fullName: 'Amina Bello',
  workEmail: 'amina@example.com',
  company: 'Example Energy',
  primaryUseCase: 'Coordinate governed maintenance investigation and approval workflows.',
  interest: 'standard-pilot',
  indicativeBudget: 'not-defined',
  consent: true,
}

const dimensionScores = [
  'strategy',
  'process',
  'data',
  'integration',
  'ai-maturity',
  'security',
  'governance',
  'human-oversight',
  'observability',
  'infrastructure',
  'operating-model',
  'change-capability',
].map((slug, index) => ({ slug, name: `Dimension ${index + 1}`, score: 75 }))

describe('POST /api/nexus/demo', () => {
  it('stores a valid pricing-qualified request without budget gating', async () => {
    const response = await request(app).post('/api/nexus/demo').send(validDemo)

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    const saved = await NexusEnquiry.findById(response.body.id)
    expect(saved.kind).toBe('demo')
    expect(saved.interest).toBe('standard-pilot')
    expect(saved.indicativeBudget).toBe('not-defined')
  })

  it('rejects missing consent and invalid interests', async () => {
    const response = await request(app)
      .post('/api/nexus/demo')
      .send({ ...validDemo, consent: false, interest: 'free-pilot' })

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThanOrEqual(2)
  })

  it('acknowledges honeypot submissions without persistence', async () => {
    const response = await request(app)
      .post('/api/nexus/demo')
      .send({ ...validDemo, website: 'https://spam.example' })

    expect(response.status).toBe(201)
    expect(await NexusEnquiry.countDocuments()).toBe(0)
  })
})

describe('POST /api/nexus/assessment', () => {
  it('stores only the requested score summary and no individual answers', async () => {
    const response = await request(app).post('/api/nexus/assessment').send({
      workEmail: 'assessment@example.com',
      assessmentScore: 75,
      assessmentBand: 'Scale Ready',
      dimensionScores,
      consent: true,
      answers: { shouldNotPersist: 'sensitive detail' },
    })

    expect(response.status).toBe(201)
    const saved = await NexusEnquiry.findById(response.body.id).lean()
    expect(saved.dimensionScores).toHaveLength(12)
    expect(saved.answers).toBeUndefined()
  })

  it('rejects a malformed score summary', async () => {
    const response = await request(app).post('/api/nexus/assessment').send({
      workEmail: 'assessment@example.com',
      assessmentScore: 101,
      assessmentBand: 'Unknown',
      dimensionScores: [],
      consent: true,
    })

    expect(response.status).toBe(400)
  })
})

describe('Nexus route discovery and crawler guards', () => {
  it('publishes every Nexus domain and documentation route in the sitemap', async () => {
    const response = await request(app).get('/api/sitemap.xml')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/xml/)
    for (const slug of ['energy', 'finance', 'smart-city', 'healthcare', 'cybersecurity', 'agriculture']) {
      expect(response.text).toContain(`/products/nexus-aos/solutions/${slug}`)
    }
    for (const slug of ['getting-started', 'architecture', 'governance', 'security', 'api']) {
      expect(response.text).toContain(`/products/nexus-aos/docs/${slug}`)
    }
    expect(response.text).toContain('/products/nexus-aos/pricing')
  })

  it('returns crawler-safe 404 metadata for unknown domain and documentation slugs', async () => {
    const [domain, docs] = await Promise.all([
      request(app).get('/products/nexus-aos/solutions/not-a-domain'),
      request(app).get('/products/nexus-aos/docs/not-a-section'),
    ])

    expect(domain.status).toBe(404)
    expect(docs.status).toBe(404)
    expect(domain.text).toContain('noindex, nofollow')
    expect(docs.text).toContain('noindex, nofollow')
  })
})
