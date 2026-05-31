import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './ContentPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <Helmet>
        <title>Page Not Found | RhemaAI Solutions Ltd</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>404</span>
          <h1 className={styles.title}>This page is not part of the current architecture.</h1>
          <p className={styles.subtitle}>
            The link may be outdated, or the resource may have moved during a site update.
          </p>
          <div className={styles.meta}>
            <Link to="/" className={styles.button}>Return home</Link>
            <Link to="/contact" className={styles.button}>Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
