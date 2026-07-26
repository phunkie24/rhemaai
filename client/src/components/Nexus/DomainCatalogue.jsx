import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FEATURED_DOMAIN_SLUGS,
  formatDesignCount,
  NEXUS_DOMAINS,
} from '../../data/nexusDomains'
import { NEXUS_BASE } from '../../data/nexusContent'
import { trackNexusEvent } from '../../utils/nexusAnalytics'
import styles from './Nexus.module.css'

export function DomainCard({ domain }) {
  const handleClick = () => trackNexusEvent('nexus_domain_selected', {
    domain: domain.slug,
    route: `${NEXUS_BASE}/solutions`,
  })

  return (
    <article className={styles.domainCard}>
      <div className={styles.domainCardTop}>
        <span>{domain.status}</span>
        <strong>{domain.percentage.toFixed(1)}%</strong>
      </div>
      <h3>
        <Link to={`${NEXUS_BASE}/solutions/${domain.slug}`} onClick={handleClick}>
          {domain.name}
        </Link>
      </h3>
      <p>{domain.description}</p>
      <ul>
        {domain.featuredApplications.slice(0, 3).map((application) => (
          <li key={application}>{application}</li>
        ))}
      </ul>
      <div className={styles.domainCardBottom}>
        <span>{formatDesignCount(domain.designCount)} designs</span>
        <Link to={`${NEXUS_BASE}/solutions/${domain.slug}`} onClick={handleClick}>
          Explore domain
        </Link>
      </div>
    </article>
  )
}

export default function DomainCatalogue({ compact = false }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState(compact ? 'featured' : 'designs')

  const domains = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase()
    const filtered = NEXUS_DOMAINS.filter((domain) => {
      const matchesStatus = status === 'all' || domain.status === status
      const haystack = [domain.name, domain.description, ...domain.featuredApplications].join(' ').toLowerCase()
      return matchesStatus && (!normalisedQuery || haystack.includes(normalisedQuery))
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'alphabetical') return a.name.localeCompare(b.name)
      if (sort === 'featured') {
        const featuredDifference = Number(FEATURED_DOMAIN_SLUGS.includes(b.slug)) - Number(FEATURED_DOMAIN_SLUGS.includes(a.slug))
        return featuredDifference || b.designCount - a.designCount
      }
      return b.designCount - a.designCount
    })
  }, [query, sort, status])

  return (
    <div>
      <div className={styles.domainControls}>
        <label className={styles.searchField}>
          <span>Search domains and applications</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search energy, procurement, risk…"
          />
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="featured">Featured</option>
            <option value="available">Available</option>
            <option value="exploratory">Exploratory</option>
          </select>
        </label>
        <label>
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="designs">Design count</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="featured">Featured status</option>
          </select>
        </label>
      </div>
      <p className={styles.resultCount} role="status">
        Showing {domains.length} of {NEXUS_DOMAINS.length} domains
      </p>
      <div className={styles.domainGrid}>
        {domains.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}
      </div>
      {!domains.length && (
        <div className={styles.emptyState}>
          <h3>No domains match that search</h3>
          <p>Try a broader application or reset the status filter.</p>
        </div>
      )}
    </div>
  )
}

export function DomainDistributionChart() {
  const energy = NEXUS_DOMAINS.find((domain) => domain.slug === 'energy')
  const remaining = NEXUS_DOMAINS.filter((domain) => domain.slug !== 'energy')
  const remainingShare = remaining.reduce((total, domain) => total + domain.percentage, 0)

  return (
    <div className={styles.distribution} aria-label={`Research design distribution: Energy ${energy.percentage.toFixed(1)} percent; other nineteen domains ${remainingShare.toFixed(1)} percent combined.`}>
      <div className={styles.distributionBar}>
        <span style={{ width: `${energy.percentage}%` }}>Energy {energy.percentage.toFixed(1)}%</span>
        <span style={{ width: `${100 - energy.percentage}%` }}>Other domains</span>
      </div>
      <div className={styles.distributionDetail}>
        {remaining.map((domain) => (
          <span key={domain.slug}>{domain.name} {domain.percentage.toFixed(1)}%</span>
        ))}
      </div>
    </div>
  )
}
