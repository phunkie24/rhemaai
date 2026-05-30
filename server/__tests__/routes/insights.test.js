import { describe, it, expect, beforeAll, beforeEach } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import Insight from '../../models/Insight.js'
import { setupTestDB } from '../helpers/db.js'
import { validInsight, unpublishedInsight } from '../helpers/fixtures.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
})

const publishedInsight2 = {
  title: 'Second Published Insight',
  slug: 'second-published-insight',
  excerpt: 'Another published insight for testing pagination and filtering.',
  content: 'Full content of the second insight article here.',
  category: 'data-engineering',
  readTime: 7,
  published: true,
  publishedAt: new Date('2026-02-01'),
}

describe('GET /api/insights', () => {
  it('returns empty list when no insights exist', async () => {
    const res = await request(app).get('/api/insights')
    expect(res.status).toBe(200)
    expect(res.body.insights).toHaveLength(0)
    expect(res.body.total).toBe(0)
  })

  it('returns only published insights', async () => {
    await Insight.create(validInsight)
    await Insight.create(unpublishedInsight)
    const res = await request(app).get('/api/insights')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.insights[0].slug).toBe(validInsight.slug)
  })

  it('does not include content field in list', async () => {
    await Insight.create(validInsight)
    const res = await request(app).get('/api/insights')
    expect(res.body.insights[0].content).toBeUndefined()
  })

  it('filters by category', async () => {
    await Insight.create(validInsight)
    await Insight.create(publishedInsight2)
    const res = await request(app).get('/api/insights?category=data-engineering')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.insights[0].category).toBe('data-engineering')
  })

  it('returns all when category=all', async () => {
    await Insight.create(validInsight)
    await Insight.create(publishedInsight2)
    const res = await request(app).get('/api/insights?category=all')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(2)
  })

  it('paginates results correctly', async () => {
    for (let i = 0; i < 5; i++) {
      await Insight.create({
        ...validInsight,
        title: `Insight ${i}`,
        slug: `insight-${i}`,
      })
    }
    const res = await request(app).get('/api/insights?page=1&limit=2')
    expect(res.status).toBe(200)
    expect(res.body.insights).toHaveLength(2)
    expect(res.body.pages).toBe(3)
    expect(res.body.page).toBe(1)
  })

  it('returns insights sorted by publishedAt descending', async () => {
    await Insight.create({ ...validInsight, publishedAt: new Date('2026-01-01') })
    await Insight.create({
      ...publishedInsight2,
      publishedAt: new Date('2026-03-01'),
    })
    const res = await request(app).get('/api/insights')
    expect(res.body.insights[0].slug).toBe(publishedInsight2.slug)
  })
})

describe('GET /api/insights/:slug', () => {
  it('returns a published insight by slug', async () => {
    await Insight.create(validInsight)
    const res = await request(app).get(`/api/insights/${validInsight.slug}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(validInsight.title)
    expect(res.body.content).toBeDefined()
  })

  it('returns 404 for unknown slug', async () => {
    const res = await request(app).get('/api/insights/does-not-exist')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Insight not found')
  })

  it('returns 404 for unpublished insight', async () => {
    await Insight.create(unpublishedInsight)
    const res = await request(app).get(`/api/insights/${unpublishedInsight.slug}`)
    expect(res.status).toBe(404)
  })

  it('includes full content in single-article response', async () => {
    await Insight.create(validInsight)
    const res = await request(app).get(`/api/insights/${validInsight.slug}`)
    expect(res.body.content).toBeTruthy()
  })
})
