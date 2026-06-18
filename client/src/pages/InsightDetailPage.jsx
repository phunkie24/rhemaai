import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('tsx', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('shell', bash)
SyntaxHighlighter.registerLanguage('sh', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('html', markup)
SyntaxHighlighter.registerLanguage('xml', markup)
SyntaxHighlighter.registerLanguage('sql', sql)
import { insightsAPI } from '@utils/api'
import { CATEGORIES, SEED_ARTICLES } from './InsightsPage'
import styles from './ContentPage.module.css'

function safeHref(value = '') {
  const href = value.trim()
  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:')
  ) return href
  return '#'
}

const MD_COMPONENTS = {
  // Fenced code blocks (language class present) → syntax highlighted
  // Inline code (no language class) → styled span
  pre({ children }) {
    return <>{children}</>
  },
  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || '')
    if (match) {
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          customStyle={{
            margin: '28px 0',
            borderRadius: '10px',
            fontSize: '14px',
            lineHeight: '1.65',
          }}
          showLineNumbers
          wrapLongLines
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }
    return <code className={styles.inlineCode}>{children}</code>
  },

  // Images → figure with caption (alt text becomes caption)
  img({ src, alt }) {
    return (
      <figure className={styles.figure}>
        <img src={src} alt={alt || ''} className={styles.articleImage} loading="lazy" />
        {alt && <figcaption className={styles.figcaption}>{alt}</figcaption>}
      </figure>
    )
  },

  // Links — external links open in new tab safely
  a({ href, children }) {
    const safe = safeHref(href)
    const isExternal = safe.startsWith('http')
    return (
      <a
        href={safe}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },

  // Tables — wrapped for horizontal scroll on mobile
  table({ children }) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>{children}</table>
      </div>
    )
  },
  th({ children }) {
    return <th className={styles.th}>{children}</th>
  },
  td({ children }) {
    return <td className={styles.td}>{children}</td>
  },

  // Blockquote
  blockquote({ children }) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>
  },

  // Headings — cap at h2 so SEO h1 remains the article title
  h1({ children }) {
    return <h2 className={styles.articleH2}>{children}</h2>
  },
  h2({ children }) {
    return <h2 className={styles.articleH2}>{children}</h2>
  },
  h3({ children }) {
    return <h3 className={styles.articleH3}>{children}</h3>
  },
  h4({ children }) {
    return <h4 className={styles.articleH4}>{children}</h4>
  },

  // Horizontal rule
  hr() {
    return <hr className={styles.hr} />
  },
}

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
      <Helmet>
        <title>{article.title} | RhemaAI Research</title>
        <meta name="description" content={article.excerpt} />
        {article.seo?.metaTitle && <meta property="og:title" content={article.seo.metaTitle} />}
        {article.seo?.metaDescription && <meta property="og:description" content={article.seo.metaDescription} />}
      </Helmet>

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

      <article className={styles.article}>
        {content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>
            {content}
          </ReactMarkdown>
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
