import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './ContentPage.module.css'

const PRINCIPLES = [
  {
    title: 'Senior ownership',
    body: 'Small teams, direct accountability and clear technical standards on every client engagement.',
  },
  {
    title: 'Production mindset',
    body: 'We value people who can take ideas past demos into secure, observable and maintainable systems.',
  },
  {
    title: 'Cross-disciplinary range',
    body: 'AI, cloud, data engineering, analytics and software delivery are treated as one connected craft.',
  },
]

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <Helmet>
        <title>Careers | RhemaAI Solutions Ltd</title>
        <meta
          name="description"
          content="Careers at RhemaAI Solutions Ltd for AI, cloud, data and software engineers who build enterprise-grade systems."
        />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Careers</span>
          <h1 className={styles.title}>Build enterprise AI with a high-trust technical team.</h1>
          <p className={styles.subtitle}>
            We are intentionally selective. RhemaAI Solutions Ltd is for builders who care about
            architecture, measurable client outcomes and the discipline required to
            ship production systems.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <h2>How we work</h2>
        <p>
          Current openings are shared selectively as client needs expand. If your
          background spans AI engineering, cloud architecture, data platforms,
          MLOps or enterprise software, send a concise note and portfolio.
        </p>

        <div className={styles.grid}>
          {PRINCIPLES.map((principle) => (
            <article key={principle.title} className={styles.card}>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <h2>Start the conversation</h2>
          <p>Send your profile, strongest work samples and the kind of systems you want to build.</p>
        </div>
        <Link to="/contact" className={styles.button}>Contact RhemaAI Solutions Ltd</Link>
      </section>
    </div>
  )
}
