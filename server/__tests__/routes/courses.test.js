import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import Course from '../../models/Course.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
})

const validCourse = {
  title: 'Building Agentic AI Systems',
  slug: 'building-agentic-ai-systems',
  description: 'A practitioner course on agentic AI orchestration patterns and production deployment.',
  category: 'agentic-ai',
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  instructor: 'RhemaAI Technologies',
  duration: '2h 30m',
  level: 'advanced',
  tags: ['agentic-ai', 'LangChain', 'production'],
  pricing: { isFree: true, amount: 0, currency: 'USD', label: 'Free' },
  featured: true,
  published: true,
}

const draftCourse = {
  title: 'Draft Data Engineering Course',
  slug: 'draft-data-engineering-course',
  description: 'A draft course not yet visible to the public.',
  category: 'data-engineering',
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  level: 'beginner',
  published: false,
}

describe('GET /api/courses', () => {
  it('returns only published courses', async () => {
    await Course.create(validCourse)
    await Course.create(draftCourse)

    const res = await request(app).get('/api/courses')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.courses[0].slug).toBe('building-agentic-ai-systems')
  })

  it('returns pagination metadata', async () => {
    await Course.create(validCourse)

    const res = await request(app).get('/api/courses')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('page')
    expect(res.body).toHaveProperty('pages')
    expect(res.body).toHaveProperty('total')
  })

  it('filters by category', async () => {
    await Course.create(validCourse)
    await Course.create({
      ...validCourse,
      title: 'Generative AI Course',
      slug: 'generative-ai-course',
      category: 'generative-ai',
    })

    const res = await request(app).get('/api/courses?category=agentic-ai')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.courses[0].category).toBe('agentic-ai')
  })

  it('does not expose seo field in public listing', async () => {
    await Course.create({ ...validCourse, seo: { metaTitle: 'SEO title', metaDescription: 'SEO desc' } })

    const res = await request(app).get('/api/courses')

    expect(res.body.courses[0].seo).toBeUndefined()
  })

  it('returns empty list when no published courses exist', async () => {
    const res = await request(app).get('/api/courses')

    expect(res.status).toBe(200)
    expect(res.body.courses).toEqual([])
    expect(res.body.total).toBe(0)
  })
})

describe('Admin course operations', () => {
  it('creates a course with auto-extracted YouTube ID', async () => {
    const res = await request(app)
      .post('/api/admin/courses')
      .send({
        title: 'Intro to Data Engineering',
        category: 'data-engineering',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        level: 'beginner',
        published: true,
      })

    expect(res.status).toBe(201)
    expect(res.body.course.slug).toBe('intro-to-data-engineering')
    expect(res.body.course.youtubeId).toBe('dQw4w9WgXcQ')
    expect(res.body.course.thumbnail).toMatch(/img\.youtube\.com\/vi\/dQw4w9WgXcQ/)
  })

  it('creates a paid course with pricing and payment URL', async () => {
    const res = await request(app)
      .post('/api/admin/courses')
      .send({
        title: 'Advanced ML Engineering',
        category: 'machine-learning',
        youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
        level: 'advanced',
        pricing: {
          isFree: false,
          amount: 149,
          currency: 'USD',
          label: 'Full course access',
          paymentUrl: 'https://paystack.com/pay/ml-course',
        },
        published: true,
      })

    expect(res.status).toBe(201)
    expect(res.body.course.pricing.isFree).toBe(false)
    expect(res.body.course.pricing.amount).toBe(149)
    expect(res.body.course.pricing.paymentUrl).toBe('https://paystack.com/pay/ml-course')
  })

  it('rejects a course with missing required fields', async () => {
    const res = await request(app)
      .post('/api/admin/courses')
      .send({ title: 'Incomplete Course' })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Validation failed')
    expect(Array.isArray(res.body.errors)).toBe(true)
  })

  it('rejects an invalid YouTube URL', async () => {
    const res = await request(app)
      .post('/api/admin/courses')
      .send({
        title: 'Bad URL Course',
        category: 'agentic-ai',
        youtubeUrl: 'not-a-valid-url',
      })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Validation failed')
  })

  it('rejects duplicate slugs', async () => {
    await Course.create(validCourse)

    const res = await request(app)
      .post('/api/admin/courses')
      .send(validCourse)

    expect(res.status).toBe(409)
    expect(res.body.message).toMatch(/slug already exists/)
  })

  it('lists all courses including drafts in admin view', async () => {
    await Course.create(validCourse)
    await Course.create(draftCourse)

    const res = await request(app).get('/api/admin/courses')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(2)
  })

  it('updates a course and sets publishedAt when publishing', async () => {
    const created = await Course.create(draftCourse)

    const res = await request(app)
      .put(`/api/admin/courses/${created._id}`)
      .send({
        title: 'Updated Data Engineering Course',
        category: 'data-engineering',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        level: 'intermediate',
        published: true,
      })

    expect(res.status).toBe(200)
    expect(res.body.course.title).toBe('Updated Data Engineering Course')
    expect(res.body.course.published).toBe(true)
    expect(res.body.course.publishedAt).toBeTruthy()
  })

  it('returns 404 when updating a non-existent course', async () => {
    const fakeId = '507f1f77bcf86cd799439011'
    const res = await request(app)
      .put(`/api/admin/courses/${fakeId}`)
      .send({
        title: 'Ghost Course',
        category: 'agentic-ai',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        level: 'beginner',
      })

    expect(res.status).toBe(404)
  })

  it('deletes a course and confirms removal from the database', async () => {
    const created = await Course.create(validCourse)

    const res = await request(app).delete(`/api/admin/courses/${created._id}`)

    expect(res.status).toBe(200)
    expect(await Course.findById(created._id)).toBeNull()
  })

  it('returns 404 when deleting a non-existent course', async () => {
    const fakeId = '507f1f77bcf86cd799439011'
    const res = await request(app).delete(`/api/admin/courses/${fakeId}`)

    expect(res.status).toBe(404)
  })
})
