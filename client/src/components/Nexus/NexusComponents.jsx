import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PageSEO from '@components/common/PageSEO'
import { NEXUS_BASE, NEXUS_NAV_ITEMS } from '../../data/nexusContent'
import styles from './Nexus.module.css'

const BASE_URL = 'https://rhemaaisolutions.tech'
const NEXUS_SOCIAL_IMAGE = `${BASE_URL}/nexus-aos-social-preview.png`

export function NexusPage({
  children,
  title,
  description,
  keywords,
  breadcrumbs = [],
  structuredData,
  track,
  trackContext,
  noFinalCta = false,
}) {
  const { pathname } = useLocation()
  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: 'Nexus AOS', path: NEXUS_BASE },
    ...breadcrumbs,
  ]
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.path}`,
    })),
  }

  useEffect(() => {
    if (track) track(trackContext || { route: pathname })
    // Inline tracker callbacks must not create duplicate page-view events.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className={styles.page}>
      <PageSEO
        title={title}
        description={description}
        keywords={keywords}
        image={NEXUS_SOCIAL_IMAGE}
        structuredData={structuredData ? [breadcrumbJson, structuredData] : breadcrumbJson}
      />
      <NexusSubNavigation />
      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            {breadcrumbItems.map((item, index) => (
              <li key={item.path}>
                {index === breadcrumbItems.length - 1
                  ? <span aria-current="page">{item.label}</span>
                  : <Link to={item.path}>{item.label}</Link>}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {children}
      {!noFinalCta && <NexusFinalCTA />}
    </div>
  )
}

export function NexusSubNavigation() {
  return (
    <nav className={styles.subnav} aria-label="Nexus AOS">
      <Link to={NEXUS_BASE} className={styles.subnavBrand}>
        <span>N</span>
        <strong>Nexus AOS</strong>
      </Link>
      <div className={styles.subnavLinks}>
        {NEXUS_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === NEXUS_BASE}
            className={({ isActive }) => `${styles.subnavLink} ${isActive ? styles.subnavActive : ''} ${item.primary ? styles.subnavPrimary : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function NexusHero({ eyebrow, title, description, children, aside }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        {aside && <aside className={styles.heroAside}>{aside}</aside>}
      </div>
    </header>
  )
}

export function NexusCTAGroup({ actions }) {
  return (
    <div className={styles.actions}>
      {actions.map(([label, path, variant = 'primary']) => (
        <Link
          key={`${label}-${path}`}
          to={path}
          className={variant === 'primary' ? styles.primaryAction : variant === 'text' ? styles.textAction : styles.secondaryAction}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export function NexusSectionHeader({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
      {eyebrow && <span className={styles.sectionEyebrow}>{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export function WorkflowDiagram({ steps, label = 'Workflow' }) {
  return (
    <ol className={styles.workflow} aria-label={label}>
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  )
}

export function ArchitectureLayerDiagram({ layers, label = 'Nexus AOS logical architecture' }) {
  return (
    <ol className={styles.layerDiagram} aria-label={label}>
      {layers.map((layer, index) => (
        <li key={layer}>
          <span>{index + 1}</span>
          <strong>{layer}</strong>
        </li>
      ))}
    </ol>
  )
}

export function PillList({ items }) {
  return (
    <ul className={styles.pillList}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export function NexusFinalCTA() {
  return (
    <section className={styles.finalCta}>
      <div>
        <span className={styles.sectionEyebrow}>A controlled first step</span>
        <h2>Start with One Governed Agentic Workflow</h2>
        <p>Define the outcome, evidence, policy gates, accountable people and evaluation criteria before extending the operating model.</p>
      </div>
      <NexusCTAGroup actions={[
        ['Request a Demo', `${NEXUS_BASE}/demo`],
        ['Complete the Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`, 'secondary'],
        ['Explore Pilot Packages', `${NEXUS_BASE}/pricing`, 'text'],
      ]} />
    </section>
  )
}

export function CopyCode({ children }) {
  const handleCopy = async () => {
    if (navigator.clipboard) await navigator.clipboard.writeText(children)
  }
  return (
    <div className={styles.codeBlock}>
      <code>{children}</code>
      <button type="button" onClick={handleCopy} aria-label="Copy code example">Copy</button>
    </div>
  )
}
