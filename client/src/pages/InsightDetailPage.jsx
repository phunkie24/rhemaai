import { useEffect, useMemo, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '@components/common/MarkdownContent'
import { insightsAPI } from '@utils/api'
import { CATEGORIES, SEED_ARTICLES } from './InsightsPage'
import styles from './ContentPage.module.css'

const BODY_SECTIONS = [
  {
    title: 'Executive lens',
    body: 'Enterprise AI succeeds when architecture, governance and adoption are designed together. The technical stack matters, but the operating model determines whether teams can trust and scale what is built.',
  },
  {
    title: 'Architecture lens',
    body: 'A production system needs observable data flows, clear model boundaries, security controls, deployment automation and business-facing metrics. Those controls are not ceremony; they are how AI work survives audit, growth and change.',
  },
  {
    title: 'Delivery lens',
    body: 'The fastest path is usually a narrow production slice: one valuable workflow, one measurable outcome, and one reusable platform pattern that can be extended after the first release proves itself.',
  },
]

export default function InsightDetailPage() {
  const { slug } = useParams()
  const fallback = useMemo(
    () => SEED_ARTICLES.find((article) => article.slug === slug || article._id === slug),
    [slug]
  )
  const [article, setArticle] = useState(fallback)

  useEffect(() => {
    let active = true

    insightsAPI.getById(slug)
      .then((data) => {
        if (active && data?.insight) setArticle(data.insight)
        if (active && data?._id) setArticle(data)
      })
      .catch(() => {
        if (active) setArticle(fallback)
      })

    return () => { active = false }
  }, [fallback, slug])

  if (!article) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Research article not found</span>
          <h1 className={styles.title}>This article is not available.</h1>
          <p className={styles.subtitle}>
            It may have moved, or it may not have been published yet.
          </p>
          <div className={styles.meta}>
            <Link to="/insights" className={styles.button}>Back to Research</Link>
          </div>
        </div>
      </section>
    )
  }

  const category = CATEGORIES.find((cat) => cat.value === article.category)?.label || article.category
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const content = article.content?.trim()

  return (
    <div className={styles.page}>
      <PageSEO
        title={article.seo?.metaTitle || article.title}
        description={article.seo?.metaDescription || article.excerpt}
        keywords={article.tags?.join(', ')}
        type="article"
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.subtitle}>{article.excerpt}</p>
          <div className={styles.meta}>
            <span>{date}</span>
            <span>{article.readTime || 8} min read</span>
            {article.author?.name && <span>{article.author.name}</span>}
            {(article.tags || []).slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {article.architectureImage ? (
        <section className={styles.content}>
          <div className={styles.detailLayout}>
            <div className={styles.detailMain}>
              {content ? (
                <MarkdownContent>
                  {content}
                </MarkdownContent>
              ) : (
                <>
                  <p>
                    This field note captures how RhemaAI Solutions Ltd approaches the problem in production
                    environments, where architecture decisions have to balance speed, governance,
                    maintainability and measurable business value.
                  </p>
                  {BODY_SECTIONS.map((section) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                </>
              )}
            </div>
            <aside className={styles.detailAside}>
              <h2>System Architecture</h2>
              <img
                src={article.architectureImage}
                alt="System architecture diagram"
                className={styles.mediaImage}
                loading="lazy"
              />
            </aside>
          </div>
        </section>
      ) : (
        <article className={styles.article}>
          {content ? (
            <MarkdownContent>
              {content}
            </MarkdownContent>
          ) : (
            <>
              <p>
                This field note captures how RhemaAI Solutions Ltd approaches the problem in production
                environments, where architecture decisions have to balance speed, governance,
                maintainability and measurable business value.
              </p>
              {BODY_SECTIONS.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </>
          )}
        </article>
      )}

      <section className={styles.cta}>
        <div>
          <h2>Turn this thinking into a roadmap</h2>
          <p>Book a discovery call and we will map the first production slice for your team.</p>
        </div>
        <Link to="/contact" className={styles.button}>Book consultation</Link>
      </section>
    </div>
  )
}
