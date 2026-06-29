import { useEffect, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicationsAPI } from '@utils/api'
import multiAgentBookCover from '../assets/multi-agent-book-cover.webp'
import authorPortrait from '../assets/author_portrait.webp'
import styles from './PlatformPages.module.css'

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'book', label: 'Books' },
  { value: 'whitepaper', label: 'White Papers' },
]

export const SEED_PUBLICATIONS = [
  {
    _id: 'seed-book-multi-agent-orchestration-patterns',
    title: 'Multi-Agent Orchestration Patterns for Enterprise Scale Systems',
    slug: 'multi-agent-orchestration-patterns-enterprise-scale-systems',
    type: 'book',
    summary: 'Architectures, patterns and operational practices for reliable, governed and scalable multi-agent AI systems in enterprise environments.',
    body: 'This publication gives enterprise teams a practical architecture map for multi-agent systems: orchestration patterns, governance controls, observability, data access boundaries and rollout practices for production environments.',
    coverImage: multiAgentBookCover,
    tags: ['Multi-Agent Systems', 'Agentic AI', 'Enterprise Architecture', 'Governance'],
    price: { amount: 0, currency: 'USD', label: 'New release' },
    publishedAt: '2026-06-10',
    featured: true,
    author: { name: 'Funke R. Yusuf' },
  },
  {
    _id: 'seed-book-1',
    title: 'Enterprise Agentic AI Playbook',
    slug: 'enterprise-agentic-ai-playbook',
    type: 'book',
    summary: 'A practical operating guide for designing governed multi-agent systems inside regulated enterprise environments.',
    body: 'A field guide for enterprise leaders and builders moving from agent demos to controlled AI operations. It covers governance, workflow design, measurement, deployment readiness and risk controls.',
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
    body: 'A concise cloud architecture brief covering landing-zone decisions for AI workloads: identity, network isolation, data boundaries, model hosting, telemetry and compliance-ready deployment patterns.',
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

function PublicationCard({ publication }) {
  const paystackUrl = publication.price?.paystackUrl
  const kindleUrl   = publication.price?.kindleUrl
  const price       = publication.price

  return (
    <article
      className={styles.publicationCard}
    >
      <div className={styles.publicationTop}>
        <span>{typeLabel(publication.type)}</span>
        {publication.featured && <strong>Featured</strong>}
      </div>
      {publication.coverImage && (
        <img
          className={styles.publicationCover}
          src={publication.coverImage}
          alt={`${publication.title} cover`}
          loading="lazy"
        />
      )}
      <h2>
        <Link to={`/publications/${publication.slug || publication._id}`}>{publication.title}</Link>
      </h2>
      <p>{publication.summary}</p>
      <div className={styles.tagRow}>
        {(publication.tags || []).slice(0, 4).map((tag) => <em key={tag}>{tag}</em>)}
      </div>

      <div className={styles.priceRow}>
        {price?.amountNGN > 0 && (
          <span className={styles.priceNGN}>₦{Number(price.amountNGN).toLocaleString()}</span>
        )}
        {price?.amount > 0 && (
          <span className={styles.priceUSD}>${Number(price.amount).toFixed(2)}</span>
        )}
        {(!price?.amount && !price?.amountNGN) && (
          <span className={styles.priceFree}>Free</span>
        )}
      </div>

      <div className={styles.publicationBottom}>
        <Link to={`/publications/${publication.slug || publication._id}`} className={styles.textAction}>View details</Link>
        {paystackUrl && (
          <a
            href={paystackUrl}
            className={styles.btnPaystack}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now — Paystack
          </a>
        )}
        {kindleUrl && (
          <a
            href={kindleUrl}
            className={styles.textAction}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on Amazon
          </a>
        )}
        {!paystackUrl && !kindleUrl && publication.documentUrl && (
          <a href={publication.documentUrl} className={styles.textAction} target="_blank" rel="noopener noreferrer">
            Open document
          </a>
        )}
        {!paystackUrl && !kindleUrl && !publication.documentUrl && (
          <Link to="/contact" className={styles.textAction}>Request access</Link>
        )}
      </div>
    </article>
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
        if (Array.isArray(data.publications)) setPublications(data.publications)
      })
      .catch(() => { /* seed publications stay visible */ })
      .finally(() => setLoading(false))
  }, [activeType])

  const filtered = activeType === 'all'
    ? publications
    : publications.filter((publication) => publication.type === activeType)

  return (
    <div className={styles.page}>
      <PageSEO
        title="AI & Data Engineering Books & Whitepapers | RhemaAI Press"
        description="Books and white papers from RhemaAI Press for enterprise AI, agentic AI, data engineering and cloud architecture leaders. Featuring Multi-Agent Orchestration Patterns — the essential guide to scalable LLM systems."
        keywords="AI books Nigeria, multi-agent orchestration patterns book, enterprise AI whitepaper, agentic AI book, data engineering publications, machine learning books Africa, Azure cloud whitepaper"
      />

      <section className={`${styles.hero} ${styles.colorHero}`}>
        <img src={authorPortrait} alt="" aria-hidden="true" className={styles.heroBgPortrait} loading="lazy" decoding="async" />
        <div className={styles.heroBgOverlay} />
        <div className={`${styles.heroInner} ${styles.heroSingle}`}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.eyebrow}>RhemaAI Press</span>
            <h1>Enterprise Data &amp; AI <span className={styles.heroTitleAccent}>books and white papers</span>.</h1>
            <p>
              A curated publication desk for practical books and white papers on data engineering,
              cloud architecture, machine learning, and enterprise AI — written for practitioners and decision-makers.
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
        {loading ? (
          <div className={styles.stateText}>Loading publications...</div>
        ) : (
          <div className={styles.publicationGrid}>
            {filtered.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
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
