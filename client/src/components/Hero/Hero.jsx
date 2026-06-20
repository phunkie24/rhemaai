import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

function StatItem({ stat, delay }) {
  const count = useCountUp(stat.value ?? 0, 1800, true)

  return (
    <motion.div
      className={`${styles.stat} ${stat.text ? styles.textStat : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
    >
      <strong>{stat.text ?? `${count.toLocaleString()}${stat.suffix}`}</strong>
      <span>{stat.label}</span>
    </motion.div>
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
              <StatItem key={stat.label} stat={stat} delay={0.35 + index * 0.08} />
            ))}
          </div>
        </div>

        <div className={styles.signalsCol}>
          <div className={styles.signalPanel}>
            {SIGNALS.map((signal) => (
              <div key={signal.label} className={styles.signal}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
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
