const NEXUS_EVENTS = new Set([
  'nexus_overview_viewed',
  'nexus_domain_selected',
  'nexus_solution_viewed',
  'nexus_architecture_viewed',
  'nexus_pricing_viewed',
  'nexus_docs_viewed',
  'nexus_demo_started',
  'nexus_demo_submitted',
  'nexus_demo_failed',
  'nexus_assessment_started',
  'nexus_assessment_section_completed',
  'nexus_assessment_completed',
  'nexus_pilot_cta_clicked',
])

const SAFE_CONTEXT_KEYS = new Set(['route', 'domain', 'section', 'package', 'band'])

export function trackNexusEvent(name, context = {}) {
  if (typeof window === 'undefined' || !NEXUS_EVENTS.has(name)) return

  const safeContext = Object.fromEntries(
    Object.entries(context).filter(([key, value]) => (
      SAFE_CONTEXT_KEYS.has(key) && ['string', 'number', 'boolean'].includes(typeof value)
    ))
  )
  const event = { event: name, ...safeContext }

  if (Array.isArray(window.dataLayer)) window.dataLayer.push(event)
  window.dispatchEvent(new CustomEvent('rhemaai:analytics', { detail: event }))
}
