import { describe, expect, it } from 'vitest'
import {
  getNexusInterest,
  NEXUS_BUDGET_OPTIONS,
  NEXUS_INTEREST_OPTIONS,
  NEXUS_PRIMARY_PRICING,
} from '../../data/nexusPricing'

describe('Nexus pricing source of truth', () => {
  it('exposes the five approved public packages in both price lists', () => {
    expect(Object.fromEntries(NEXUS_PRIMARY_PRICING.map((offer) => [offer.id, offer.displayPrice]))).toEqual({
      'readiness-assessment': 'From ₦750,000 / $2,500',
      'standard-pilot': 'From ₦5,000,000 / $20,000',
      'implementation-services': 'From ₦15,000,000 / $50,000',
      enterprise: 'From ₦50,000,000 / $120,000',
      'managed-services': 'From ₦1,500,000 / $5,000 per month',
    })
  })

  it('does not retain outdated contact-for-pricing labels for priced offers', () => {
    expect(JSON.stringify(NEXUS_PRIMARY_PRICING)).not.toMatch(/contact for pricing/i)
    expect(NEXUS_PRIMARY_PRICING.find((offer) => offer.id === 'enterprise').ctaLabel).toBe('Contact Enterprise Sales')
  })

  it('provides all optional enquiry interests and non-blocking budget bands', () => {
    expect(NEXUS_INTEREST_OPTIONS).toHaveLength(13)
    expect(NEXUS_BUDGET_OPTIONS).toHaveLength(8)
    expect(getNexusInterest('pilot')).toBe('standard-pilot')
    expect(getNexusInterest('unknown')).toBe('demo')
  })
})
