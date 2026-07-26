import { useParams } from 'react-router-dom'
import {
  NexusCTAGroup,
  NexusHero,
  NexusPage,
  NexusSectionHeader,
  PillList,
  WorkflowDiagram,
} from '@components/Nexus/NexusComponents'
import { FLAGSHIP_SOLUTIONS, NEXUS_BASE } from '../data/nexusContent'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

export default function NexusFlagshipSolutionPage({ solution: solutionProp }) {
  const params = useParams()
  const solutionKey = solutionProp || params.solution
  const solution = FLAGSHIP_SOLUTIONS[solutionKey]
  const isData = solutionKey === 'agentic-data-engineering'
  const path = `${NEXUS_BASE}/solutions/${solutionKey}`

  return (
    <NexusPage
      title={isData ? 'Agentic Data Engineering | Nexus AOS' : 'Procurement Automation | Nexus AOS'}
      description={solution.description}
      keywords={isData ? 'agentic data engineering, AI pipeline operations, governed data agents, Nexus AOS' : 'procurement automation, procurement AI agents, governed sourcing workflow, Nexus AOS'}
      breadcrumbs={[{ label: 'Solutions', path: `${NEXUS_BASE}/solutions` }, { label: isData ? 'Agentic Data Engineering' : 'Procurement', path }]}
      track={() => trackNexusEvent('nexus_solution_viewed', { route: path, domain: solutionKey })}
    >
      <NexusHero
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.description}
        aside={(
          <>
            <h2>Governed by design</h2>
            <p>Agent roles are configurable logical responsibilities, not claims of unrestricted autonomous production operation.</p>
            <ul>
              <li>Bounded tool permissions</li>
              <li>Evidence-backed decisions</li>
              <li>Policy-gated execution</li>
              <li>Human accountability</li>
            </ul>
          </>
        )}
      >
        <NexusCTAGroup actions={solution.ctas.map(([label, href], index) => [label, href, index === 0 ? 'primary' : index === 1 ? 'secondary' : 'text'])} />
      </NexusHero>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Operating challenges" title="Where Fragmented Automation Breaks Down" />
          <PillList items={solution.problems} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="Agent network"
            title="Specialist Roles Around One Accountable Workflow"
            description="Each logical role is configured with explicit responsibilities, context, tools, output contracts and escalation boundaries."
          />
          <div className={styles.capabilityGrid}>
            {solution.agents.map((agent) => (
              <article className={styles.agentCard} key={agent}>
                <h3>{agent}</h3>
                <p>Works within the workflow state and policy context; transfers authority when the task exceeds its boundary.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Governed workflow example" title={isData ? 'From Pipeline Anomaly to Monitored Outcome' : 'From Purchase Request to Retained Decision Trail'} />
          <WorkflowDiagram steps={solution.workflow} />
        </div>
      </section>

      {solution.recovery && (
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <NexusSectionHeader eyebrow="Failure semantics" title="Rollback Is Not the Same as Business Recovery" description="Nexus distinguishes technical and business responses so a failed multi-step transaction is handled deliberately." />
            <div className={styles.grid4}>
              {solution.recovery.map(([title, description]) => (
                <article className={styles.card} key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Enterprise integration" title="Work with the Platforms Already in the Operating Model" description={solution.integrationNote} />
          <PillList items={solution.integrations} />
        </div>
      </section>
    </NexusPage>
  )
}
