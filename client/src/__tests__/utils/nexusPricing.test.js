import { describe, expect, it } from 'vitest'
import {
  getNexusInterest,
  NEXUS_BUDGET_OPTIONS,
  NEXUS_INTEREST_OPTIONS,
  NEXUS_PRIMARY_PRICING,
} from '../../data/nexusPricing'

describe('Nexus pricing source of truth', () => {
  it('exposes the eight required primary public offers and exact prices', () => {
    expect(Object.fromEntries(NEXUS_PRIMARY_PRICING.map((offer) => [offer.id, offer.displayPrice]))).toEqual({
      'readiness-assessment': '$2,500 fixed fee',
      'workflow-discovery': '$5,000 fixed fee',
      'starter-pilot': 'From $15,000',
      'standard-pilot': 'From $30,000',
      'advanced-pilot': 'From $60,000',
      department: '$30,000/year',
      business: '$90,000/year',
      enterprise: 'From $200,000/year',
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
