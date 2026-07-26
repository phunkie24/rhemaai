import {
  ArchitectureLayerDiagram,
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
  PillList,
  WorkflowDiagram,
} from '@components/Nexus/NexusComponents'
import {
  ARCHITECTURE_LAYERS,
  CADABA_LOOP,
  NEXUS_BASE,
} from '../data/nexusContent'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

const CONTEXT = [
  'Users and enterprise applications',
  'Agent and workflow services',
  'AI models',
  'Enterprise data',
  'Tools and APIs',
  'Identity and governance systems',
  'Monitoring platforms',
]

const PATTERNS = ['Supervisor pattern', 'Planner–executor pattern', 'Blackboard collaboration', 'Event-driven agents', 'Hierarchical orchestration', 'Peer collaboration', 'Human-in-the-loop', 'Saga and compensation', 'Policy-gated execution', 'Retrieval-grounded decision workflows']
const RELIABILITY = ['Idempotency', 'Retry policies', 'Circuit breakers', 'Timeouts', 'Dead-letter handling', 'Workflow checkpoints', 'Durable state', 'Compensation', 'Manual intervention', 'Graceful degradation']
const SECURITY = ['Enterprise identity', 'Role-based access', 'Least privilege', 'Secret management', 'Tenant isolation', 'Encryption', 'Audit trails', 'Tool permissions', 'Data-boundary enforcement', 'Prompt-injection defences', 'Content and action validation']
const OBSERVABILITY = ['Agent traces', 'Workflow state', 'Tool invocation', 'Token and model cost', 'Latency', 'Failure reasons', 'Human interventions', 'Policy decisions', 'Evaluation scores', 'Business outcomes']

export default function NexusArchitecturePage() {
  return (
    <NexusPage
      title="Nexus AOS Architecture | CADABA Agent Orchestration"
      description="Explore the logical architecture, CADABA cognitive loop, orchestration patterns, reliability, security and observability model behind Nexus AOS."
      keywords="Nexus AOS architecture, CADABA, agent orchestration architecture, multi-agent governance, AgentOps"
      breadcrumbs={[{ label: 'Architecture', path: `${NEXUS_BASE}/architecture` }]}
      track={() => trackNexusEvent('nexus_architecture_viewed', { route: `${NEXUS_BASE}/architecture` })}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Nexus AOS Architecture',
        description: 'Public logical architecture for Nexus AOS and CADABA governed multi-agent orchestration.',
        author: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
      }}
    >
      <NexusHero
        eyebrow="Nexus technical architecture"
        title="Governed Multi-Agent Orchestration Without Exposing the Enterprise"
        description="Nexus AOS sits between users, workflows, models, data, tools and governance systems to coordinate controlled actions, durable state, human authority and operational evidence."
        aside={(
          <>
            <h2>Architecture principles</h2>
            <ul>
              <li>Policy before material action</li>
              <li>Durable workflow state</li>
              <li>Least-privilege tool access</li>
              <li>Evidence and observability throughout</li>
            </ul>
          </>
        )}
      >
        <NexusCTAGroup actions={[
          ['Request an Architecture Demo', `${NEXUS_BASE}/demo?useCase=architecture`],
          ['Read Architecture Docs', `${NEXUS_BASE}/docs/architecture`, 'secondary'],
          ['Explore Solutions', `${NEXUS_BASE}/solutions`, 'text'],
        ]} />
      </NexusHero>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="System context" title="Nexus at the Controlled Coordination Boundary" description="The system context is expressed as accessible text so the critical architecture remains readable on every device." />
          <div className={styles.contextDiagram} role="img" aria-label="Nexus AOS coordinates between enterprise users and applications, agent and workflow services, AI models, enterprise data, tools and APIs, identity and governance systems, and monitoring platforms.">
            <div className={styles.contextCore}><strong>Nexus AOS</strong><span>Governed orchestration</span></div>
            <div className={styles.contextNodes}>{CONTEXT.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Logical architecture" title="Fourteen Explicit Platform Concerns" description="The layers separate access, planning, execution, knowledge, governance, security and operations without publishing confidential implementation details." />
          <ArchitectureLayerDiagram layers={ARCHITECTURE_LAYERS} />
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="CADABA cognitive loop" title="Adapt Through Controlled Evaluation, Not Human Equivalence" description="CADABA structures a repeatable operational loop. It does not describe consciousness, sentience or human-equivalent intelligence." />
          <WorkflowDiagram steps={CADABA_LOOP} label="CADABA cognitive loop" />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Orchestration patterns" title="Choose Collaboration Patterns to Match the Workflow" />
          <PillList items={PATTERNS} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <div className={styles.grid3}>
            <article className={styles.card}><h3>Reliability architecture</h3><PillList items={RELIABILITY} /></article>
            <article className={styles.card}><h3>Security architecture</h3><PillList items={SECURITY} /></article>
            <article className={styles.card}><h3>Operational observability</h3><PillList items={OBSERVABILITY} /></article>
          </div>
        </div>
      </section>
    </NexusPage>
  )
}
