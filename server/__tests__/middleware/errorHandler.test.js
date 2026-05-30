import { describe, it, expect, beforeEach } from '@jest/globals'
import { jest } from '@jest/globals'
import { errorHandler } from '../../middleware/errorHandler.js'

function makeRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('errorHandler middleware', () => {
  let req, next

  beforeEach(() => {
    req = {}
    next = jest.fn()
    process.env.NODE_ENV = 'production'
  })

  it('handles MongoDB duplicate key error (code 11000)', () => {
    const err = { code: 11000, keyValue: { email: 'dup@test.com' } }
    const res = makeRes()
    errorHandler(err, req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Duplicate entry detected.', field: 'email' })
    )
  })

  it('handles Mongoose ValidationError', () => {
    const err = {
      name: 'ValidationError',
      errors: {
        email: { message: 'Email is required' },
        name:  { message: 'Name is required' },
      },
    }
    const res = makeRes()
    errorHandler(err, req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    const call = res.json.mock.calls[0][0]
    expect(call.message).toBe('Validation failed')
    expect(call.errors).toContain('Email is required')
    expect(call.errors).toContain('Name is required')
  })

  it('returns 500 with generic message for unknown errors in production', () => {
    const err = new Error('Something broke')
    const res = makeRes()
    errorHandler(err, req, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })

  it('returns stack trace in development mode', () => {
    process.env.NODE_ENV = 'development'
    const err = new Error('Dev error')
    const res = makeRes()
    errorHandler(err, req, res, next)
    const call = res.json.mock.calls[0][0]
    expect(call.stack).toBeDefined()
    expect(call.message).toBe('Dev error')
  })

  it('uses err.statusCode when available', () => {
    const err = { message: 'Not found', statusCode: 404 }
    const res = makeRes()
    errorHandler(err, req, res, next)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Not found' })
  })
})
