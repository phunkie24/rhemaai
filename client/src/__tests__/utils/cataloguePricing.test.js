import { describe, expect, it } from 'vitest'
import { PRODUCT_PRICING, SERVICE_PRICING, formatPrice } from '../../utils/pricing'
import { SERVICES } from '../../utils/servicesData'

describe('approved catalogue prices', () => {
  it('covers all 19 products and every service with complete options', () => {
    expect(Object.keys(PRODUCT_PRICING)).toHaveLength(19)
    Object.entries(PRODUCT_PRICING).forEach(([id, price]) => {
      expect(price.tiers).toHaveLength(id === 'nexus-aos' ? 8 : 5)
      expect(price.amount).toBe(20000)
      expect(price.amountNGN).toBeGreaterThanOrEqual(6500000)
      expect(price.tiers.find(tier => tier.id === 'enterprise').amountNGN).toBeGreaterThan(0)
      expect(price.tiers.at(-1).interval).toBe('month')
    })
    expect(Object.keys(SERVICE_PRICING)).toHaveLength(27)
    SERVICES.forEach(service => expect(SERVICE_PRICING[service.id]?.tiers.length).toBeGreaterThanOrEqual(3))
  })
  it('keeps distinct Nigerian and international prices without conversions', () => {
    expect(PRODUCT_PRICING['nexus-aos']).toMatchObject({ amountNGN: 7500000, amount: 20000 })
    expect(PRODUCT_PRICING['stratum-dx'].tiers[3]).toMatchObject({ amountNGN: 75000000, amount: 150000 })
    expect(PRODUCT_PRICING['cipher-gx'].tiers[3]).toMatchObject({ amountNGN: 60000000, amount: 100000 })
    expect(PRODUCT_PRICING['axiom-qr'].tiers[3].amount).toBeGreaterThanOrEqual(PRODUCT_PRICING['axiom-qr'].tiers[2].amount)
    expect(SERVICE_PRICING['digital-marketing'].tiers[2]).toMatchObject({ amountNGN: 1200000, interval: 'month' })
    expect(SERVICE_PRICING['digital-marketing'].tiers[3]).toMatchObject({ amount: 3000, interval: 'month' })
    expect(SERVICE_PRICING['digital-marketing'].tiers[3].amountNGN).toBeUndefined()
  })
  it('preserves setup, programme and monthly bases without publishing upper ranges', () => {
    expect(SERVICE_PRICING['azure-monitoring'].tiers[0]).toMatchObject({ name: 'Initial setup', amountNGN: 3000000 })
    expect(SERVICE_PRICING['technical-training'].tiers[0]).toMatchObject({ interval: 'session', amountNGN: 1200000 })
    expect(SERVICE_PRICING['technical-training'].tiers[1]).toMatchObject({ interval: 'programme', amountNGN: 5000000 })
    expect(SERVICE_PRICING['application-support'].tiers.map(tier => tier.name)).not.toContain('Production project')
    expect(SERVICE_PRICING['managed-services'].tiers.map(tier => tier.name)).toEqual(['Essential', 'Professional', 'Enterprise', 'Mission Critical'])
    expect(formatPrice(SERVICE_PRICING['managed-services'].tiers[0])).toBe('From ₦2,500,000 per month')
    expect(JSON.stringify({ PRODUCT_PRICING, SERVICE_PRICING })).not.toMatch(/Custom pricing|maximum|upper|gross margin|salary|person-week|delivery cost|200M|500k/i)
  })
})
