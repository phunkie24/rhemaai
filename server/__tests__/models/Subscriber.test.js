import { describe, it, expect } from '@jest/globals'
import { Subscriber } from '../../models/Subscriber.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

describe('Subscriber Model', () => {
  describe('Valid subscriber creation', () => {
    it('creates a subscriber with a valid email', async () => {
      const sub = await Subscriber.create({ email: 'test@example.com' })
      expect(sub._id).toBeDefined()
      expect(sub.email).toBe('test@example.com')
      expect(sub.active).toBe(true)
      expect(sub.source).toBe('website')
    })

    it('lowercases the email', async () => {
      const sub = await Subscriber.create({ email: 'UPPER@EXAMPLE.COM' })
      expect(sub.email).toBe('upper@example.com')
    })

    it('trims whitespace from email', async () => {
      const sub = await Subscriber.create({ email: '  space@example.com  ' })
      expect(sub.email).toBe('space@example.com')
    })

    it('allows custom source', async () => {
      const sub = await Subscriber.create({ email: 'blog@example.com', source: 'blog' })
      expect(sub.source).toBe('blog')
    })

    it('can be set inactive', async () => {
      const sub = await Subscriber.create({ email: 'inactive@example.com', active: false })
      expect(sub.active).toBe(false)
    })
  })

  describe('Validation errors', () => {
    it('rejects missing email', async () => {
      await expect(Subscriber.create({})).rejects.toThrow()
    })

    it('rejects invalid email format', async () => {
      await expect(
        Subscriber.create({ email: 'not-an-email' })
      ).rejects.toThrow('Invalid email')
    })

    it('rejects duplicate email', async () => {
      await Subscriber.create({ email: 'dup@example.com' })
      const err = await Subscriber.create({ email: 'dup@example.com' }).catch((e) => e)
      expect(err.code).toBe(11000)
    })
  })

  describe('Reactivation pattern', () => {
    it('can reactivate an inactive subscriber', async () => {
      const sub = await Subscriber.create({ email: 'inactive@re.com', active: false })
      expect(sub.active).toBe(false)
      sub.active = true
      await sub.save()
      const updated = await Subscriber.findById(sub._id)
      expect(updated.active).toBe(true)
    })
  })
})
