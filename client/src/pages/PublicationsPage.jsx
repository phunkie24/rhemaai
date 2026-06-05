import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicationsAPI } from '@utils/api'
import styles from './PlatformPages.module.css'

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'book', label: 'Books' },
  { value: 'whitepaper', label: 'White Papers' },
]

const SEED_PUBLICATIONS = [
  {
    _id: 'seed-book-1',
    title: 'Enterprise Agentic AI Playbook',
    slug: 'enterprise-agentic-ai-playbook',
    type: 'book',
    summary: 'A practical operating guide for designing governed multi-agent systems inside regulated enterprise environments.',
    tags: ['Agentic AI', 'Governance', 'Architecture'],
    price: { amount: 49, currency: 'USD', label: 'Digital edition' },
    publishedAt: '2026-05-18',
    featured: true,
  },
  {
    _id: 'seed-whitepaper-1',
    title: 'Cloud Landing Zones for AI Workloads',
    slug: 'cloud-landing-zones-ai-workloads',
    type: 'whitepaper',
    summary: 'A concise architecture brief for secure AI workloads across Azure, AWS and GCP delivery environments.',
    tags: ['Cloud', 'Security', 'AI Platform'],
    price: { amount: 0, currency: 'USD', label: 'Free' },
    publishedAt: '2026-03-09',
  },
]

function typeLabel(type) {
  return TYPES.find((item) => item.value === type)?.label || type
}

function formatPrice(price = {}) {
  if (!price.amount) return price.label || 'Free'
  return `${price.currency || 'USD'} ${Number(price.amount).toLocaleString()}`
}

function PublicationCard({ publication, index }) {
  const kindleUrl = publication.price?.kindleUrl || publication.price?.paymentUrl
  const actionUrl = kindleUrl || publication.documentUrl
  const isExternal = /^https?:\/\//.test(actionUrl || '')
  const actionLabel = kindleUrl
    ? 'Buy on Amazon Kindle'
    : publication.documentUrl
      ? 'Open document'
      : 'Request access'

  return (
    <motion.article
      className={styles.publicationCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      <div className={styles.publicationTop}>
        <span>{typeLabel(publication.type)}</span>
        {publication.featured && <strong>Featured</strong>}
      </div>
      <h2>{publication.title}</h2>
      <p>{publication.summary}</p>
      <div className={styles.tagRow}>
        {(publication.tags || []).slice(0, 4).map((tag) => <em key={tag}>{tag}</em>)}
      </div>
      <div className={styles.publicationBottom}>
        <span>{formatPrice(publication.price)}</span>
        {actionUrl ? (
          <a
            href={actionUrl}
            className={styles.textAction}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {actionLabel}
          </a>
        ) : (
          <Link to="/contact" className={styles.textAction}>Request access</Link>
        )}
      </div>
    </motion.article>
  )
}

export default function PublicationsPage() {
  const [activeType, setActiveType] = useState('all')
  const [publications, setPublications] = useState(SEED_PUBLICATIONS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    publicationsAPI.getAll({ type: activeType, limit: 24 })
      .then((data) => {
        if (data.publications?.length) setPublications(data.publications)
      })
      .catch(() => { /* seed publications stay visible */ })
      .finally(() => setLoading(false))
  }, [activeType])

  const filtered = activeType === 'all'
    ? publications
    : publications.filter((publication) => publication.type === activeType)

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Publications | RhemaAI Press | RhemaAI Solutions Ltd</title>
        <meta
          name="description"
          content="Books and white papers from RhemaAI Press for enterprise AI, cloud architecture and data engineering leaders."
        />
        <meta name="keywords" content="RhemaAI Press, AI books, enterprise AI white papers, cloud white papers, data engineering publications" />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.radiance} />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.eyebrow}>RhemaAI Press</span>
            <h1>Enterprise AI books and white papers.</h1>
            <p>
              A curated publication desk for practical AI engineering books,
              cloud architecture white papers, and executive technology decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.filterBand}>
        {TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            className={activeType === type.value ? styles.activeFilter : ''}
            onClick={() => setActiveType(type.value)}
          >
            {type.label}
          </button>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Publication Library</span>
          <h2>Books and white papers with pricing, access links and SEO-ready metadata.</h2>
        </div>

        {loading ? (
          <div className={styles.stateText}>Loading publications...</div>
        ) : (
          <div className={styles.publicationGrid}>
            {filtered.map((publication, index) => (
              <PublicationCard key={publication._id} publication={publication} index={index} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className={styles.stateText}>No publications are available in this category yet.</div>
        )}
      </section>
    </div>
  )
}
