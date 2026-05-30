import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import { Subscriber } from '../../models/Subscriber.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
})

describe('POST /api/newsletter', () => {
  it('subscribes a new email and returns 201', async () => {
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'newuser@example.com' })
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toMatch(/subscribed/i)
  })

  it('persists the subscriber in the database', async () => {
    await request(app).post('/api/newsletter').send({ email: 'persist@example.com' })
    const sub = await Subscriber.findOne({ email: 'persist@example.com' })
    expect(sub).not.toBeNull()
    expect(sub.active).toBe(true)
  })

  it('returns 200 when already subscribed (active)', async () => {
    await Subscriber.create({ email: 'already@example.com' })
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'already@example.com' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/already subscribed/i)
  })

  it('reactivates an inactive subscriber and returns 200', async () => {
    await Subscriber.create({ email: 'inactive@example.com', active: false })
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'inactive@example.com' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/resubscribed/i)
    const sub = await Subscriber.findOne({ email: 'inactive@example.com' })
    expect(sub.active).toBe(true)
  })

  it('returns 400 for missing email', async () => {
    const res = await request(app).post('/api/newsletter').send({})
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/valid email/i)
  })

  it('returns 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/valid email/i)
  })

  it('is case-insensitive for email deduplication', async () => {
    await request(app).post('/api/newsletter').send({ email: 'case@example.com' })
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'CASE@EXAMPLE.COM' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/already subscribed/i)
  })
})
