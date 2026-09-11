import { formatPrice } from '@utils/pricing'
import styles from './Price.module.css'

export default function Price({ pricing, expanded = false }) {
  return (
    <div className={styles.price}>
      <span className={styles.label}>{pricing?.basis?.replace(' start from', '') || 'Pricing'}</span>
      <strong>{formatPrice(pricing)}</strong>
      {pricing?.tiers?.length > 0 && (
        <details className={styles.details} open={expanded}>
          <summary>View pricing options</summary>
          <dl className={styles.tiers}>
            {pricing.tiers.map((tier) => (
              <div key={tier.name}>
                <dt>{tier.name}</dt>
                <dd>{formatPrice(tier)}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </div>
  )
}
