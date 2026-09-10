import { describe, expect, it } from 'vitest'
import { formatPrice } from '../../utils/pricing'

describe('catalogue pricing', () => {
  it('does not advertise missing or invalid amounts as free', () => {
    for (const pricing of [null, {}, { amount: 0 }, { amount: -10 }, { amount: 'bad' }, { amount: Infinity }]) {
      expect(formatPrice(pricing)).toBe('Contact for pricing')
    }
  })
  it('keeps both naira and a configured international currency', () => {
    const label = formatPrice({ amountNGN: 150000, amount: 100, currency: 'GBP' })
    expect(label).toContain('150,000')
    expect(label).toContain('£100')
    expect(label).not.toContain('$')
  })
  it('shows the pricing basis and preserves custom quote labels', () => {
    expect(formatPrice({ amount: 250, prefix: 'From', interval: 'month' })).toMatch(/^From .*250 per month$/)
    expect(formatPrice({ label: 'Custom enterprise quote' })).toBe('Custom enterprise quote')
  })
})
