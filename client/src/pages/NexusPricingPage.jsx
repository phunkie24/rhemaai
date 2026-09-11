import { Link } from 'react-router-dom'
import { NexusCTAGroup, NexusHero, NexusPage, NexusSectionHeader } from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import { NEXUS_PRIMARY_PRICING, NEXUS_PRICING_FAQS } from '../data/nexusPricing'
import { PRODUCT_PRICING, formatPrice } from '../utils/pricing'
import styles from '@components/Nexus/Nexus.module.css'

export default function NexusPricingPage() {
  return (
    <NexusPage
      title="Nexus AOS Deployment Pricing | RhemaAI Solutions Ltd"
      description={`Nexus AOS deployments ${formatPrice(PRODUCT_PRICING['nexus-aos']).replace(/^From /, 'start from ')}. Compare readiness assessments, proof of concept, production, enterprise and managed AgentOps pricing.`}
      breadcrumbs={[{ label: 'Pricing', path: `${NEXUS_BASE}/pricing` }]}
      noFinalCta
    >
      <NexusHero
        eyebrow="Nexus AOS pricing"
        title="Start with One Workflow. Scale into Production."
        description={`Deployments ${formatPrice(PRODUCT_PRICING['nexus-aos']).replace(/^From /, 'start from ')}. Choose the package that fits your stage, from readiness assessment to managed enterprise operations.`}
        aside={<><h2>From assessment to operations</h2><p>Compare starting prices in naira and US dollars. Enterprise engagements start from the displayed amount.</p></>}
      >
        <NexusCTAGroup actions={[
          ['Request Pricing Consultation', `${NEXUS_BASE}/demo?interest=enterprise`],
          ['Start the Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`, 'secondary'],
        ]} />
      </NexusHero>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Deployment packages" title="Choose Your Starting Point" />
          <div className={styles.grid3}>
            {NEXUS_PRIMARY_PRICING.map((offer) => (
              <article className={styles.packageCard} id={offer.id} key={offer.id}>
                <h3>{offer.name}</h3>
                <strong className={styles.packagePrice}>{offer.displayPrice}</strong>
                <Link to={offer.ctaUrl} className={styles.primaryAction}>{offer.ctaLabel}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Essential questions" title="Pricing FAQs" />
          <div className={styles.faqList}>
            {NEXUS_PRICING_FAQS.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>
    </NexusPage>
  )
}
