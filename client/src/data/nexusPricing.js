import { NEXUS_BASE } from './nexusContent'
import { PRODUCT_PRICING, formatPrice } from '../utils/pricing'

// Keep the existing enquiry identifiers so bookmarked links and submissions remain valid.
const packageIds = ['readiness-assessment', 'standard-pilot', 'implementation-services', 'enterprise', 'managed-services']
export const NEXUS_PRIMARY_PRICING = PRODUCT_PRICING['nexus-aos'].tiers.map((tier, index) => ({
  ...tier,
  id: packageIds[index],
  displayPrice: formatPrice(tier),
  startingAt: Boolean(tier.amount),
  billingPeriod: tier.interval === 'month' ? 'monthly' : tier.amount ? 'one-time' : 'custom',
  ctaLabel: index === 3 ? 'Contact Enterprise Sales' : 'Discuss this package',
  ctaUrl: `${NEXUS_BASE}/demo?interest=${packageIds[index]}`,
}))

export const NEXUS_PRICING_NOTES = [
  'All numeric prices are starting prices. Final scope and pricing are confirmed in your proposal.',
  'Naira and US-dollar prices are listed separately as supplied; they are not exchange-rate conversions.',
  'Managed AgentOps is priced monthly. Enterprise Deployment starts from the displayed amount.',
]

export const NEXUS_PRICING_FAQS = [
  ['What does a Nexus AOS deployment cost?', `Deployments start from ${formatPrice(PRODUCT_PRICING['nexus-aos']).replace(/^From /, '')}. Choose a Proof of Concept, Production Deployment or Enterprise Deployment.`],
  ['Is Managed AgentOps billed monthly?', `Yes. ${formatPrice(PRODUCT_PRICING['nexus-aos'].tiers[4])}.`],
  ['Do we need a Readiness Assessment before a pilot?', 'An assessment helps establish readiness. Teams with a defined workflow can discuss a Proof of Concept directly.'],
  ['Can pricing be customised?', `Enterprise Deployment ${formatPrice(PRODUCT_PRICING['nexus-aos'].tiers[3]).replace(/^From /, 'starts from ')}. Final pricing is confirmed after scope and technical discovery.`],
]

export const NEXUS_INTEREST_OPTIONS = [
  { value: 'demo', label: 'Product demonstration' },
  ...NEXUS_PRIMARY_PRICING.map((offer) => ({
    value: offer.id,
    label: `${offer.name.replace('Nexus AI ', 'AI ').replace('Nexus ', '')} — ${offer.displayPrice.replace(' fixed fee', '').replace('From ', 'from ')}`,
  })),
  { value: 'workflow-discovery', label: 'Workflow discovery enquiry' },
  { value: 'starter-pilot', label: 'Starter pilot enquiry' },
  { value: 'advanced-pilot', label: 'Advanced pilot enquiry' },
  { value: 'department', label: 'Department deployment enquiry' },
  { value: 'business', label: 'Business deployment enquiry' },
  { value: 'training', label: 'Training' },
  { value: 'other', label: 'Other' },
]

export const NEXUS_BUDGET_OPTIONS = [
  ['under-10k', 'Under $10,000'],
  ['10k-25k', '$10,000–$25,000'],
  ['25k-50k', '$25,000–$50,000'],
  ['50k-100k', '$50,000–$100,000'],
  ['100k-250k', '$100,000–$250,000'],
  ['250k-500k', '$250,000–$500,000'],
  ['above-500k', 'Above $500,000'],
  ['not-defined', 'Budget not yet defined'],
]

export function getNexusInterest(value) {
  if (value === 'pilot') return 'standard-pilot'
  if (value === 'discovery') return 'workflow-discovery'
  return NEXUS_INTEREST_OPTIONS.some((option) => option.value === value) ? value : 'demo'
}
