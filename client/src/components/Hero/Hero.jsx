import { Link } from 'react-router-dom'
import useCountUp from '@hooks/useCountUp'
import heroMedia from '../../assets/enterprise-ai-operations.webp'
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

function StatItem({ stat, index }) {
  const count = useCountUp(stat.value ?? 0, 1800, true)

  return (
    <div
      className={`${styles.stat} ${stat.text ? styles.textStat : ''}`}
      style={{ animationDelay: `${0.35 + index * 0.08}s` }}
    >
      <strong>{stat.text ?? `${count.toLocaleString()}${stat.suffix}`}</strong>
      <span>{stat.label}</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <img src={heroMedia} alt="" aria-hidden="true" className={styles.heroBg} fetchpriority="high" decoding="async" />
      <div className={styles.heroBgOverlay} aria-hidden="true" />

      <div className={styles.heroShell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowMark} />
            Enterprise AI, Cloud, Data Engineering, Data Science &amp; MLOps
          </div>

          <h1 className={styles.headline}>
            Enterprise AI Systems for Production
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
            {STATS.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        <div className={styles.signalsCol}>
          <div className={styles.visualStack} aria-label="RhemaAI enterprise AI operating model">
            <div className={styles.primaryImageCard}>
              <img
                src={heroMedia}
                alt="Enterprise AI operations command center dashboard"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.imageCaption}>
                <span>AI operations room</span>
                <strong>Governed automation in view</strong>
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
