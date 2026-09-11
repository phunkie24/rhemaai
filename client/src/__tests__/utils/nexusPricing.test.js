import { describe, expect, it } from 'vitest'
import {
  getNexusInterest,
  NEXUS_BUDGET_OPTIONS,
  NEXUS_INTEREST_OPTIONS,
  NEXUS_PRIMARY_PRICING,
} from '../../data/nexusPricing'

describe('Nexus pricing source of truth', () => {
  it('exposes the eight approved v2 packages in both price lists', () => {
    expect(Object.fromEntries(NEXUS_PRIMARY_PRICING.map((offer) => [offer.id, offer.displayPrice]))).toEqual({
      'readiness-assessment': 'From ₦2,500,000 / $3,500',
      'architecture-blueprint': 'From ₦3,500,000 / $8,000',
      'standard-pilot': 'From ₦7,500,000 / $20,000',
      'implementation-services': 'From ₦20,000,000 / $50,000',
      enterprise: 'From ₦60,000,000 / $150,000',
      'managed-services': 'From ₦5,000,000 / $15,000 per month',
      'enterprise-agentops': 'From ₦10,000,000 / $30,000 per month',
      'mission-critical-agentops': 'From ₦20,000,000 / $50,000 per month',
    })
  })

  it('does not retain outdated contact-for-pricing labels for priced offers', () => {
    expect(JSON.stringify(NEXUS_PRIMARY_PRICING)).not.toMatch(/contact for pricing/i)
    expect(NEXUS_PRIMARY_PRICING.find((offer) => offer.id === 'enterprise').ctaLabel).toBe('Contact Enterprise Sales')
  })

  it('provides all optional enquiry interests and non-blocking budget bands', () => {
    expect(NEXUS_INTEREST_OPTIONS).toHaveLength(16)
    expect(NEXUS_BUDGET_OPTIONS).toHaveLength(8)
    expect(getNexusInterest('pilot')).toBe('standard-pilot')
    expect(getNexusInterest('unknown')).toBe('demo')
  })
})
