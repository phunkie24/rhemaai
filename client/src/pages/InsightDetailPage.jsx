import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
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

function safeHref(value = '') {
  const href = value.trim()
  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:')
  ) {
    return href
  }
  return '#'
}

function renderInline(text, keyPrefix) {
  const parts = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${keyPrefix}-${match.index}`

    if (token.startsWith('**')) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      parts.push(<code key={key} className={styles.inlineCode}>{token.slice(1, -1)}</code>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        parts.push(
          <a key={key} href={safeHref(linkMatch[2])}>
            {linkMatch[1]}
          </a>
        )
      }
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length ? parts : text
}

function normalizeMarkdown(content = '') {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n|\\n|\\r/g, '\n')
    .replace(/([^\n])\s+(#{1,4}\s+)/g, '$1\n\n$2')
    .replace(/([^\n])\s+([-*]\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/([^\n])\s+(\d+\.\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function MarkdownContent({ content }) {
  const elements = []
  const lines = normalizeMarkdown(content).split('\n')
  let paragraph = []
  let listItems = []
  let listType = ''
  let blockquote = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(' ').trim()
    if (text) {
      elements.push(<p key={`p-${elements.length}`}>{renderInline(text, `p-${elements.length}`)}</p>)
    }
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    const Tag = listType === 'ol' ? 'ol' : 'ul'
    elements.push(
      <Tag key={`list-${elements.length}`}>
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item, `li-${elements.length}-${index}`)}</li>
        ))}
      </Tag>
    )
    listItems = []
    listType = ''
  }

  const flushBlockquote = () => {
    if (!blockquote.length) return
    const text = blockquote.join(' ').trim()
    if (text) {
      elements.push(
        <blockquote key={`quote-${elements.length}`}>
          {renderInline(text, `quote-${elements.length}`)}
        </blockquote>
      )
    }
    blockquote = []
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      flushBlockquote()
      return
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      flushBlockquote()
      const level = Math.min(Math.max(Number(heading[1].length), 2), 4)
      const Tag = `h${level}`
      elements.push(<Tag key={`heading-${elements.length}`}>{renderInline(heading[2], `heading-${elements.length}`)}</Tag>)
      return
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/)
    if (ordered) {
      flushParagraph()
      flushBlockquote()
      if (listType && listType !== 'ol') flushList()
      listType = 'ol'
      listItems.push(ordered[1])
      return
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      flushParagraph()
      flushBlockquote()
      if (listType && listType !== 'ul') flushList()
      listType = 'ul'
      listItems.push(unordered[1])
      return
    }

    const quote = trimmed.match(/^>\s?(.+)$/)
    if (quote) {
      flushParagraph()
      flushList()
      blockquote.push(quote[1])
      return
    }

    flushList()
    flushBlockquote()
    paragraph.push(trimmed)
  })

  flushParagraph()
  flushList()
  flushBlockquote()

  return <>{elements}</>
}

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

    return () => {
      active = false
    }
  }, [fallback, slug])

  if (!article) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Insight not found</span>
          <h1 className={styles.title}>This article is not available.</h1>
          <p className={styles.subtitle}>
            It may have moved, or it may not have been published yet.
          </p>
          <div className={styles.meta}>
            <Link to="/insights" className={styles.button}>Back to research</Link>
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
      <Helmet>
        <title>{article.title} | RhemaAI Solutions Ltd Insights</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.subtitle}>{article.excerpt}</p>
          <div className={styles.meta}>
            <span>{date}</span>
            <span>{article.readTime || 8} min read</span>
            {(article.tags || []).slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <article className={styles.article}>
        {content ? (
          <MarkdownContent content={content} />
        ) : (
          <>
            <p>
              This field note captures how RhemaAI Solutions Ltd approaches the problem in production environments, where architecture decisions have to balance speed, governance, maintainability and measurable business value.
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
