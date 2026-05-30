import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'

describe('GET /api/health', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.service).toBe('RhemaAI Technologies API')
    expect(res.body.timestamp).toBeDefined()
  })

  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Route not found')
  })
})
