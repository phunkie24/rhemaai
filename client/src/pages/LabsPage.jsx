import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './ContentPage.module.css'

const LAB_STREAMS = [
  {
    title: 'AI prototypes',
    body: 'Rapid experiments for agentic workflows, model-assisted operations and applied automation patterns.',
  },
  {
    title: 'Platform accelerators',
    body: 'Reusable blueprints for data ingestion, analytics, MLOps, observability and cloud delivery.',
  },
  {
    title: 'Research notes',
    body: 'Field-tested thinking from client delivery, emerging AI tools and enterprise architecture work.',
  },
]

export default function LabsPage() {
  return (
    <div className={styles.page}>
      <Helmet>
        <title>RAITECH Labs | RhemaAI Solutions Ltd</title>
        <meta
          name="description"
          content="RAITECH Labs explores practical AI, data, cloud and platform experiments from RhemaAI Solutions Ltd."
        />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>RAITECH Labs</span>
          <h1 className={styles.title}>Applied experiments for production AI, data and cloud systems.</h1>
          <p className={styles.subtitle}>
            RAITECH Labs is where RhemaAI Solutions Ltd develops prototypes,
            reusable delivery patterns and technical research for enterprise
            teams moving from ideas to operated systems.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <h2>What happens in the lab</h2>
        <p>
          Labs work turns emerging technology into practical assets: proof-of-concept
          systems, reference architectures, internal tooling and production-ready
          patterns that can be adapted for client programmes.
        </p>

        <div className={styles.grid}>
          {LAB_STREAMS.map((stream) => (
            <article key={stream.title} className={styles.card}>
              <h3>{stream.title}</h3>
              <p>{stream.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <h2>Bring a problem into the lab</h2>
          <p>Share the AI, data or cloud challenge you want to prototype safely.</p>
        </div>
        <Link to="/contact" className={styles.button}>Start a conversation</Link>
      </section>
    </div>
  )
}
