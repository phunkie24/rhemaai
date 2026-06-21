import { describe, it, expect } from 'vitest'
import { SERVICES } from '../../utils/servicesData'

describe('SERVICES data', () => {
  it('exports the enterprise service catalog', () => {
    expect(Array.isArray(SERVICES)).toBe(true)
    expect(SERVICES).toHaveLength(9)
  })

  it('each service has required shape', () => {
    SERVICES.forEach((service) => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('title')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('tags')
      expect(service).toHaveProperty('color')
      expect(service).toHaveProperty('capabilities')
      expect(Array.isArray(service.tags)).toBe(true)
      expect(Array.isArray(service.capabilities)).toBe(true)
    })
  })

  it('all service ids are unique', () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('highlights the priority enterprise service tracks', () => {
    const highlighted = SERVICES.filter((s) => s.highlight)
    expect(highlighted.map((s) => s.id)).toEqual([
      'agentic-ai',
      'generative-ai',
      'data-engineering',
      'data-science',
    ])
  })

  it('contains agentic-ai as first service', () => {
    expect(SERVICES[0].id).toBe('agentic-ai')
  })

  it('each service has at least 4 capabilities', () => {
    SERVICES.forEach((service) => {
      expect(service.capabilities.length).toBeGreaterThanOrEqual(4)
    })
  })

  it('each service has a valid hex color', () => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/
    SERVICES.forEach((service) => {
      expect(service.color).toMatch(hexPattern)
    })
  })

  it('contains fintech-blockchain service', () => {
    const fintech = SERVICES.find((s) => s.id === 'fintech-blockchain')
    expect(fintech).toBeDefined()
    expect(fintech.title).toMatch(/FinTech/i)
  })
})
