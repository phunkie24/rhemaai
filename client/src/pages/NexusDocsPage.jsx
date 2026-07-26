import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CopyCode,
  NexusPage,
} from '@components/Nexus/NexusComponents'
import { NEXUS_DOC_SECTIONS, getNexusDoc } from '../data/nexusDocs'
import { NEXUS_BASE } from '../data/nexusContent'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

function headingId(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function normaliseSearch(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

export default function NexusDocsPage() {
  const { section: requestedSection } = useParams()
  const slug = requestedSection || 'getting-started'
  const doc = getNexusDoc(slug)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setMenuOpen(false)
    setFeedback('')
    if (doc) trackNexusEvent('nexus_docs_viewed', {
      route: `${NEXUS_BASE}/docs/${doc.slug}`,
      section: doc.slug,
    })
  }, [doc])

  const searchResults = useMemo(() => {
    const normalised = normaliseSearch(query)
    if (!normalised) return []
    return NEXUS_DOC_SECTIONS.filter((section) => (
      normaliseSearch([section.title, section.summary, ...section.groups.flatMap((group) => [
        group.heading,
        ...(group.body || []),
        ...(group.items || []),
        ...(group.definitions || []).flat(),
      ])].join(' ')).includes(normalised)
    ))
  }, [query])

  if (!doc) {
    return (
      <NexusPage
        title="Nexus Documentation Not Found"
        description="The requested Nexus AOS documentation section could not be found."
        breadcrumbs={[{ label: 'Documentation', path: `${NEXUS_BASE}/docs` }, { label: 'Not found', path: `${NEXUS_BASE}/docs/${slug}` }]}
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h1>Documentation section not found</h1>
            <p>Return to the documentation index to continue.</p>
            <Link to={`${NEXUS_BASE}/docs`} className={styles.primaryAction}>Documentation home</Link>
          </div>
        </section>
      </NexusPage>
    )
  }

  const index = NEXUS_DOC_SECTIONS.findIndex((section) => section.slug === doc.slug)
  const previous = NEXUS_DOC_SECTIONS[index - 1]
  const next = NEXUS_DOC_SECTIONS[index + 1]

  return (
    <NexusPage
      title={`${doc.title} | Nexus AOS Documentation`}
      description={doc.summary}
      keywords={`Nexus AOS documentation, ${doc.title}, CADABA, enterprise agent orchestration`}
      breadcrumbs={[{ label: 'Documentation', path: `${NEXUS_BASE}/docs` }, { label: doc.title, path: `${NEXUS_BASE}/docs/${doc.slug}` }]}
      noFinalCta
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: `${doc.title} — Nexus AOS Documentation`,
        dateModified: doc.updated,
        author: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
      }}
    >
      <header className={styles.docsHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Nexus AOS documentation</span>
          <h1>{doc.title}</h1>
          <p>{doc.summary}</p>
        </div>
        <div className={styles.docsMeta}><span>Preview 0.1</span><span>Updated {doc.updated}</span></div>
      </header>

      <div className={styles.docsSearchWrap}>
        <label>
          <span className="sr-only">Search Nexus documentation</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documentation…" />
        </label>
        <button type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="nexus-doc-navigation">
          {menuOpen ? 'Close sections' : 'Browse sections'}
        </button>
        {query && (
          <div className={styles.docsSearchResults} role="listbox" aria-label="Documentation search results">
            {searchResults.map((result) => (
              <Link key={result.slug} to={`${NEXUS_BASE}/docs/${result.slug}`} role="option" onClick={() => setQuery('')}>
                <strong>{result.title}</strong><span>{result.summary}</span>
              </Link>
            ))}
            {!searchResults.length && <p>No documentation sections match “{query}”.</p>}
          </div>
        )}
      </div>

      <div className={styles.docsLayout}>
        <aside id="nexus-doc-navigation" className={`${styles.docsSidebar} ${menuOpen ? styles.docsSidebarOpen : ''}`}>
          <strong>Documentation</strong>
          <nav aria-label="Documentation sections">
            {NEXUS_DOC_SECTIONS.map((section) => (
              <Link key={section.slug} to={`${NEXUS_BASE}/docs/${section.slug}`} aria-current={section.slug === doc.slug ? 'page' : undefined}>
                {section.title}
              </Link>
            ))}
          </nav>
          <Link to={`${NEXUS_BASE}/demo?useCase=developer-access`} className={styles.docsAccess}>Request pilot access</Link>
        </aside>

        <main className={styles.docsArticle}>
          {doc.groups.map((group) => (
            <section key={group.heading} id={headingId(group.heading)}>
              <h2>{group.heading}</h2>
              {(group.body || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {group.items && <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              {group.definitions && (
                <dl>{group.definitions.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
              )}
              {group.code && <CopyCode>{group.code}</CopyCode>}
            </section>
          ))}

          <div className={styles.docsFeedback}>
            <strong>Was this page useful?</strong>
            {feedback ? <span role="status">Thank you for the documentation feedback.</span> : (
              <div><button type="button" onClick={() => setFeedback('yes')}>Yes</button><button type="button" onClick={() => setFeedback('no')}>Not yet</button></div>
            )}
          </div>

          <nav className={styles.docsPager} aria-label="Documentation pagination">
            {previous ? <Link to={`${NEXUS_BASE}/docs/${previous.slug}`}><span>Previous</span><strong>{previous.title}</strong></Link> : <span />}
            {next && <Link to={`${NEXUS_BASE}/docs/${next.slug}`}><span>Next</span><strong>{next.title}</strong></Link>}
          </nav>
        </main>

        <aside className={styles.docsToc}>
          <strong>On this page</strong>
          <nav aria-label="On this page">
            {doc.groups.map((group) => <a href={`#${headingId(group.heading)}`} key={group.heading}>{group.heading}</a>)}
          </nav>
        </aside>
      </div>
    </NexusPage>
  )
}
