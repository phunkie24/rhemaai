import { Link } from 'react-router-dom'
import {
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
  PillList,
} from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import {
  NEXUS_COMMERCIAL_TERMS,
  NEXUS_COMPLEXITY_BANDS,
  NEXUS_ENTRY_PACKAGES,
  NEXUS_IMPLEMENTATION_SERVICES,
  NEXUS_LICENSES,
  NEXUS_MANAGED_SERVICES,
  NEXUS_PILOT_PACKAGES,
  NEXUS_PRICING_FAQS,
  NEXUS_PRICING_NOTES,
  NEXUS_PRIMARY_PRICING,
  NEXUS_SUPPORT_PACKAGES,
  NEXUS_TRAINING,
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
          {item.suitableFor?.length > 0 && (
            <>
              <h4>Suitable for</h4>
              <ul className={styles.packageList}>{item.suitableFor.map((value) => <li key={value}>{value}</li>)}</ul>
            </>
          )}
          <h4>Includes</h4>
          <ul className={styles.packageList}>{item.included.map((value) => <li key={value}>{value}</li>)}</ul>
          {item.examples?.length > 0 && (
            <details className={styles.packageDetails}>
              <summary>Typical examples</summary>
              <ul>{item.examples.map((value) => <li key={value}>{value}</li>)}</ul>
            </details>
          )}
          {item.exclusions?.map((value) => <p className={styles.packageNote} key={value}>{value}</p>)}
          {item.note && <p className={styles.packageNote}>{item.note}</p>}
          {item.ctaUrl && <Link to={item.ctaUrl} className={styles.primaryAction} onClick={() => handlePackage(item.id)}>{item.ctaLabel}</Link>}
        </article>
      ))}
    </div>
  )
}

function ServiceCards({ items }) {
  return (
    <div className={styles.grid3}>
      {items.map((item) => (
        <article className={styles.card} key={item.name}>
          <h3>{item.name}</h3>
          <strong className={styles.packagePrice}>{item.displayPrice}</strong>
          {item.included?.length > 0 && <ul>{item.included.map((value) => <li key={value}>{value}</li>)}</ul>}
          {item.examples?.length > 0 && <ul>{item.examples.map((value) => <li key={value}>{value}</li>)}</ul>}
          {item.note && <p className={styles.packageNote}>{item.note}</p>}
          {item.ctaUrl && <Link to={item.ctaUrl} className={styles.textAction}>{item.ctaLabel}</Link>}
        </article>
      ))}
    </div>
  )
}

const fixedOffers = NEXUS_PRIMARY_PRICING.filter((offer) => !offer.startingAt)

export default function NexusPricingPage() {
  return (
    <NexusPage
      title="Nexus AOS Pricing and Pilot Packages | RhemaAI Solutions Ltd"
      description="Public US-dollar pricing for Nexus AOS readiness assessment, workflow discovery, pilots, annual platform licences, implementation, support and training."
      keywords="Nexus AOS pricing, agentic AI pilot cost, AI readiness assessment price, enterprise agent platform licence"
      breadcrumbs={[{ label: 'Pricing', path: `${NEXUS_BASE}/pricing` }]}
      track={() => trackNexusEvent('nexus_pricing_viewed', { route: `${NEXUS_BASE}/pricing` })}
      noFinalCta
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'FAQPage',
            mainEntity: NEXUS_PRICING_FAQS.map(([question, answer]) => ({
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
        description="Nexus AOS engagements begin with assessment and controlled implementation. Platform licensing, integration, infrastructure, support and training are structured separately so organisations can adopt governed Agentic AI at the appropriate scale."
        aside={(
          <>
            <h2>Commercial pathway</h2>
            <ol>
              <li>Paid assessment</li>
              <li>Paid workflow discovery</li>
              <li>Paid pilot</li>
              <li>Annual platform licence</li>
              <li>Implementation, support and expansion</li>
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
          <NexusSectionHeader eyebrow="Public entry packages" title="Assess Readiness. Define One Workflow." description="Fixed-fee entry engagements establish the evidence, scope and governance needed for a controlled next step." />
          <PricingCards items={NEXUS_ENTRY_PACKAGES} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Pilot packages" title="Prove a Governed Workflow at the Right Level of Complexity" />
          <PricingCards items={NEXUS_PILOT_PACKAGES} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Annual platform licence" title="Move from a Successful Pilot into Production" description="Platform licensing is separate from implementation, infrastructure, model usage and custom development." />
          <PricingCards items={NEXUS_LICENSES} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Implementation services" title="Deployment, Integration and Workflow Delivery" description="Nexus AOS licensing provides the right to operate the platform. Deployment, workflow implementation, integration, data preparation, policy configuration, training and custom development are priced separately." />
          <ServiceCards items={NEXUS_IMPLEMENTATION_SERVICES} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Infrastructure" title="Cloud, Model and Infrastructure Costs" description="Nexus AOS can operate within customer-managed cloud infrastructure or within a RhemaAI-managed environment." />
          <div className={styles.grid2}>
            <article className={styles.card}>
              <span className={styles.sectionEyebrow}>Recommended for enterprise customers</span>
              <h3>Customer-managed infrastructure</h3>
              <p>The customer pays cloud, model, database, search, storage, networking, monitoring and third-party service charges directly to the relevant provider.</p>
              <p>Nexus AOS licence and RhemaAI implementation charges remain separate.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.sectionEyebrow}>Infrastructure cost plus 25% management fee</span>
              <h3>RhemaAI-managed infrastructure</h3>
              <p><strong>Actual monthly infrastructure cost + 25% infrastructure management fee = monthly managed platform charge.</strong></p>
              <p>Example: $4,000/month cloud and AI usage + $1,000/month management fee = $5,000/month managed infrastructure charge.</p>
              <p className={styles.packageNote}>Usage limits, budget alerts and spending controls will be defined in the customer agreement.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Support and operational services" title="Choose Support Coverage Deliberately" />
          <ServiceCards items={NEXUS_SUPPORT_PACKAGES} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Training and enablement" title="Build Accountable Operating Capability" />
          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <caption>Nexus AOS training services in US dollars</caption>
              <thead><tr><th scope="col">Training service</th><th scope="col">Price</th></tr></thead>
              <tbody>{NEXUS_TRAINING.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.displayPrice}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={styles.grid3}>
            {NEXUS_TRAINING.filter((item) => item.included).map((item) => (
              <article className={styles.card} key={item.name}>
                <h3>{item.name}</h3>
                <ul>{item.included.map((value) => <li key={value}>{value}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Optional managed services" title="Add Operational Guidance Without Blurring the Scope" />
          <ServiceCards items={NEXUS_MANAGED_SERVICES} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Domain complexity" title="Price Complexity in Delivery, Not in the Platform Licence" description="Nexus AOS does not use a different platform licence for every application domain. Adjustments apply to pilot, implementation, validation, support and integration work." />
          <div className={styles.grid3}>
            {NEXUS_COMPLEXITY_BANDS.map((band) => (
              <article className={styles.card} key={band.name}>
                <h3>{band.name}</h3>
                <strong className={styles.packagePrice}>{band.adjustment}</strong>
                <PillList items={band.domains} />
                <p>{band.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Comparison" title="Primary Public Offers" />
          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <caption>Nexus AOS package comparison in US dollars</caption>
              <thead><tr><th scope="col">Package</th><th scope="col">Price</th><th scope="col">Best for</th></tr></thead>
              <tbody>{NEXUS_PRIMARY_PRICING.map((offer) => (
                <tr key={offer.id}>
                  <th scope="row">{offer.name.replace('Nexus ', '')}</th>
                  <td>{offer.displayPrice.replace(' fixed fee', '')}</td>
                  <td>{offer.suitableFor[0]}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <ul className={styles.disclaimerList}>{NEXUS_PRICING_NOTES.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Commercial terms" title="General Commercial Summary" description="These points are a public summary, not a substitute for a signed proposal, statement of work or commercial agreement." />
          <ul className={styles.trustList}>{NEXUS_COMMERCIAL_TERMS.map((term) => <li key={term}>{term}</li>)}</ul>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Frequently asked questions" title="Nexus AOS Pricing Questions" />
          <div className={styles.faqList}>
            {NEXUS_PRICING_FAQS.map(([question, answer]) => (
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
          <span className={styles.sectionEyebrow}>Choose your starting point</span>
          <h2>Choose the Right Starting Point for Nexus AOS</h2>
          <p>Begin with a readiness assessment, define one high-value workflow, or discuss a controlled pilot with RhemaAI Solutions.</p>
        </div>
        <NexusCTAGroup actions={[
          ['Purchase Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`],
          ['Start Workflow Discovery', `${NEXUS_BASE}/demo?interest=workflow-discovery`, 'secondary'],
          ['Discuss a Nexus Pilot', `${NEXUS_BASE}/demo?interest=pilot`, 'text'],
          ['Contact Enterprise Sales', `${NEXUS_BASE}/demo?interest=enterprise`, 'text'],
        ]} />
      </section>
    </NexusPage>
  )
}
