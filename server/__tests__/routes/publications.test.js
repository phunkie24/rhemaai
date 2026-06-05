import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import Publication from '../../models/Publication.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
})

const validPublication = {
  title: 'Enterprise AI White Paper',
  slug: 'enterprise-ai-white-paper',
  type: 'whitepaper',
  summary: 'A practical white paper about AI operating models for enterprise teams.',
  body: 'Full white paper body with implementation notes and governance guidance.',
  tags: ['AI', 'White Paper'],
  price: {
    amount: 0,
    currency: 'USD',
    label: 'Open access',
  },
  published: true,
  publishedAt: new Date('2026-05-01'),
  seo: {
    metaTitle: 'Enterprise AI White Paper',
    metaDescription: 'White paper metadata for testing the publication SEO workflow.',
    keywords: ['enterprise AI', 'white paper', 'governance'],
  },
}

const draftBook = {
  title: 'Draft AI Book',
  slug: 'draft-ai-book',
  type: 'book',
  summary: 'A draft book that should not be visible on public publication routes.',
  body: 'Draft book body.',
  published: false,
}

describe('GET /api/publications', () => {
  it('returns only published publications', async () => {
    await Publication.create(validPublication)
    await Publication.create(draftBook)

    const res = await request(app).get('/api/publications')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.publications[0].slug).toBe(validPublication.slug)
  })

  it('does not include body content in public lists', async () => {
    await Publication.create(validPublication)

    const res = await request(app).get('/api/publications')

    expect(res.body.publications[0].body).toBeUndefined()
  })

  it('filters by publication type', async () => {
    await Publication.create(validPublication)
    await Publication.create({
      ...validPublication,
      title: 'Published AI Book',
      slug: 'published-ai-book',
      type: 'book',
    })

    const res = await request(app).get('/api/publications?type=book')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.publications[0].type).toBe('book')
  })
})

describe('GET /api/publications/:slug', () => {
  it('returns a published publication with body content', async () => {
    await Publication.create(validPublication)

    const res = await request(app).get(`/api/publications/${validPublication.slug}`)

    expect(res.status).toBe(200)
    expect(res.body.body).toBe(validPublication.body)
  })

  it('returns 404 for unpublished publications', async () => {
    await Publication.create(draftBook)

    const res = await request(app).get(`/api/publications/${draftBook.slug}`)

    expect(res.status).toBe(404)
  })
})

describe('Admin publication operations', () => {
  it('creates a publication with Kindle pricing and SEO metadata', async () => {
    const res = await request(app)
      .post('/api/admin/publications')
      .send({
        title: 'AI Platform Book',
        type: 'book',
        summary: 'A paid book about enterprise AI platform delivery.',
        body: 'Book content preview.',
        tags: ['book', 'platform'],
        price: {
          amount: 79,
          currency: 'USD',
          label: 'Digital book',
          kindleUrl: 'https://www.amazon.com/dp/B0TESTBOOK',
        },
        published: true,
        seo: {
          metaTitle: 'AI Platform Book',
          metaDescription: 'A paid book for enterprise AI platform teams.',
          keywords: ['AI platform', 'book', 'enterprise AI'],
        },
      })

    expect(res.status).toBe(201)
    expect(res.body.publication.slug).toBe('ai-platform-book')
    expect(res.body.publication.price.amount).toBe(79)
    expect(res.body.publication.price.kindleUrl).toBe('https://www.amazon.com/dp/B0TESTBOOK')
    expect(res.body.publication.seo.keywords).toContain('AI platform')
  })

  it('updates publication pricing and publish status', async () => {
    const publication = await Publication.create(draftBook)

    const res = await request(app)
      .put(`/api/admin/publications/${publication._id}`)
      .send({
        ...draftBook,
        price: {
          amount: 29,
          currency: 'USD',
          label: 'Launch price',
        },
        published: true,
      })

    expect(res.status).toBe(200)
    expect(res.body.publication.published).toBe(true)
    expect(res.body.publication.price.label).toBe('Launch price')
  })
})
