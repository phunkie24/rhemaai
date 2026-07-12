import SectionHeader from '@components/common/SectionHeader'
import founderMedia from '../../assets/founder-no-book.webp'
import styles from './WhyUs.module.css'

const POINTS = [
  {
    icon: 'MA',
    title: 'Applied Mathematics Thinking',
    desc: 'Our Applied Mathematics foundation keeps models, data products, and cloud architectures grounded in first principles. Better assumptions, better systems, better decisions.',
  },
  {
    icon: 'MC',
    title: 'Genuine Multi-Cloud Mastery',
    desc: 'Azure, AWS and GCP Certified expertise applied in real production environments. We architect across the full cloud landscape without vendor lock-in bias.',
  },
  {
    icon: 'AI',
    title: 'Production-Grade AI Systems',
    desc: 'Agentic AI architectures, enterprise data pipelines, and multi-agent workflows designed for live operational environments.',
  },
  {
    icon: 'DA',
    title: 'End-to-End Data & Analytics',
    desc: 'From raw SAP ECC ingestion through Bronze-Silver-Gold Databricks layers to predictive ML models and Power BI dashboards, we own the full data value chain.',
  },
  {
    icon: 'SM',
    title: 'Senior-Led Delivery Model',
    desc: 'Lean delivery with senior-level expertise on architecture, implementation, governance, and production readiness.',
  },
  {
    icon: 'DK',
    title: 'Deep Enterprise Domain Knowledge',
    desc: 'Oil and gas, finance, and procurement experience across ProcureIQ, APAIE, and EDW pipelines for major Nigerian energy companies.',
  },
]

const CERTS = [
  { label: 'Applied Mathematics', color: '#6B46FF' },
  { label: 'Azure Certified', color: '#0078D4' },
  { label: 'AWS Certified', color: '#FF9900' },
  { label: 'GCP Certified', color: '#4285F4' },
  { label: 'AI/ML Specialist', color: '#8B5CF6' },
  { label: 'Solutions Architect', color: '#6B46FF' },
  { label: 'Data Engineer', color: '#7C3AED' },
  { label: 'Agentic AI Expert', color: '#9B6DFF' },
]

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <SectionHeader
        label="Why RhemaAI Solutions Ltd"
        title="The Rare Combination That Changes Outcomes"
        subtitle="Very few teams combine Applied Mathematics, Azure, AWS and GCP certified cloud delivery, agentic AI engineering, and enterprise domain knowledge. That combination is our advantage."
        light
      />

      <div className={styles.inner}>
        <div className={styles.visual}>
          <div className={styles.visualImageCard}>
            <img src={founderMedia} alt="Funke R. Yusuf" loading="lazy" decoding="async" />
            <div>
              <span>Senior-led delivery</span>
              <strong>Architecture grounded in mathematics and production reality</strong>
            </div>
          </div>

          <div className={styles.visualTop}>
            <div className={styles.mathSymbol}>MATH / AI / CLOUD</div>
            <div className={styles.mscLabel}>Applied Mathematics</div>
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
              <div className={styles.statNum}>10,000+</div>
              <div className={styles.statLabel}>Agentic Patterns</div>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <div className={styles.statNum}>50+</div>
              <div className={styles.statLabel}>Projects Delivered</div>
            </div>
          </div>
        </div>

        <div className={styles.points}>
          {POINTS.map((point) => (
            <div
              key={point.title}
              className={styles.point}
            >
              <div className={styles.pointIcon}>{point.icon}</div>
              <div>
                <div className={styles.pointTitle}>{point.title}</div>
                <div className={styles.pointDesc}>{point.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
