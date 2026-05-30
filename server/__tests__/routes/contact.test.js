import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import Contact from '../../models/Contact.js'
import { setupTestDB } from '../helpers/db.js'
import { validContact } from '../helpers/fixtures.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
  process.env.EMAIL_USER = 'test@test.com'
  process.env.EMAIL_PASS = 'test'
})

describe('POST /api/contact', () => {
  it('creates a contact and returns 201', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send(validContact)
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.id).toBeDefined()
    expect(res.body.message).toMatch(/24 hours/)
  })

  it('saves the contact to the database', async () => {
    await request(app).post('/api/contact').send(validContact)
    const contacts = await Contact.find({})
    expect(contacts).toHaveLength(1)
    expect(contacts[0].name).toBe(validContact.name)
    expect(contacts[0].email).toBe(validContact.email)
  })

  it('returns 400 when name is missing', async () => {
    const { name, ...rest } = validContact
    const res = await request(app).post('/api/contact').send(rest)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Validation failed')
    expect(res.body.errors).toBeInstanceOf(Array)
  })

  it('returns 400 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validContact, email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect(res.body.errors.some((e) => e.includes('email'))).toBe(true)
  })

  it('returns 400 when message is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validContact, message: 'Hi' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const { message, ...rest } = validContact
    const res = await request(app).post('/api/contact').send(rest)
    expect(res.status).toBe(400)
  })

  it('accepts a contact without company field', async () => {
    const { company, ...rest } = validContact
    const res = await request(app).post('/api/contact').send(rest)
    expect(res.status).toBe(201)
  })

  it('defaults service to "general" when omitted', async () => {
    const { service, ...rest } = validContact
    await request(app).post('/api/contact').send(rest)
    const contact = await Contact.findOne({ email: validContact.email })
    expect(contact.service).toBe('general')
  })

  it('rejects invalid service value', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validContact, service: 'invalid' })
    expect(res.status).toBe(400)
  })

  it('collects multiple validation errors at once', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ service: 'general' })
    expect(res.status).toBe(400)
    expect(res.body.errors.length).toBeGreaterThan(1)
  })
})

describe('GET /api/contact', () => {
  it('returns paginated contacts list', async () => {
    await Contact.create(validContact)
    const res = await request(app).get('/api/contact')
    expect(res.status).toBe(200)
    expect(res.body.contacts).toBeInstanceOf(Array)
    expect(res.body.total).toBe(1)
    expect(res.body.page).toBe(1)
    expect(res.body.pages).toBe(1)
  })

  it('filters by status query param', async () => {
    await Contact.create({ ...validContact, status: 'new' })
    await Contact.create({ ...validContact, email: 'other@test.com', status: 'replied' })
    const res = await request(app).get('/api/contact?status=new')
    expect(res.status).toBe(200)
    expect(res.body.contacts.every((c) => c.status === 'new')).toBe(true)
  })

  it('supports pagination', async () => {
    for (let i = 0; i < 5; i++) {
      await Contact.create({ ...validContact, email: `user${i}@test.com` })
    }
    const res = await request(app).get('/api/contact?page=1&limit=2')
    expect(res.status).toBe(200)
    expect(res.body.contacts).toHaveLength(2)
    expect(res.body.pages).toBe(3)
  })
})
