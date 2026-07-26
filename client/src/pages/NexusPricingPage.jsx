import { Link } from 'react-router-dom'
import {
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
} from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import {
  NEXUS_ENTRY_PACKAGES,
  NEXUS_LICENSES,
  NEXUS_PILOT_PACKAGES,
  NEXUS_PRICING_FAQS,
  NEXUS_PRICING_NOTES,
  NEXUS_PRIMARY_PRICING,
} from '../data/nexusPricing'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

function PricingCards({ items }) {
  const handlePackage = (id) => trackNexusEvent('nexus_pilot_cta_clicked', {
    route: `${NEXUS_BASE}/pricing`,
    package: id,
  })

  return (
    <div className={styles.grid3}>
      {items.map((item) => (
        <article className={`${styles.packageCard} ${item.featured ? styles.packageFeatured : ''}`} id={item.id} key={item.id}>
          {item.badge && <span className={styles.packageLabel}>{item.badge}</span>}
          <h3>{item.name}</h3>
          <strong className={styles.packagePrice}>{item.displayPrice}</strong>
          <p>{item.description}</p>
          {item.suitableFor?.[0] && <p className={styles.packageNote}><strong>Best for:</strong> {item.suitableFor[0]}</p>}
          {item.ctaUrl && <Link to={item.ctaUrl} className={styles.primaryAction} onClick={() => handlePackage(item.id)}>{item.ctaLabel}</Link>}
        </article>
      ))}
    </div>
  )
}

const fixedOffers = NEXUS_PRIMARY_PRICING.filter((offer) => !offer.startingAt)
const publicFaqs = NEXUS_PRICING_FAQS.filter(([question]) => [
  'Is Nexus AOS sold as a monthly subscription?',
  'Is the pilot fee included in the annual licence?',
  'Are cloud and AI model costs included?',
  'Do we need a Readiness Assessment before a pilot?',
  'Can pricing be customised?',
].includes(question))

export default function NexusPricingPage() {
  return (
    <NexusPage
      title="Nexus AOS Pricing and Pilot Packages | RhemaAI Solutions Ltd"
      description="Public US-dollar starting prices for Nexus AOS readiness assessment, workflow discovery, pilots and annual platform licences."
      keywords="Nexus AOS pricing, agentic AI pilot cost, AI readiness assessment price, enterprise agent platform licence"
      breadcrumbs={[{ label: 'Pricing', path: `${NEXUS_BASE}/pricing` }]}
      track={() => trackNexusEvent('nexus_pricing_viewed', { route: `${NEXUS_BASE}/pricing` })}
      noFinalCta
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'FAQPage',
            mainEntity: publicFaqs.map(([question, answer]) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          },
          ...fixedOffers.map((offer) => ({
            '@type': 'Service',
            name: offer.name,
            provider: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
            offers: {
              '@type': 'Offer',
              price: String(offer.amount),
              priceCurrency: 'USD',
              description: offer.billingPeriod === 'annual' ? 'Annual platform licence' : 'Fixed-fee engagement',
            },
          })),
        ],
      }}
    >
      <NexusHero
        eyebrow="Nexus AOS pricing and pilot packages"
        title="Start with One Workflow. Scale into an Enterprise Agentic Operating Platform."
        description="Choose a fixed-fee assessment or pilot, then move to an annual platform licence when the workflow is ready for production. Detailed implementation and operating costs are confirmed in your proposal."
        aside={(
          <>
            <h2>A simple path to production</h2>
            <ol>
              <li>Assess readiness or define one workflow</li>
              <li>Prove it through a controlled pilot</li>
              <li>Licence the platform and scale</li>
            </ol>
          </>
        )}
      >
        <NexusCTAGroup actions={[
          ['Request Pricing Consultation', `${NEXUS_BASE}/demo?interest=enterprise`],
          ['Start the Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`, 'secondary'],
        ]} />
      </NexusHero>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Start here" title="Assess Readiness or Define One Workflow" description="Fixed-fee engagements for organisations that are not yet ready to begin a pilot." />
          <PricingCards items={NEXUS_ENTRY_PACKAGES} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Pilot packages" title="Prove One Governed Workflow" />
          <PricingCards items={NEXUS_PILOT_PACKAGES} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Annual platform licences" title="Move from Pilot to Production" description="Choose a licence according to the number of workflows, users and operating environments required." />
          <PricingCards items={NEXUS_LICENSES} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Before you enquire" title="What the Public Prices Do Not Include" description="A tailored proposal confirms the exact scope and commercial terms." />
          <ul className={styles.disclaimerList}>{NEXUS_PRICING_NOTES.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Essential questions" title="Pricing FAQs" />
          <div className={styles.faqList}>
            {publicFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div>
          <span className={styles.sectionEyebrow}>Next step</span>
          <h2>Get a Price for Your Workflow</h2>
          <p>Tell us what you want to improve and we will recommend the appropriate starting package.</p>
        </div>
        <NexusCTAGroup actions={[
          ['Request Pricing Consultation', `${NEXUS_BASE}/demo?interest=enterprise`],
          ['Start the Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`, 'secondary'],
        ]} />
      </section>
    </NexusPage>
  )
}
