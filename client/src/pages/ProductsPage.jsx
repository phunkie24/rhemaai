import { useEffect, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productsAPI } from '@utils/api'
import styles from './PlatformPages.module.css'

export const SEED_PRODUCTS = [
  {
    _id: 'seed-agent-control-room',
    slug: 'enterprise-ai-control-room',
    name: 'Enterprise AI Control Room',
    kicker: 'Agent operations',
    summary: 'Plan, monitor and govern AI agents across enterprise workflows with approvals, telemetry and measurable business outcomes.',
    description: 'A governed operating layer for enterprise AI agents, including approval queues, workflow telemetry, audit trails, escalation rules and performance reporting for production teams.',
    tags: ['AgentOps', 'Governance', 'Workflow AI'],
  },
  {
    _id: 'seed-data-fabric',
    slug: 'data-fabric-accelerator',
    name: 'Data Fabric Accelerator',
    kicker: 'Lakehouse delivery',
    summary: 'A repeatable foundation for ingestion, quality rules, lineage, analytics products and trusted executive reporting.',
    description: 'A delivery accelerator for lakehouse programs that need controlled ingestion, data quality rules, metadata, lineage, semantic models and executive analytics from one governed foundation.',
    tags: ['Lakehouse', 'DataOps', 'BI'],
  },
  {
    _id: 'seed-cloud-kit',
    slug: 'cloud-landing-zone-kit',
    name: 'Cloud Landing Zone Kit',
    kicker: 'Multi-cloud platform',
    summary: 'Secure Azure, AWS and GCP architecture patterns for teams that need speed without giving up control.',
    description: 'A reusable cloud architecture kit for enterprise AI and data workloads across Azure, AWS and GCP, with identity, network, security, observability and deployment controls built in.',
    tags: ['Azure', 'AWS', 'GCP'],
  },
  {
    _id: 'seed-mlops-stack',
    slug: 'mlops-command-stack',
    name: 'MLOps Command Stack',
    kicker: 'Model operations',
    summary: 'Experiment tracking, model registry, deployment controls, drift monitoring and retraining workflows in one delivery pattern.',
    description: 'A production MLOps pattern for machine learning teams that need traceable experiments, model registration, deployment gates, drift signals and automated retraining workflows.',
    tags: ['MLOps', 'MLflow', 'Monitoring'],
  },
]

const METRICS = [
  { value: '04', label: 'platform product lines' },
  { value: '24/7', label: 'observable operations' },
  { value: '3x', label: 'cloud delivery coverage' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(SEED_PRODUCTS)

  useEffect(() => {
    productsAPI.getAll({ limit: 24 })
      .then((data) => {
        if (data.products?.length) setProducts(data.products)
      })
      .catch(() => { /* seed products stay visible */ })
  }, [])

  return (
    <div className={styles.page}>
      <PageSEO
        title="Enterprise AI & Data Platform Products | RhemaAI Solutions Ltd"
        description="RhemaAI Platform SaaS products: AI Control Room for agentic operations, Data Fabric Accelerator for lakehouse delivery, Cloud Landing Zone Kit for Azure/AWS/GCP and MLOps Command Stack — built for enterprise data engineering and AI teams."
        keywords="enterprise AI platform Nigeria, data fabric product, MLOps SaaS, cloud landing zone Azure, AI operations software, data engineering platform Africa, machine learning platform"
      />

      <section className={styles.hero}>
        <div className={styles.radiance} />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.eyebrow}>RhemaAI Platform</span>
            <h1>Enterprise products for governed AI, data and cloud operations.</h1>
            <p>
              Productized delivery systems for teams that need reusable platforms,
              accountable automation and production-grade intelligence without
              starting from scratch every time.
            </p>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.primaryAction}>Book a platform session</Link>
              <Link to="/services" className={styles.secondaryAction}>View services</Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.signalPanel}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            aria-label="RhemaAI Platform operating signals"
          >
            <div className={styles.panelHeader}>
              <span>Platform telemetry</span>
              <strong>Enterprise ready</strong>
            </div>
            <div className={styles.signalGrid}>
              <span>Agents</span>
              <span>Data</span>
              <span>Cloud</span>
              <span>MLOps</span>
            </div>
            <div className={styles.pulseTrack}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.panelRows}>
              <div><span>Governance checks</span><strong>Active</strong></div>
              <div><span>Release readiness</span><strong>92%</strong></div>
              <div><span>Pipeline health</span><strong>Stable</strong></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.metricBand}>
        {METRICS.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Product Suite</span>
          <h2>Platform modules built for serious operating environments.</h2>
          <p>
            Use one module as an accelerator or combine the suite into a full
            AI and data operating model.
          </p>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <article
              key={product._id || product.slug || product.name}
              className={styles.productCard}
            >
              <span>{product.kicker || product.category}</span>
              <h3>
                <Link to={`/products/${product.slug || product._id}`}>{product.name}</Link>
              </h3>
              <p>{product.summary || product.description}</p>
              <div className={styles.tagRow}>
                {(product.tags || []).map((tag) => <em key={tag}>{tag}</em>)}
              </div>
              <div className={styles.priceRow}>
                {product.pricing?.amountNGN > 0 && (
                  <span className={styles.priceNGN}>₦{Number(product.pricing.amountNGN).toLocaleString()}</span>
                )}
                {product.pricing?.amount > 0 && (
                  <span className={styles.priceUSD}>${Number(product.pricing.amount).toFixed(2)}</span>
                )}
                {(!product.pricing?.amount && !product.pricing?.amountNGN) && (
                  <span className={styles.priceLabel}>{product.pricing?.label || 'Contact sales'}</span>
                )}
              </div>
              <div className={styles.cardActions}>
                <Link to={`/products/${product.slug || product._id}`} className={styles.textAction}>View details</Link>
                {product.pricing?.paystackUrl && (
                  <a href={product.pricing.paystackUrl} className={styles.btnPaystack} target="_blank" rel="noopener noreferrer">Buy Now — Paystack</a>
                )}
                {product.demoUrl && <a href={product.demoUrl} className={styles.textAction}>Open demo</a>}
                {product.productUrl && <a href={product.productUrl} className={styles.textAction}>View product</a>}
                {product.assetUrl && <a href={product.assetUrl} className={styles.textAction}>Download package</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div>
          <span className={styles.eyebrow}>Platform advisory</span>
          <h2>Choose the product path that matches your next operating constraint.</h2>
        </div>
        <Link to="/contact" className={styles.primaryAction}>Start with discovery</Link>
      </section>
    </div>
  )
}
