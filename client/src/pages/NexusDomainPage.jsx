import { Link, useParams } from 'react-router-dom'
import { getNexusDomain, formatDesignCount } from '../data/nexusDomains'
import {
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
  PillList,
  WorkflowDiagram,
} from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

export default function NexusDomainPage() {
  const { domain: slug } = useParams()
  const domain = getNexusDomain(slug)

  if (!domain) {
    return (
      <NexusPage
        title="Nexus Domain Not Found"
        description="The requested Nexus AOS solution domain could not be found."
        breadcrumbs={[{ label: 'Solutions', path: `${NEXUS_BASE}/solutions` }, { label: 'Not found', path: `${NEXUS_BASE}/solutions/${slug}` }]}
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <NexusSectionHeader title="This Nexus solution domain is not available." description="Return to the catalogue to explore all twenty supported domain narratives." />
            <Link to={`${NEXUS_BASE}/solutions`} className={styles.primaryAction}>Back to solutions</Link>
          </div>
        </section>
      </NexusPage>
    )
  }

  const canonicalPath = `${NEXUS_BASE}/solutions/${domain.slug}`
  const energy = domain.slug === 'energy'

  return (
    <NexusPage
      title={`Nexus AOS for ${domain.name} | Agentic AI Solutions`}
      description={`${domain.description} Explore ${domain.name.toLowerCase()} applications, agent roles, governance and integration patterns for Nexus AOS.`}
      keywords={`Nexus AOS ${domain.name}, ${domain.name} AI agents, governed agentic workflows, CADABA`}
      breadcrumbs={[{ label: 'Solutions', path: `${NEXUS_BASE}/solutions` }, { label: domain.name, path: canonicalPath }]}
      track={() => trackNexusEvent('nexus_solution_viewed', { route: canonicalPath, domain: domain.slug })}
    >
      <NexusHero
        eyebrow={`Nexus AOS for ${domain.name}`}
        title={`Coordinate ${domain.name} Work with Governed AI Agents`}
        description={domain.description}
        aside={(
          <>
            <h2>Supplied design representation</h2>
            <ul>
              <li><strong>{formatDesignCount(domain.designCount)}</strong> design artefacts</li>
              <li><strong>{domain.percentage.toFixed(1)}%</strong> of the supplied catalogue</li>
              <li>Status: <strong>{domain.status}</strong></li>
            </ul>
            <p>These figures do not represent customers or deployments.</p>
          </>
        )}
      >
        <NexusCTAGroup actions={[
          ['Request a Domain Demo', `${NEXUS_BASE}/demo?domain=${domain.slug}`],
          ['Discuss a Pilot', `${NEXUS_BASE}/demo?interest=pilot&domain=${domain.slug}`, 'secondary'],
          ['View Architecture', `${NEXUS_BASE}/architecture`, 'text'],
        ]} />
      </NexusHero>

      {domain.disclaimer && (
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <div className={styles.governanceCallout}>
              <strong>Important domain boundary</strong>
              {domain.disclaimer}
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Industry problem"
            title={`${domain.name} Work Spans Systems, Evidence and Accountable Decisions`}
            description={`Nexus AOS provides an orchestration layer for selected ${domain.name.toLowerCase()} workflows while preserving policy, human authority and the systems of record already in place.`}
          />
          <div className={styles.grid2}>
            <article className={styles.card}>
              <h3>Key applications</h3>
              <PillList items={domain.featuredApplications} />
            </article>
            <article className={styles.card}>
              <h3>Business outcomes to evaluate</h3>
              <PillList items={domain.businessOutcomes} />
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Logical agent network"
            title="Configurable Roles, Not Unbounded Autonomy"
            description="These agent roles are a suggested operating topology. Responsibilities, authority and tools are configured for the selected workflow."
          />
          <div className={styles.capabilityGrid}>
            {domain.agentRoles.map((role) => (
              <article className={styles.agentCard} key={role}>
                <h3>{role}</h3>
                <p>Receives bounded responsibilities, permitted knowledge and tools, output requirements and escalation conditions.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Example orchestration" title={`A Governed ${domain.name} Workflow`} description="The final workflow is designed around the organisation’s process, controls and integration boundaries." />
          <WorkflowDiagram steps={domain.exampleWorkflow} label={`Example ${domain.name} agentic workflow`} />
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Governance and integration" title="Control Before Action" description="Nexus evaluates evidence, policy, identity and authority before permitted tools are invoked." />
          <div className={styles.grid2}>
            <article className={styles.cardDark}>
              <h3>Governance considerations</h3>
              <ul className={styles.detailList}>{domain.governanceConsiderations.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className={styles.cardDark}>
              <h3>Integration categories</h3>
              <ul className={styles.detailList}>{domain.integrations.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      {energy && (
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <NexusSectionHeader
              eyebrow="Energy feature"
              title="From Detection to Accountable Intervention"
              description="The supplied catalogue gives Energy the strongest representation. A discovery engagement can narrow this breadth to one evidence-rich workflow such as asset fault triage, maintenance planning or storage optimisation."
            />
            <div className={styles.grid3}>
              {['Observe operational state and asset telemetry', 'Coordinate engineering evidence and hypotheses', 'Apply safety policy and request authorised intervention'].map((item) => (
                <article className={styles.card} key={item}><h3>{item}</h3><p>Define inputs, operating constraints, decision ownership and measurable outcome before implementation.</p></article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Related domains" title="Continue Exploring" />
          <div className={styles.relatedLinks}>
            {domain.relatedDomains.map((relatedSlug) => {
              const related = getNexusDomain(relatedSlug)
              return related && <Link key={related.slug} to={`${NEXUS_BASE}/solutions/${related.slug}`}>{related.name}</Link>
            })}
          </div>
        </div>
      </section>
    </NexusPage>
  )
}
