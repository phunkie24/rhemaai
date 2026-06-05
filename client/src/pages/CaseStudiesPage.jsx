import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { caseStudiesAPI } from '@utils/api'
import styles from './CaseStudiesPage.module.css'

const CASES = [
  {
    id: 'fraud-fintech',
    industry: 'FinTech',
    client: 'West African Digital Bank',
    kpi1: { value: '94%', label: 'Fraud Recall' },
    kpi2: { value: '<50ms', label: 'Inference Latency' },
    summary: 'Streaming fraud detection pipeline with LightGBM and Graph Neural Networks on Azure, replacing a rule-based system that missed 40% of attacks.',
    tags: ['Kafka', 'LightGBM', 'Graph ML', 'Azure', 'FastAPI'],
    accent: '#9B6DFF',
  },
  {
    id: 'predictive-energy',
    industry: 'Energy',
    client: 'Tier-1 Oil & Gas Operator',
    kpi1: { value: '34%', label: 'Downtime Reduction' },
    kpi2: { value: '6hrs', label: 'Failure Lead Time' },
    summary: 'IoT time-series forecasting deployed to edge devices at remote well sites, predicting equipment failure before it happened.',
    tags: ['Azure ML', 'IoT Edge', 'ONNX', 'Time-Series'],
    accent: '#38BDF8',
  },
  {
    id: 'agentic-enterprise',
    industry: 'Enterprise',
    client: 'Global Professional Services Firm',
    kpi1: { value: '80%', label: 'Time-to-Process Cut' },
    kpi2: { value: '12', label: 'Markets Deployed' },
    summary: 'Multi-agent AI system on Azure AI Foundry automating document ingestion, classification, and extraction across 12 countries.',
    tags: ['Azure AI Foundry', 'LangGraph', 'GPT-4o', 'RAG'],
    accent: '#A78BFA',
  },
  {
    id: 'lakehouse-retail',
    industry: 'Retail',
    client: 'Pan-African Retail Group',
    kpi1: { value: '3wks to 2hrs', label: 'Reporting Cycle' },
    kpi2: { value: '5', label: 'ERPs Unified' },
    summary: 'Medallion lakehouse on Azure Fabric with OneLake unifying five legacy ERPs into a single real-time analytics layer.',
    tags: ['Azure Fabric', 'OneLake', 'Spark', 'Power BI'],
    accent: '#34D399',
  },
  {
    id: 'mlops-healthcare',
    industry: 'Healthcare',
    client: 'Health Insurance Provider',
    kpi1: { value: '100%', label: 'Model Observability' },
    kpi2: { value: '4x', label: 'Deploy Frequency' },
    summary: 'End-to-end MLOps platform with drift detection, MLflow model registry, and GitHub Actions CI/CD, replacing fully manual deployments.',
    tags: ['Azure ML', 'MLflow', 'Evidently', 'Terraform'],
    accent: '#FBBF24',
  },
  {
    id: 'cloud-manufacturing',
    industry: 'Manufacturing',
    client: 'Industrial Manufacturer',
    kpi1: { value: '41%', label: 'Cost Saved' },
    kpi2: { value: '99.99%', label: 'Post-Migration Uptime' },
    summary: 'Phased migration to Azure using Bicep IaC with zero-downtime cutover, replacing on-premises infrastructure that blocked digital transformation.',
    tags: ['Azure', 'Bicep', 'IaC', 'DevOps'],
    accent: '#F472B6',
  },
]

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function CaseStudiesPage() {
  const [active, setActive] = useState('All')
  const [cases, setCases] = useState(CASES)
  const filters = useMemo(() => {
    const industries = Array.from(new Set(cases.map((item) => item.industry))).filter(Boolean)
    return ['All', ...industries]
  }, [cases])
  const filtered = active === 'All' ? cases : cases.filter((c) => c.industry === active)

  useEffect(() => {
    caseStudiesAPI.getAll({ limit: 48 })
      .then((data) => {
        if (data.caseStudies?.length) setCases(data.caseStudies)
      })
      .catch(() => { /* static case studies stay visible */ })
  }, [])

  return (
    <>
      <Helmet>
        <title>Case Studies | RhemaAI Solutions Ltd</title>
        <meta
          name="description"
          content="Real results from real engagements: fraud detection, predictive maintenance, agentic AI, data lakehouses and more."
        />
      </Helmet>

      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.grid} />
          <div className="container">
            <motion.div
              className={styles.heroInner}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.badge}>Client Results</span>
              <h1 className={styles.title}>
                Real Problems.<br />
                <span className={styles.accent}>Measurable Outcomes.</span>
              </h1>
              <p className={styles.sub}>
                From fraud detection at 50ms to AI agents spanning 12 markets,
                every engagement below is a real production deployment.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.hStat}><strong>50+</strong><span>Engagements</span></div>
                <div className={styles.hDiv} />
                <div className={styles.hStat}><strong>6</strong><span>Industry Verticals</span></div>
                <div className={styles.hDiv} />
                <div className={styles.hStat}><strong>3</strong><span>Continents</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className="container">

            <div className={styles.filters}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={styles.cardGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {filtered.map((cs, i) => (
                  <motion.article
                    key={cs._id || cs.id || cs.slug}
                    className={styles.card}
                    custom={i}
                    variants={cardAnim}
                    initial="hidden"
                    animate="show"
                    style={{ '--accent': cs.accent }}
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.industryTag} style={{ color: cs.accent }}>
                        {cs.industry}
                      </span>
                      <p className={styles.clientName}>{cs.client}</p>
                    </div>

                    <div className={styles.kpis}>
                      <div className={styles.kpi}>
                        <strong className={styles.kpiVal} style={{ color: cs.accent }}>{cs.kpi1.value}</strong>
                        <span className={styles.kpiLabel}>{cs.kpi1.label}</span>
                      </div>
                      <div className={styles.kpiDiv} />
                      <div className={styles.kpi}>
                        <strong className={styles.kpiVal} style={{ color: cs.accent }}>{cs.kpi2.value}</strong>
                        <span className={styles.kpiLabel}>{cs.kpi2.label}</span>
                      </div>
                    </div>

                    <p className={styles.summary}>{cs.summary}</p>

                    <div className={styles.tags}>
                      {cs.tags.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <motion.div
              className={styles.ctaInner}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className={styles.ctaTitle}>Ready to Be Next?</h2>
              <p className={styles.ctaSub}>
                Tell us your problem. We'll tell you how we'd solve it.
              </p>
              <Link to="/contact" className={styles.ctaBtn}>
                Book a Free Discovery Call
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}
