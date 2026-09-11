// Use amountNGN for naira, or amount + currency for other currencies.
// Optional: prefix: 'From', interval: 'month' or 'project'.
// Populate with approved prices; an unset or zero amount is never advertised as free.
export { SERVICE_PRICING, PRODUCT_PRICING } from '../data/cataloguePricing'

export function formatPrice(pricing = {}) {
  pricing = pricing || {}
  const money = (value, currency) => {
    const amount = Number(value)
    if (!Number.isFinite(amount) || amount <= 0) return null
    try {
      return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-NG', {
        style: 'currency', currency,
        minimumFractionDigits: 0, maximumFractionDigits: 2,
      }).format(amount)
    } catch {
      return `${currency} ${amount.toLocaleString('en-NG')}`
    }
  }
  const amounts = [money(pricing.amountNGN, 'NGN'), money(pricing.amount, pricing.currency || 'USD')].filter(Boolean)
  if (!amounts.length) return pricing.label && pricing.label !== 'Contact sales'
    ? pricing.label : 'Contact for pricing'
  return `${pricing.prefix ? `${pricing.prefix} ` : ''}${amounts.join(' / ')}${pricing.interval ? ` per ${pricing.interval}` : ''}`
}
