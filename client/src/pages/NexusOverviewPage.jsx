import { Link } from 'react-router-dom'
import DomainCatalogue from '@components/Nexus/DomainCatalogue'
import {
  ArchitectureLayerDiagram,
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
  PillList,
} from '@components/Nexus/NexusComponents'
import {
  CADABA_LAYERS,
  NEXUS_BASE,
  NEXUS_CAPABILITIES,
} from '../data/nexusContent'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

const PROBLEMS = [
  'Fragmented agents and tools',
  'Uncontrolled autonomous actions',
  'Weak policy enforcement',
  'Inconsistent context and memory',
  'Limited workflow visibility',
  'Poor exception handling',
  'Missing human approvals',
  'Difficult enterprise integration',
  'Inadequate observability',
  'High maintenance cost for custom stacks',
]

const DEPLOYMENT_OPTIONS = [
  ['Microsoft Azure', 'A deployment option aligned to existing Azure identity, data and platform boundaries.'],
  ['Customer-managed Kubernetes', 'A supported architecture for organisations that operate their own container platform.'],
  ['Private cloud', 'A dedicated architecture considered through enterprise implementation.'],
  ['Hybrid environments', 'Coordinate governed workflows across approved cloud and on-premises boundaries.'],
  ['API-first integration', 'Connect through controlled service contracts, events and enterprise identity.'],
  ['Dedicated enterprise deployment', 'Isolate platform resources and operating controls for the organisation.'],
]

export default function NexusOverviewPage() {
  return (
    <NexusPage
      title="Nexus AOS | Governed Enterprise Agentic AI"
      description="Build, govern and operate enterprise AI agents with Nexus AOS, RhemaAI Solutions Ltd’s multi-agent orchestration platform powered by CADABA."
      keywords="Nexus AOS, enterprise agentic AI, CADABA, multi-agent orchestration, governed AI agents, human in the loop"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Nexus AOS',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Enterprise deployment',
        description: 'Enterprise platform for governed multi-agent orchestration, workflow control, integration and observability.',
        provider: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
      }}
      track={() => trackNexusEvent('nexus_overview_viewed', { route: NEXUS_BASE })}
    >
      <NexusHero
        eyebrow="Nexus AOS · Powered by CADABA"
        title="Build, Govern and Operate Enterprise AI Agents with Nexus AOS"
        description="Nexus AOS is an enterprise Agentic AI orchestration platform powered by the CADABA cognitive architecture. It coordinates specialised agents, business workflows, enterprise knowledge, tools, policies, memory, human approvals and operational feedback within one governed environment."
        aside={(
          <>
            <h2>Enterprise control plane</h2>
            <p>Graph-based orchestration, policy gates, governed tool access and operational telemetry around real workflows.</p>
            <ul>
              <li>Design accountable agent roles</li>
              <li>Control actions and approval boundaries</li>
              <li>Trace workflow evidence and outcomes</li>
              <li>Recover or compensate when work fails</li>
            </ul>
          </>
        )}
      >
        <NexusCTAGroup actions={[
          ['Request a Demo', `${NEXUS_BASE}/demo`],
          ['Explore the Architecture', `${NEXUS_BASE}/architecture`, 'secondary'],
          ['Assess Your AI Readiness', `${NEXUS_BASE}/readiness-assessment`, 'text'],
        ]} />
      </NexusHero>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="The operating gap"
            title="AI Agents Are Easy to Prototype but Difficult to Operate"
            description="A successful prototype proves that a model can perform a task. Enterprise operations require authority boundaries, durable workflow state, evidence, integration and accountable recovery."
          />
          <div className={styles.grid2}>
            {PROBLEMS.map((problem, index) => (
              <article className={`${styles.card} ${styles.numberCard}`} data-number={String(index + 1).padStart(2, '0')} key={problem}>
                <h3>{problem}</h3>
                <p>Nexus makes this concern explicit within the workflow model instead of leaving it to disconnected prompts and custom glue code.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Core platform"
            title="One Governed Environment for Agentic Operations"
            description="Capabilities are configured around the organisation’s workflow, risk profile and deployment boundary."
          />
          <div className={styles.capabilityGrid}>
            {NEXUS_CAPABILITIES.map(([title, description]) => (
              <article className={styles.card} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="CADABA differentiation"
            title="A Cognitive and Governance Model Underneath the Platform"
            description="CADABA — Cognitive Architecture for Dynamic Adaptive Business Agents — structures how goals, context, agents, policy, tools, oversight and evaluation work together. These public layers explain the operating model without exposing proprietary algorithms."
          />
          <ArchitectureLayerDiagram layers={CADABA_LAYERS} label="Eight public CADABA architecture layers" />
          <div className={styles.actions}>
            <Link to={`${NEXUS_BASE}/architecture`} className={styles.primaryAction}>Study the architecture</Link>
            <Link to={`${NEXUS_BASE}/docs/concepts`} className={styles.secondaryAction}>Read core concepts</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Application domains"
            title="Explore Governed Agentic Work Across 20 Domains"
            description="Start with a domain, then define a bounded workflow, accountable owners and the evidence required for safe action."
          />
          <div className={styles.flagshipStrip}>
            <Link to={`${NEXUS_BASE}/solutions/agentic-data-engineering`}>
              <strong>Agentic Data Engineering</strong>
              <span>Operate pipelines, quality, metadata and incidents with governed agent roles.</span>
            </Link>
            <Link to={`${NEXUS_BASE}/solutions/procurement`}>
              <strong>Procurement</strong>
              <span>Coordinate suppliers, policy checks, approvals and transaction exceptions.</span>
            </Link>
          </div>
          <DomainCatalogue compact />
          <div className={styles.notice}>
            <strong>How to read the catalogue</strong>
            “Designs” are architecture and workflow design artefacts represented in the supplied Nexus research catalogue. They are not customers, deployments, transactions or production systems. Counts and shares are displayed exactly as supplied; source methodology still requires owner confirmation.
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Deployment architecture"
            title="Fit Nexus to the Enterprise Boundary"
            description="Deployment scope and availability are confirmed during discovery and enterprise implementation."
          />
          <div className={styles.grid3}>
            {DEPLOYMENT_OPTIONS.map(([title, description]) => (
              <article className={styles.card} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Technical authority"
            title="Built Around RhemaAI’s Verifiable Engineering Strengths"
            description="The Nexus proposition connects RhemaAI’s existing work in agentic architecture, data engineering, cloud platforms, applied research and technical publication."
          />
          <PillList items={[
            'Agentic AI architecture',
            'Data engineering and platforms',
            'Azure, AWS and GCP experience',
            'Multi-Agent Orchestration Patterns publication',
            'CADABA research and product development',
            'Technical architecture content',
          ]} />
        </div>
      </section>
    </NexusPage>
  )
}
