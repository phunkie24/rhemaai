import { describe, expect, it } from 'vitest'
import { PRODUCT_PRICING, SERVICE_PRICING, formatPrice } from '../../utils/pricing'
import { SERVICES } from '../../utils/servicesData'

describe('approved catalogue prices', () => {
  it('covers all 19 products and every service with complete options', () => {
    expect(Object.keys(PRODUCT_PRICING)).toHaveLength(19)
    Object.values(PRODUCT_PRICING).forEach(price => {
      expect(price.tiers).toHaveLength(5)
      expect(price.tiers[3].amountNGN).toBeGreaterThan(0)
      expect(price.tiers[3].amount).toBeGreaterThan(0)
      expect(price.tiers[4].interval).toBe('month')
    })
    expect(Object.keys(SERVICE_PRICING)).toHaveLength(27)
    SERVICES.forEach(service => expect(SERVICE_PRICING[service.id]?.tiers.length).toBeGreaterThanOrEqual(4))
  })
  it('keeps distinct Nigerian and international prices without conversions', () => {
    expect(PRODUCT_PRICING['nexus-aos']).toMatchObject({ amountNGN: 5000000, amount: 20000 })
    expect(PRODUCT_PRICING['stratum-dx'].tiers[3]).toMatchObject({ amountNGN: 50000000, amount: 150000 })
    expect(PRODUCT_PRICING['cipher-gx'].tiers[3]).toMatchObject({ amountNGN: 35000000, amount: 100000 })
    expect(SERVICE_PRICING['digital-marketing'].tiers[2]).toMatchObject({ amountNGN: 1500000, amount: 3000, interval: 'month' })
  })
  it('preserves setup, programme and monthly bases without publishing upper ranges', () => {
    expect(SERVICE_PRICING['azure-monitoring'].tiers[2]).toMatchObject({ name: 'Enterprise setup', amountNGN: 5000000, amount: 15000 })
    expect(SERVICE_PRICING['technical-training'].tiers[3]).toMatchObject({ interval: 'programme', amountNGN: 3000000, amount: 8000 })
    expect(SERVICE_PRICING['managed-services'].tiers).toHaveLength(7)
    expect(formatPrice(SERVICE_PRICING['managed-services'].tiers[0])).toBe('From ₦5,000,000 / $12,000 per month')
    expect(JSON.stringify({ PRODUCT_PRICING, SERVICE_PRICING })).not.toMatch(/Custom pricing|Custom campaign|maximum|upper|200M|500k/i)
  })
})
