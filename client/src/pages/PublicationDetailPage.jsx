import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '@components/common/MarkdownContent'
import PageSEO from '@components/common/PageSEO'
import { publicationsAPI } from '@utils/api'
import { SEED_PUBLICATIONS } from './PublicationsPage'
import styles from './ContentPage.module.css'

function typeLabel(type) {
  if (type === 'whitepaper') return 'White Paper'
  if (type === 'book') return 'Book'
  return type || 'Publication'
}

function priceLabel(price = {}) {
  if (price.amountNGN > 0) return `NGN ${Number(price.amountNGN).toLocaleString()}`
  if (price.amount > 0) return `${price.currency || 'USD'} ${Number(price.amount).toLocaleString()}`
  return price.label || 'Free'
}

export default function PublicationDetailPage() {
  const { slug } = useParams()
  const fallback = useMemo(
    () => SEED_PUBLICATIONS.find((publication) => publication.slug === slug || publication._id === slug),
    [slug]
  )
  const [publication, setPublication] = useState(fallback)

  useEffect(() => {
    let active = true

    setPublication(fallback)
    publicationsAPI.getById(slug)
      .then((data) => {
        if (!active) return
        setPublication(data.publication || data)
      })
      .catch(() => {
        if (active) setPublication(fallback)
      })

    return () => { active = false }
  }, [fallback, slug])

  if (!publication) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Publication not found</span>
          <h1 className={styles.title}>This publication is not available.</h1>
          <p className={styles.subtitle}>It may have moved, or it may not have been published yet.</p>
          <div className={styles.meta}>
            <Link to="/publications" className={styles.button}>Back to Publications</Link>
          </div>
        </div>
      </section>
    )
  }

  const body = publication.body?.trim()
  const price = publication.price || {}

  return (
    <div className={styles.page}>
      <PageSEO
        title={publication.seo?.metaTitle || publication.title}
        description={publication.seo?.metaDescription || publication.summary}
        keywords={publication.seo?.keywords?.join(', ') || publication.tags?.join(', ')}
        image={publication.coverImage}
        type="article"
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{typeLabel(publication.type)}</span>
          <h1 className={styles.title}>{publication.title}</h1>
          <p className={styles.subtitle}>{publication.summary}</p>
          <div className={styles.meta}>
            <span>{priceLabel(price)}</span>
            {publication.author?.name && <span>{publication.author.name}</span>}
            {publication.publishedAt && (
              <span>{new Date(publication.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            )}
            {(publication.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.detailLayout}>
          <article className={styles.detailMain}>
            {body ? (
              <MarkdownContent>
                {body}
              </MarkdownContent>
            ) : (
              <>
                <h2>About this publication</h2>
                <p>{publication.summary}</p>
                <p>
                  This page collects the publication details, access options and related metadata
                  so every item in the publication library has a durable URL.
                </p>
              </>
            )}
          </article>

          <aside className={styles.detailAside}>
            {publication.coverImage && (
              <img className={styles.mediaImage} src={publication.coverImage} alt={`${publication.title} cover`} loading="lazy" />
            )}
            <h2>Access</h2>
            <div className={styles.factList}>
              <div><span>Type</span><strong>{typeLabel(publication.type)}</strong></div>
              <div><span>Price</span><strong>{priceLabel(price)}</strong></div>
              {publication.documentLabel && <div><span>File</span><strong>{publication.documentLabel}</strong></div>}
            </div>
            <div className={styles.actionStack}>
              {price.paystackUrl && (
                <a href={price.paystackUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
                  Buy with Paystack
                </a>
              )}
              {price.kindleUrl && (
                <a href={price.kindleUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              )}
              {publication.documentUrl && (
                <a href={publication.documentUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                  Open document
                </a>
              )}
              <Link to="/contact" className={styles.secondaryButton}>Request access</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
