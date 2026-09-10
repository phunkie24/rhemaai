import { formatPrice } from '@utils/pricing'
import styles from './Price.module.css'

export default function Price({ pricing }) {
  return (
    <div className={styles.price}>
      <span className={styles.label}>Pricing</span>
      <strong>{formatPrice(pricing)}</strong>
    </div>
  )
}
