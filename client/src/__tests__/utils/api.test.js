import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'

vi.mock('axios', () => {
  const instance = {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  }
  return {
    default: {
      create: vi.fn(() => instance),
    },
    __instance: instance,
  }
})

describe('api utility', () => {
  it('exports contactAPI with submit method', async () => {
    const { contactAPI } = await import('../../utils/api')
    expect(typeof contactAPI.submit).toBe('function')
  })

  it('exports newsletterAPI with subscribe method', async () => {
    const { newsletterAPI } = await import('../../utils/api')
    expect(typeof newsletterAPI.subscribe).toBe('function')
  })

  it('exports insightsAPI with getAll and getById methods', async () => {
    const { insightsAPI } = await import('../../utils/api')
    expect(typeof insightsAPI.getAll).toBe('function')
    expect(typeof insightsAPI.getById).toBe('function')
  })

  it('exports a default axios instance', async () => {
    const { default: api } = await import('../../utils/api')
    expect(api).toBeDefined()
  })
})
