import {
  DomainDistributionChart,
} from '@components/Nexus/DomainCatalogue'
import DomainCatalogue from '@components/Nexus/DomainCatalogue'
import {
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
} from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import { NEXUS_DOMAINS } from '../data/nexusDomains'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

export default function NexusSolutionsPage() {
  return (
    <NexusPage
      title="Nexus AOS Solutions | 20 Agentic AI Domains"
      description="Explore Nexus AOS governed agentic workflow designs across energy, finance, manufacturing, healthcare, cybersecurity, supply chain and other enterprise domains."
      keywords="Nexus AOS solutions, enterprise AI domains, agentic workflows, energy AI agents, procurement agents"
      breadcrumbs={[{ label: 'Solutions', path: `${NEXUS_BASE}/solutions` }]}
      track={() => trackNexusEvent('nexus_solution_viewed', { route: `${NEXUS_BASE}/solutions` })}
    >
      <NexusHero
        eyebrow="Nexus solution catalogue"
        title="Twenty Domains, One Governed Orchestration Model"
        description="The catalogue maps supplied multi-agent design research to configurable enterprise agent roles, workflows, governance considerations and integration categories."
        aside={(
          <>
            <h2>{NEXUS_DOMAINS.length} application domains</h2>
            <p>Every domain page follows the same accountable structure while retaining industry-specific risks and operating context.</p>
            <ul>
              <li>Exact supplied design count and share</li>
              <li>Suggested logical agent roles</li>
              <li>Example governed workflow</li>
              <li>Integration and oversight considerations</li>
            </ul>
          </>
        )}
      >
        <NexusCTAGroup actions={[
          ['Agentic Data Engineering', `${NEXUS_BASE}/solutions/agentic-data-engineering`],
          ['Procurement', `${NEXUS_BASE}/solutions/procurement`, 'secondary'],
          ['Request a Domain Demo', `${NEXUS_BASE}/demo`, 'text'],
        ]} />
      </NexusHero>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Research distribution"
            title="Energy Dominates the Supplied Design Set"
            description="Energy represents 76.8% of the supplied designs. The chart separates Energy from the remaining domains so smaller categories are not presented through a misleading equal scale."
          />
          <DomainDistributionChart />
          <div className={styles.notice}>
            <strong>Design-count disclosure</strong>
            Counts are supplied architecture and workflow design artefacts, not customers, deployments, transactions or live systems. The source and methodology citation remains pending owner input.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Filter the catalogue"
            title="Find a Domain or Application"
            description="Search by domain or application, filter by catalogue status and sort without losing keyboard access."
          />
          <DomainCatalogue />
        </div>
      </section>
    </NexusPage>
  )
}
