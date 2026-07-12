import { useState, useEffect } from 'react'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { insightsAPI } from '@utils/api'
import styles from './InsightsPage.module.css'

export const CATEGORIES = [
  { value: 'all',               label: 'All Topics',               color: '#0B5AA5' },
  { value: 'agentic-ai',        label: 'Agentic AI',               color: '#1515D8' },
  { value: 'data-engineering',  label: 'Data Engineering',         color: '#118CF2' },
  { value: 'data-science',      label: 'Data Science & Analytics', color: '#5A1098' },
  { value: 'cloud-architecture',label: 'Cloud Architecture',       color: '#3A3AF2' },
  { value: 'mlops',             label: 'MLOps & DataOps',          color: '#A5009D' },
  { value: 'enterprise-ai',     label: 'Enterprise AI',            color: '#7300CC' },
  { value: 'fintech',           label: 'FinTech',                  color: '#D00567' },
]

export function getCategoryMeta(value) {
  return CATEGORIES.find((category) => category.value === value) || CATEGORIES[0]
}

// Static seed articles (shown while API loads or if no data yet)
export const SEED_ARTICLES = [
  { _id: '1', slug: 'building-21-pattern-agentic-ai-systems', title: 'Building 21-Pattern Agentic AI Systems for Enterprise', category: 'agentic-ai', excerpt: 'A deep dive into the 21 agentic design patterns that form the foundation of production-grade multi-agent systems - from orchestration to observability.', readTime: 12, publishedAt: '2026-04-10', tags: ['ADAS', 'Multi-Agent', 'LLM'] },
  { _id: '2', slug: 'azure-vs-aws-enterprise-data-engineering-2026', title: 'Azure vs AWS for Enterprise Data Engineering in 2026', category: 'cloud-architecture', excerpt: 'A practical comparison of Microsoft Azure Synapse Analytics, Azure Databricks, and Amazon EMR for building enterprise-scale data lakehouses.', readTime: 10, publishedAt: '2026-03-28', tags: ['Azure', 'AWS', 'Data Lakehouse'] },
  { _id: '3', slug: 'rag-vs-fine-tuning-enterprise-ai', title: 'RAG vs Fine-Tuning: When to Use Each in Enterprise AI', category: 'agentic-ai', excerpt: 'The decision between retrieval-augmented generation and fine-tuned models is nuanced. Here\'s how we approach it for enterprise deployments.', readTime: 8, publishedAt: '2026-03-15', tags: ['RAG', 'Fine-Tuning', 'LLM'] },
  { _id: '4', slug: 'predictive-analytics-oil-gas-framework', title: 'Predictive Analytics in Oil & Gas: A Practical Framework', category: 'data-science', excerpt: 'How we applied predictive maintenance models, demand forecasting, and anomaly detection to a major West African energy company\'s operations.', readTime: 11, publishedAt: '2026-02-20', tags: ['Predictive', 'Oil & Gas', 'Machine Learning'] },
  { _id: '5', slug: 'medallion-architecture-bronze-silver-gold-databricks', title: 'Medallion Architecture: Bronze-Silver-Gold with Databricks', category: 'data-engineering', excerpt: 'A complete walkthrough of designing and implementing a production Medallion lakehouse on Azure Databricks - including CDC patterns and data quality layers.', readTime: 14, publishedAt: '2026-02-05', tags: ['Databricks', 'Delta Lake', 'Medallion'] },
  { _id: '6', slug: 'mlops-at-scale-enterprise-deployments', title: 'MLOps at Scale: Lessons from 10 Enterprise Deployments', category: 'mlops', excerpt: 'What we\'ve learned building MLOps pipelines for enterprise clients - from experiment tracking and model registry to drift detection and automated retraining.', readTime: 9, publishedAt: '2026-01-18', tags: ['MLflow', 'AzureML', 'Model Monitoring'] },
]

function ArticleCard({ article, index }) {
  const category = getCategoryMeta(article.category)
  const catLabel = category.value === 'all' && article.category ? article.category : category.label
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const href = `/insights/${article.slug || article._id}`

  return (
    <motion.article
      className={styles.card}
      style={{ '--cat-color': category.color }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardCat}>{catLabel}</span>
        <span className={styles.cardRead}>{article.readTime} min read</span>
      </div>
      <h2 className={styles.cardTitle}>
        <Link to={href}>{article.title}</Link>
      </h2>
      <p className={styles.cardExcerpt}>{article.excerpt}</p>
      <div className={styles.cardTags}>
        {(article.tags || []).slice(0, 3).map(t => (
          <span key={t} className={styles.cardTag}>{t}</span>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>{date}</span>
        <Link to={href} className={styles.cardLink}>
          Read Article
        </Link>
      </div>
    </motion.article>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [articles, setArticles] = useState(SEED_ARTICLES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    insightsAPI.getAll({ category: activeCategory, limit: 12 })
      .then(data => {
        if (data.insights?.length) setArticles(data.insights)
      })
      .catch(() => { /* use seed data */ })
      .finally(() => setLoading(false))
  }, [activeCategory])

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <>
      <PageSEO
        title="AI & Data Engineering Research | RhemaAI Labs"
        description="Enterprise AI research, data engineering guides, agentic AI architecture, machine learning patterns, Azure cloud, MLOps, and BI analytics insights from RhemaAI Labs — written for senior practitioners in Nigeria, UK, US, UAE and globally."
        keywords="AI research blog Nigeria, data engineering articles, agentic AI guides, machine learning research, Azure cloud architecture tutorials, MLOps insights, enterprise AI blog Africa, data science research UK"
      />

      {/* Hero */}
      <div className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className={styles.heroLabel}>RhemaAI Labs</span>
          <h1 className={styles.heroTitle}>Research for<br /><span className={styles.heroAccent}>Enterprise Intelligence</span></h1>
          <p className={styles.heroDesc}>Technical research, architectural guides, and strategic thinking from the RhemaAI Solutions Ltd team, written for enterprise practitioners.</p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`${styles.filterBtn} ${activeCategory === cat.value ? styles.filterActive : ''}`}
            style={{ '--cat-color': cat.color }}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className={styles.articlesSection}>
        {loading ? (
          <div className={styles.loading}>Loading research...</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((a, i) => <ArticleCard key={a._id} article={a} index={i} />)}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>No research notes in this category yet. Check back soon.</div>
        )}
      </div>

      {/* Newsletter signup */}
      <div className={styles.newsletterBanner}>
        <h2>Get Research in Your Inbox</h2>
        <p>New articles on agentic AI, cloud architecture, data science, and enterprise engineering, delivered when they are published.</p>
        <Link to="/#newsletter" className={styles.nlBtn}>Subscribe to Research</Link>
      </div>
    </>
  )
}
