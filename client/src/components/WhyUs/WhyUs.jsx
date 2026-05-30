import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import SectionHeader from '@components/common/SectionHeader'
import styles from './WhyUs.module.css'

const POINTS = [
  {
    icon: '🧮',
    title: 'Mathematics-Driven Thinking',
    desc: 'Our MSc Mathematics foundation means we solve problems from first principles — not copy-paste templates. Better architectures, better AI systems, better analytical models.',
  },
  {
    icon: '🌍',
    title: 'Genuine Multi-Cloud Mastery',
    desc: 'Azure, AWS, and GCP in real production — 19+ Azure certifications plus AWS and GCP. We architect across the full cloud landscape without vendor lock-in bias.',
  },
  {
    icon: '⚡',
    title: 'Production-Grade AI Systems',
    desc: '21-pattern agentic AI architectures, enterprise EDW pipelines, multi-agent procurement systems — all battle-tested in live enterprise environments.',
  },
  {
    icon: '📊',
    title: 'End-to-End Data & Analytics',
    desc: 'From raw SAP ECC ingestion through Bronze-Silver-Gold Databricks layers to predictive ML models and Power BI dashboards — we own the full data value chain.',
  },
  {
    icon: '🎯',
    title: 'Thin-Team, High-Output Model',
    desc: 'We operate lean and deliver elite — no bloated consulting overhead. Senior-level expertise on every engagement, every time.',
  },
  {
    icon: '🔗',
    title: 'Deep Enterprise Domain Knowledge',
    desc: 'Oil & gas, finance, procurement — we\'ve built ProcureIQ, APAIE, and EDW pipelines for major Nigerian energy companies. Domain context built in, not bolted on.',
  },
]

const CERTS = [
  { label: 'MSc Mathematics', color: '#6B46FF' },
  { label: '19× Azure Certified', color: '#0078D4' },
  { label: 'AWS Certified', color: '#FF9900' },
  { label: 'GCP Certified', color: '#4285F4' },
  { label: 'AI/ML Specialist', color: '#8B5CF6' },
  { label: 'Solutions Architect', color: '#6B46FF' },
  { label: 'Data Engineer', color: '#7C3AED' },
  { label: 'Agentic AI Expert', color: '#9B6DFF' },
]

export default function WhyUs() {
  const { ref, inView } = useInView()

  return (
    <section className={styles.section}>
      <SectionHeader
        label="Why RhemaAI"
        title="The Rare Combination That Changes Outcomes"
        subtitle="Very few professionals combine MSc-level mathematics, multi-cloud certification, agentic AI engineering, and enterprise domain knowledge. That combination is our moat."
      />

      <div className={styles.inner} ref={ref}>
        {/* Left: credentials visual */}
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.visualTop}>
            <div className={styles.mathSymbol}>∑ ∫ ∂</div>
            <div className={styles.mscLabel}>MSc Applied Mathematics</div>
            <div className={styles.mscSub}>First-principles problem solving</div>
          </div>

          <div className={styles.certGrid}>
            {CERTS.map((cert) => (
              <div key={cert.label} className={styles.certBadge}>
                <div className={styles.certDot} style={{ background: cert.color }} />
                {cert.label}
              </div>
            ))}
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Cloud Platforms</div>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <div className={styles.statNum}>21</div>
              <div className={styles.statLabel}>Agentic Patterns</div>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <div className={styles.statNum}>50+</div>
              <div className={styles.statLabel}>Projects Delivered</div>
            </div>
          </div>
        </motion.div>

        {/* Right: points */}
        <motion.div
          className={styles.points}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {POINTS.map((point) => (
            <motion.div
              key={point.title}
              className={styles.point}
              variants={{
                hidden:  { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className={styles.pointIcon}>{point.icon}</div>
              <div>
                <div className={styles.pointTitle}>{point.title}</div>
                <div className={styles.pointDesc}>{point.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
