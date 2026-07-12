import { useEffect, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productsAPI } from '@utils/api'
import styles from './PlatformPages.module.css'

function productDescription(summary, features) {
  return `${summary}

### Core Capabilities

${features.map((feature) => `- ${feature}`).join('\n')}

### Delivery Fit

Use this product as a focused accelerator, or combine it with adjacent RhemaAI platform modules for a fuller AI, data, cloud, or mathematics operating model.`
}

function catalogueProduct({
  id,
  slug,
  name,
  kicker,
  summary,
  tags,
  features,
  featured = false,
  aliases = [],
  productUrl,
  group,
}) {
  return {
    _id: `seed-${id}`,
    slug,
    name,
    kicker,
    category: 'platform',
    group,
    summary,
    description: productDescription(summary, features),
    features,
    tags,
    featured,
    aliases,
    productUrl,
    pricing: { label: 'Contact sales' },
  }
}

// Colors mirror the service practice-area colors in utils/servicesData.js so
// the products page reads as one taxonomy with the services page.
export const PRODUCT_CATEGORIES = [
  { id: 'agentic-ai', name: 'Agentic AI Engineering', color: '#3157D5' },
  { id: 'data-engineering', name: 'Data Engineering & Platforms', color: '#0E9488' },
  { id: 'data-science', name: 'Data Science & Analytics', color: '#7C3AED' },
  { id: 'cloud-architecture', name: 'Cloud Architecture', color: '#2447B8' },
  { id: 'mlops-dataops', name: 'MLOps & DataOps', color: '#C2415D' },
  { id: 'enterprise-software', name: 'Enterprise Software Eng.', color: '#10275F' },
  { id: 'fintech-blockchain', name: 'FinTech & Blockchain', color: '#6F5B22' },
]

const PRODUCT_GROUP_BY_SLUG = {
  'nexus-aos': 'agentic-ai',
  'apex-rag': 'agentic-ai',
  'lyra-nlp': 'agentic-ai',
  'aura-xai': 'agentic-ai',
  'vega-oas': 'data-science',
  'prism-bi': 'data-science',
  'orbit-cx': 'data-science',
  'axiom-qr': 'data-science',
  'sigma-im': 'data-science',
  'stratum-dx': 'data-engineering',
  'flux-cdc': 'data-engineering',
  'meridian-dq': 'data-engineering',
  'corda-fs': 'data-engineering',
  'helix-lz': 'cloud-architecture',
  'cipher-gx': 'cloud-architecture',
  'krato-ml': 'mlops-dataops',
  'volta-ei': 'mlops-dataops',
  'forge-se': 'enterprise-software',
  'ledger-fm': 'fintech-blockchain',
}

const GROUP_KEYWORDS = [
  {
    id: 'agentic-ai',
    terms: ['agentic', 'agent', 'multi-agent', 'rag', 'retrieval', 'nlp', 'document ai', 'xai', 'explainable', 'language ai', 'llm'],
  },
  {
    id: 'data-engineering',
    terms: ['data engineering', 'lakehouse', 'streaming', 'cdc', 'data quality', 'feature store', 'data platform', 'lineage', 'pipeline'],
  },
  {
    id: 'data-science',
    terms: ['data science', 'analytics', 'optimisation', 'optimization', 'bi', 'customer intelligence', 'quantitative', 'statistical', 'simulation', 'industrial mathematics'],
  },
  {
    id: 'cloud-architecture',
    terms: ['cloud', 'landing zone', 'cybersecurity', 'security posture', 'zero trust', 'cspm', 'azure', 'aws', 'gcp'],
  },
  {
    id: 'mlops-dataops',
    terms: ['mlops', 'dataops', 'modelops', 'edge ai', 'iot', 'drift', 'model registry', 'ml lifecycle'],
  },
  {
    id: 'enterprise-software',
    terms: ['enterprise software', 'software engineering', 'api', '.net', 'fastapi', 'mern', 'backend'],
  },
  {
    id: 'fintech-blockchain',
    terms: ['fintech', 'blockchain', 'financial mathematics', 'risk', 'portfolio', 'quant finance', 'ledger'],
  },
]

// Rhema Academy (training) and Rhema Press (publications) don't fit any
// engineering/platform category, so they're kept in the catalogue for
// direct product-detail links but left out of this categorised grid.
const EXCLUDED_FROM_GRID = ['rhema-academy', 'rhema-press']

function productIdentity(product) {
  return product.slug || product._id || product.name
}

function mergeProducts(apiProducts = []) {
  const merged = [...apiProducts]
  const seen = new Set(apiProducts.map(productIdentity).filter(Boolean))

  SEED_PRODUCTS.forEach((product) => {
    const key = productIdentity(product)
    if (!seen.has(key)) {
      merged.push(product)
      seen.add(key)
    }
  })

  return merged
}

function resolveProductGroup(product = {}) {
  if (PRODUCT_CATEGORIES.some((cat) => cat.id === product.group)) return product.group

  const key = product.slug || product._id || ''
  if (PRODUCT_GROUP_BY_SLUG[key]) return PRODUCT_GROUP_BY_SLUG[key]

  const haystack = [
    product.name,
    product.kicker,
    product.summary,
    product.description,
    product.category,
    ...(product.tags || []),
    ...(product.features || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return GROUP_KEYWORDS.find((group) => (
    group.terms.some((term) => haystack.includes(term))
  ))?.id || 'enterprise-software'
}

function productCategoryMeta(product) {
  const group = resolveProductGroup(product)
  return PRODUCT_CATEGORIES.find((cat) => cat.id === group) || PRODUCT_CATEGORIES[0]
}

export const SEED_PRODUCTS = [
  catalogueProduct({
    id: 'nexus-aos',
    slug: 'nexus-aos',
    group: 'agentic-ai',
    name: 'Nexus AOS',
    kicker: 'Agentic Orchestration System',
    summary: 'Enterprise control plane for deploying, monitoring and governing multi-agent AI systems across complex business workflows with human-in-the-loop approvals and measurable outcomes.',
    tags: ['Flagship', 'Agentic AI', 'AgentOps', 'MCP'],
    features: [
      'Multi-agent graph orchestration with ADAS and LangGraph patterns',
      'Approval gates, rollback controls and audit trails',
      'Real-time agent telemetry and business KPI mapping',
      'MCP server integration and governed tool registry',
    ],
    featured: true,
    aliases: ['enterprise-ai-control-room'],
  }),
  catalogueProduct({
    id: 'apex-rag',
    slug: 'apex-rag',
    group: 'agentic-ai',
    name: 'Apex RAG',
    kicker: 'Retrieval-Augmented Generation Platform',
    summary: 'Production RAG infrastructure with vector indexing, hybrid search, re-ranking pipelines and enterprise knowledge graph connectors for grounded, hallucination-controlled AI.',
    tags: ['Knowledge AI', 'RAG', 'Vector Search', 'Evaluation'],
    features: [
      'Hybrid dense and sparse vector retrieval',
      'Re-ranking, context compression and citation workflows',
      'Enterprise connector library for SharePoint, SAP and SQL systems',
      'Evaluation framework with RAGAS metrics',
    ],
  }),
  catalogueProduct({
    id: 'lyra-nlp',
    slug: 'lyra-nlp',
    group: 'agentic-ai',
    name: 'Lyra NLP',
    kicker: 'NLP & Document Intelligence Platform',
    summary: 'Transform unstructured enterprise text into structured intelligence for contract analysis, document classification, semantic search and multilingual NLP across African and global markets.',
    tags: ['Language AI', 'Document AI', 'Search', 'NLP'],
    features: [
      'Contract intelligence and clause extraction',
      'Multilingual NLP with African language support',
      'Named entity recognition and knowledge graph construction',
      'Semantic search and document Q&A workflows',
    ],
  }),
  catalogueProduct({
    id: 'aura-xai',
    slug: 'aura-xai',
    group: 'agentic-ai',
    name: 'Aura XAI',
    kicker: 'Explainable AI & Model Interpretability',
    summary: 'Mathematical interpretability infrastructure for regulated AI deployments, making model predictions auditable, bias-tested and aligned with model risk standards.',
    tags: ['Explainability', 'Model Risk', 'Fairness', 'Audit'],
    features: [
      'SHAP, LIME and feature attribution dashboards',
      'Bias detection and algorithmic fairness audits',
      'Regulatory compliance mapping for EU AI Act-style controls',
      'Model card generation and audit trails',
    ],
  }),
  catalogueProduct({
    id: 'vega-oas',
    slug: 'vega-oas',
    group: 'data-science',
    name: 'Vega OAS',
    kicker: 'Optimisation & Analytics System',
    summary: 'Convex and nonlinear optimisation engine for enterprise decision problems across supply chain, resource scheduling, portfolio allocation and operations research.',
    tags: ['Flagship', 'Optimisation', 'Analytics', 'OR'],
    features: [
      'Linear, nonlinear and integer programming solvers',
      'Stochastic optimisation and simulation',
      'Operations research workflow designer',
      'Sensitivity analysis and scenario modelling',
    ],
    featured: true,
  }),
  catalogueProduct({
    id: 'prism-bi',
    slug: 'prism-bi',
    group: 'data-science',
    name: 'Prism BI',
    kicker: 'Business Intelligence & Decision Platform',
    summary: 'AI-powered BI layer that transforms warehouse data into narrative intelligence through automated executive dashboards, natural language querying and recommendations.',
    tags: ['Decision Intel', 'BI', 'NLQ', 'Reporting'],
    features: [
      'Natural language to SQL query engine',
      'Automated narrative report generation',
      'Executive dashboard and KPI command centre',
      'Prescriptive action recommendations',
    ],
  }),
  catalogueProduct({
    id: 'orbit-cx',
    slug: 'orbit-cx',
    group: 'data-science',
    name: 'Orbit CX',
    kicker: 'Customer Intelligence & Segmentation',
    summary: '360-degree customer intelligence platform with ML-driven segmentation, CLV modelling, churn prediction and AI-powered personalisation engines.',
    tags: ['Customer Intel', 'Segmentation', 'Churn', 'CLV'],
    features: [
      'Behavioural segmentation and CLV modelling',
      'Churn prediction and retention intelligence',
      'Real-time personalisation engine',
      'Attribution modelling and campaign analytics',
    ],
  }),
  catalogueProduct({
    id: 'stratum-dx',
    slug: 'stratum-dx',
    group: 'data-engineering',
    name: 'Stratum DX',
    kicker: 'Data Engineering & Analytics Platform',
    summary: 'Medallion lakehouse accelerator with governed ingestion, Bronze-Silver-Gold transformation layers, lineage tracking, analytics products and trusted reporting foundations.',
    tags: ['Flagship', 'Data Platform', 'Lakehouse', 'DataOps'],
    features: [
      'Bronze-Silver-Gold medallion architecture',
      'High-throughput ETL and ELT with Spark and dbt',
      'Data lineage, cataloguing and governance',
      'SAP ECC, Synapse and Databricks integrations',
    ],
    featured: true,
    aliases: ['data-fabric-accelerator'],
  }),
  catalogueProduct({
    id: 'flux-cdc',
    slug: 'flux-cdc',
    group: 'data-engineering',
    name: 'Flux CDC',
    kicker: 'Real-Time Streaming & Change Data Capture',
    summary: 'High-throughput real-time data streaming platform with CDC pipelines, event-driven architecture, schema registry and exactly-once delivery guarantees.',
    tags: ['Streaming', 'CDC', 'Kafka', 'Flink'],
    features: [
      'Kafka and Flink-based streaming pipelines',
      'Database CDC with Debezium connectors',
      'Schema registry and data contract enforcement',
      'Exactly-once semantics and dead-letter queues',
    ],
  }),
  catalogueProduct({
    id: 'meridian-dq',
    slug: 'meridian-dq',
    group: 'data-engineering',
    name: 'Meridian DQ',
    kicker: 'Data Quality & Observability Platform',
    summary: 'Continuous data quality monitoring with rule engines, anomaly detection, pipeline observability and trust scores for full visibility into data asset health.',
    tags: ['Data Quality', 'Observability', 'Lineage', 'Trust'],
    features: [
      'Declarative quality rule engine for high-volume checks',
      'Statistical anomaly detection on data distributions',
      'End-to-end pipeline lineage and impact analysis',
      'Data trust scores and executive health reporting',
    ],
  }),
  catalogueProduct({
    id: 'corda-fs',
    slug: 'corda-fs',
    group: 'data-engineering',
    name: 'Corda FS',
    kicker: 'Feature Store & ML Data Platform',
    summary: 'Centralised feature store eliminating training-serving skew with versioned feature pipelines, point-in-time correctness and online/offline serving.',
    tags: ['ML Data', 'Feature Store', 'Feast', 'Lineage'],
    features: [
      'Online low-latency and offline batch feature serving',
      'Point-in-time correct training datasets',
      'Feature versioning, lineage and discovery portal',
      'Adapters for Feast, Tecton and Databricks Feature Store',
    ],
  }),
  catalogueProduct({
    id: 'helix-lz',
    slug: 'helix-lz',
    group: 'cloud-architecture',
    name: 'Helix LZ',
    kicker: 'Cloud Landing Zone Kit',
    summary: 'Secure, opinionated multi-cloud architecture patterns across Azure, AWS and GCP with governance rails, cost controls and GitOps pipelines from day one.',
    tags: ['Cloud', 'Azure', 'AWS', 'GCP'],
    features: [
      'Enterprise landing zone IaC with Terraform and Bicep',
      'Kubernetes orchestration and container governance',
      'FinOps dashboards and cloud cost guardrails',
      'GitOps CI/CD with security policy gates',
    ],
    aliases: ['cloud-landing-zone-kit'],
  }),
  catalogueProduct({
    id: 'krato-ml',
    slug: 'krato-ml',
    group: 'mlops-dataops',
    name: 'Krato ML',
    kicker: 'MLOps Command Stack',
    summary: 'End-to-end ML lifecycle platform covering experiment tracking, model registry, CI/CD for ML, drift monitoring and automated retraining workflows.',
    tags: ['MLOps', 'MLflow', 'Drift', 'ModelOps'],
    features: [
      'Experiment tracking and model versioning registry',
      'Automated retraining on drift thresholds',
      'Model deployment with canary and shadow modes',
      'Low-latency scoring controls and service-level monitoring',
    ],
    aliases: ['mlops-command-stack'],
  }),
  catalogueProduct({
    id: 'cipher-gx',
    slug: 'cipher-gx',
    group: 'cloud-architecture',
    name: 'Cipher GX',
    kicker: 'Cybersecurity & Cloud Security Posture',
    summary: 'Unified cloud security and governance platform for continuous CSPM, Zero Trust IAM, threat detection, SIEM integration and regulatory compliance.',
    tags: ['Security', 'CSPM', 'Zero Trust', 'SIEM'],
    features: [
      'Cloud security posture management',
      'Zero Trust identity and access governance',
      'SIEM integration and automated incident response',
      'Compliance frameworks covering ISO 27001, SOC 2 and NDPA',
    ],
  }),
  catalogueProduct({
    id: 'axiom-qr',
    slug: 'axiom-qr',
    group: 'data-science',
    name: 'Axiom QR',
    kicker: 'Quantitative Research & Statistical Modelling',
    summary: 'Mathematical consulting and research platform grounded in functional analysis, statistical modelling, actuarial work and bespoke quantitative research.',
    tags: ['Quant Research', 'Statistics', 'Bayesian', 'Actuarial'],
    features: [
      'Functional analysis and operator-theory applications',
      'Bayesian inference and high-dimensional modelling',
      'Actuarial modelling and insurance mathematics',
      'Academic-industry research partnerships',
    ],
  }),
  catalogueProduct({
    id: 'ledger-fm',
    slug: 'ledger-fm',
    group: 'fintech-blockchain',
    name: 'Ledger FM',
    kicker: 'Financial Mathematics & Risk Platform',
    summary: 'Quantitative finance solutions bridging stochastic calculus and production financial systems for derivatives pricing, risk modelling and portfolio optimisation.',
    tags: ['Financial Math', 'Risk', 'Quant Finance', 'Portfolio'],
    features: [
      'Stochastic modelling and derivatives pricing',
      'VaR, CVaR and stress testing frameworks',
      'Portfolio optimisation and asset allocation',
      'Algorithmic and quantitative strategy development',
    ],
  }),
  catalogueProduct({
    id: 'sigma-im',
    slug: 'sigma-im',
    group: 'data-science',
    name: 'Sigma IM',
    kicker: 'Industrial Mathematics & Simulation',
    summary: 'Mathematical modelling and simulation for engineering and operational problems across energy, manufacturing, logistics and physical systems.',
    tags: ['Industrial Math', 'Simulation', 'PDE', 'Operations'],
    features: [
      'ODE and PDE modelling for physical systems',
      'Convex optimisation and operations research',
      'Numerical methods and computational analysis',
      'Discrete-event and Monte Carlo simulation',
    ],
  }),
  catalogueProduct({
    id: 'volta-ei',
    slug: 'volta-ei',
    group: 'mlops-dataops',
    name: 'Volta EI',
    kicker: 'Edge AI & IoT Intelligence Platform',
    summary: 'Deploy lightweight, compressed AI models on edge devices and IoT infrastructure for industrial monitoring, predictive maintenance and edge inference.',
    tags: ['Edge AI', 'IoT', 'Anomaly Detection', 'Industry'],
    features: [
      'Model quantisation, pruning and edge compression',
      'IoT sensor telemetry pipelines with MQTT and OPC-UA',
      'Predictive maintenance and anomaly detection',
      'Industrial AI for energy and manufacturing sectors',
    ],
  }),
  catalogueProduct({
    id: 'forge-se',
    slug: 'forge-se',
    group: 'enterprise-software',
    name: 'Forge SE',
    kicker: 'Enterprise Software Engineering Accelerator',
    summary: 'Production-grade backend and API accelerator patterns for C# .NET, Python FastAPI and MERN systems engineered for enterprise reliability.',
    tags: ['Software', 'APIs', '.NET', 'FastAPI'],
    features: [
      'C# ASP.NET Core enterprise system templates',
      'Python FastAPI microservices accelerator',
      'MERN stack SaaS platform scaffold',
      'GraphQL, REST and event-driven API patterns',
    ],
  }),
  catalogueProduct({
    id: 'rhema-academy',
    slug: 'rhema-academy',
    name: 'Rhema Academy',
    kicker: 'Technical Training & Certification Platform',
    summary: 'Enterprise upskilling programmes in AI, data engineering, cloud architecture and applied mathematics delivered by production practitioners.',
    tags: ['Academy', 'Training', 'Certification', 'Upskilling'],
    features: [
      'Agentic AI and LLM engineering bootcamps',
      'Data engineering and cloud architecture programmes',
      'Applied mathematics for AI and ML teams',
      'Bespoke corporate training and certification tracks',
    ],
  }),
  catalogueProduct({
    id: 'rhema-press',
    slug: 'rhema-press',
    name: 'Rhema Press',
    kicker: 'Publication & Knowledge Product',
    summary: 'Publication product for enterprise AI, data engineering, cloud architecture and applied mathematics books, white papers and practitioner playbooks.',
    tags: ['Publications', 'Books', 'White Papers', 'Knowledge'],
    features: [
      'Enterprise AI, data and cloud publication catalogue',
      'Books, white papers and practitioner playbooks',
      'Research-backed implementation guidance for leaders and builders',
      'Publication workflows connected to RhemaAI advisory and training',
    ],
    aliases: ['rhemaai-press', 'publications'],
    productUrl: '/publications',
  }),
]

const METRICS = [
  { value: '04', label: 'platform product lines' },
  { value: '24/7', label: 'observable operations' },
  { value: '3x', label: 'cloud delivery coverage' },
]

function isInternalHref(href = '') {
  return href.startsWith('/') && !href.startsWith('//')
}

function CardLink({ link }) {
  if (isInternalHref(link.href)) {
    return (
      <Link to={link.href} className={link.className || styles.textAction}>
        {link.label}
      </Link>
    )
  }

  return (
    <a href={link.href} className={link.className || styles.textAction} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  )
}

function ProductCard({ product, accent }) {
  const detailHref = `/products/${product.slug || product._id}`
  const featurePreview = (product.features || []).slice(0, 3)
  const extraFeatureCount = Math.max((product.features?.length || 0) - featurePreview.length, 0)
  const tagPreview = (product.tags || []).filter((tag) => tag !== 'Flagship').slice(0, 3)
  const extraTagCount = Math.max(((product.tags || []).filter((tag) => tag !== 'Flagship').length) - tagPreview.length, 0)
  const secondaryLinks = [
    product.pricing?.paystackUrl && { href: product.pricing.paystackUrl, label: 'Buy Now - Paystack', className: styles.btnPaystack },
    product.demoUrl && { href: product.demoUrl, label: 'Open demo' },
    product.productUrl && { href: product.productUrl, label: 'View product' },
    product.assetUrl && { href: product.assetUrl, label: 'Download package' },
  ].filter(Boolean)

  return (
    <article className={styles.productCard} style={{ '--accent': accent }}>
      <div className={styles.productCardHeader}>
        {product.featured && (
          <div className={styles.pillRow}>
            <span className={styles.pillFlagship}>Flagship</span>
          </div>
        )}
        <h3 className={styles.productName}>
          <Link to={detailHref}>{product.name}</Link>
        </h3>
        {product.kicker && <span className={styles.productKicker}>{product.kicker}</span>}
      </div>

      <p className={styles.productSummary}>{product.summary || product.description}</p>

      {product.features?.length > 0 && (
        <ul className={styles.productFeatures}>
          {featurePreview.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      )}

      {extraFeatureCount > 0 && (
        <span className={styles.moreFeatures}>+{extraFeatureCount} more capabilities</span>
      )}

      <div className={styles.productCardMeta}>
        <div className={styles.tagRow}>
          {tagPreview.map((tag) => <em key={tag}>{tag}</em>)}
          {extraTagCount > 0 && <em>+{extraTagCount}</em>}
        </div>

        <div className={styles.priceRow}>
          {product.pricing?.amountNGN > 0 && (
            <span className={styles.priceNGN}>NGN {Number(product.pricing.amountNGN).toLocaleString()}</span>
          )}
          {product.pricing?.amount > 0 && (
            <span className={styles.priceUSD}>${Number(product.pricing.amount).toFixed(2)}</span>
          )}
          {(!product.pricing?.amount && !product.pricing?.amountNGN) && (
            <Link to="/contact" className={styles.priceContact}>Pricing on request</Link>
          )}
        </div>
      </div>

      {secondaryLinks.length > 0 && (
        <div className={styles.auxActions}>
          {secondaryLinks.map((link) => (
            <CardLink key={link.label} link={link} />
          ))}
        </div>
      )}

      <div className={styles.cardActions}>
        <Link to={detailHref} className={styles.productCta}>
          View details <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link to="/contact" className={styles.salesCta}>
          Contact sales
        </Link>
      </div>
    </article>
  )
}

const CATEGORY_FILTERS = [{ id: 'all', name: 'All' }, ...PRODUCT_CATEGORIES]

export default function ProductsPage() {
  const [products, setProducts] = useState(SEED_PRODUCTS)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    productsAPI.getAll({ limit: 48 })
      .then((data) => {
        if (data.products?.length) setProducts(mergeProducts(data.products))
      })
      .catch(() => { /* seed products stay visible */ })
  }, [])

  const visibleProducts = products.filter((product) => !EXCLUDED_FROM_GRID.includes(product.slug))
  const filteredProducts = activeCategory === 'all'
    ? visibleProducts
    : visibleProducts.filter((product) => resolveProductGroup(product) === activeCategory)
  const activeMeta = PRODUCT_CATEGORIES.find((cat) => cat.id === activeCategory)

  return (
    <div className={styles.page}>
      <PageSEO
        title="Enterprise AI & Data Platform Products | RhemaAI Solutions Ltd"
        description="RhemaAI Platform products for agentic AI, RAG, NLP, XAI, optimisation, BI, data engineering, streaming, MLOps, cloud, security, quantitative research, edge AI, technical training and publications."
        keywords="enterprise AI platform Nigeria, RAG platform, MLOps SaaS, cloud landing zone Azure, AI operations software, data engineering platform Africa, quantitative research platform, enterprise AI publications"
      />

      <section className={`${styles.hero} ${styles.productHero}`}>
        <div className={styles.radiance} />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.eyebrow}>RhemaAI Platform</span>
            <h1>Enterprise products for <span className={styles.heroTitleAccent}>governed AI, data and cloud operations</span>.</h1>
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
            <span aria-hidden="true">&middot;</span>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.filterBand}>
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={activeCategory === cat.id ? styles.activeFilter : ''}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </section>

      <section className={`${styles.section} ${styles.productSuiteSection}`}>
        <div className={`${styles.sectionHeader} ${styles.productSuiteHeader}`}>
          <span className={styles.eyebrow}>Product Suite</span>
          <h2>Composable product modules.</h2>
        </div>

        {activeMeta && (
          <div className={styles.categoryLabel} style={{ '--accent': activeMeta.color }}>
            <span>{activeMeta.name}</span>
            <div className={styles.categoryLine} />
          </div>
        )}

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => {
            const cat = productCategoryMeta(product)
            return (
              <ProductCard
                key={product._id || product.slug || product.name}
                product={product}
                accent={cat.color}
              />
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.stateText}>No products in this category yet.</div>
        )}
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
