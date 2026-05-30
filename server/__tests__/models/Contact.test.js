import { describe, it, expect } from '@jest/globals'
import Contact from '../../models/Contact.js'
import { setupTestDB } from '../helpers/db.js'
import { validContact } from '../helpers/fixtures.js'

setupTestDB()

describe('Contact Model', () => {
  describe('Valid contact creation', () => {
    it('saves a contact with all required fields', async () => {
      const contact = await Contact.create(validContact)
      expect(contact._id).toBeDefined()
      expect(contact.name).toBe(validContact.name)
      expect(contact.email).toBe(validContact.email.toLowerCase())
      expect(contact.status).toBe('new')
      expect(contact.createdAt).toBeDefined()
    })

    it('defaults status to "new"', async () => {
      const contact = await Contact.create(validContact)
      expect(contact.status).toBe('new')
    })

    it('defaults budget to "not-specified" when omitted', async () => {
      const { budget, ...rest } = validContact
      const contact = await Contact.create({ ...rest, message: 'Need help with AI solutions for our business.' })
      expect(contact.budget).toBe('not-specified')
    })

    it('defaults service to "general" when omitted', async () => {
      const { service, ...rest } = validContact
      const contact = await Contact.create(rest)
      expect(contact.service).toBe('general')
    })

    it('stores company as optional', async () => {
      const { company, ...rest } = validContact
      const contact = await Contact.create(rest)
      expect(contact.company).toBeUndefined()
    })

    it('lowercases email', async () => {
      const contact = await Contact.create({ ...validContact, email: 'UPPER@EXAMPLE.COM' })
      expect(contact.email).toBe('upper@example.com')
    })
  })

  describe('Validation errors', () => {
    it('rejects missing name', async () => {
      const { name, ...rest } = validContact
      await expect(Contact.create(rest)).rejects.toThrow('Name is required')
    })

    it('rejects missing email', async () => {
      const { email, ...rest } = validContact
      await expect(Contact.create(rest)).rejects.toThrow('Email is required')
    })

    it('rejects missing message', async () => {
      const { message, ...rest } = validContact
      await expect(Contact.create(rest)).rejects.toThrow('Message is required')
    })

    it('rejects name longer than 100 characters', async () => {
      const name = 'A'.repeat(101)
      await expect(Contact.create({ ...validContact, name })).rejects.toThrow()
    })

    it('rejects invalid service enum value', async () => {
      await expect(
        Contact.create({ ...validContact, service: 'invalid-service' })
      ).rejects.toThrow()
    })

    it('rejects invalid budget enum value', async () => {
      await expect(
        Contact.create({ ...validContact, budget: 'mega-budget' })
      ).rejects.toThrow()
    })

    it('rejects invalid status enum value', async () => {
      await expect(
        Contact.create({ ...validContact, status: 'pending' })
      ).rejects.toThrow()
    })
  })

  describe('Valid enum values', () => {
    const services = [
      'agentic-ai', 'data-engineering', 'data-science',
      'cloud-architecture', 'mlops', 'software-engineering',
      'fintech-blockchain', 'general',
    ]

    services.forEach((service) => {
      it(`accepts service: ${service}`, async () => {
        const contact = await Contact.create({ ...validContact, service })
        expect(contact.service).toBe(service)
      })
    })

    const statuses = ['new', 'read', 'replied', 'closed']
    statuses.forEach((status) => {
      it(`accepts status: ${status}`, async () => {
        const contact = await Contact.create({ ...validContact, status })
        expect(contact.status).toBe(status)
      })
    })
  })
})
