import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const STATS = [
  { text: 'Azure, AWS and GCP', label: 'Certified' },
  { value: 50, suffix: '+', label: 'Enterprise projects' },
  { value: 10000, suffix: '+', label: 'Agentic AI patterns' },
]

const CAPABILITIES = [
  'AI strategy',
  'Cloud architecture',
  'Lakehouse engineering',
  'MLOps governance',
]

const SIGNALS = [
  { label: 'Model risk', value: 'Monitored' },
  { label: 'Data quality', value: '97.8%' },
  { label: 'Cloud posture', value: 'Compliant' },
]

const VISUAL_METRICS = [
  { value: '42', label: 'Controls' },
  { value: '3x', label: 'Clouds' },
  { value: '24/7', label: 'Ops' },
]

function StatItem({ stat }) {
  return (
    <div
      className={`${styles.stat} ${stat.text ? styles.textStat : ''}`}
    >
      <strong>{stat.text ?? `${stat.value.toLocaleString('en-US')}${stat.suffix}`}</strong>
      <span>{stat.label}</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.heroShell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowMark} />
            Enterprise AI, Cloud, Data Engineering, Data Science &amp; MLOps
          </div>

          <h1 className={styles.headline}>
            Enterprise AI Systems <span className={styles.goldText}>for Production</span>
          </h1>

          <p className={styles.subtext}>
            RhemaAI Solutions Ltd designs, builds and operates governed AI, data and cloud
            platforms for enterprise teams that need measurable outcomes, resilient
            architecture and reliable production operations.
          </p>

          <div className={styles.actions}>
            <Link to="/contact" className={styles.btnPrimary}>
              Start a transformation
            </Link>
            <Link to="/case-studies" className={styles.btnSecondary}>
              View client outcomes
            </Link>
          </div>

          <div className={styles.statsRow} aria-label="RhemaAI Solutions Ltd delivery proof points">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        <div className={styles.signalsCol}>
          <div className={styles.visualStack} aria-label="RhemaAI enterprise AI operating model">
            <div className={styles.primaryImageCard}>
              <div className={styles.architecture}>
                <span className={styles.architectureLabel}>From strategy to production</span>
                <strong className={styles.architectureCore}>Rhema<span>AI</span></strong>
                <div className={styles.architectureNodes}>
                  <span>AI systems</span><span>Trusted data</span><span>Cloud platforms</span>
                </div>
                <span className={styles.architectureFooter}>Governance at every layer</span>
              </div>
            </div>

            <div className={styles.signalPanel}>
              {SIGNALS.map((signal) => (
                <div key={signal.label} className={styles.signal}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.metricDeck}>
              {VISUAL_METRICS.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.capabilityStrip} aria-label="Core capabilities">
        {CAPABILITIES.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}
