import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '@components/common/MarkdownContent'
import Price from '@components/common/Price'
import PageSEO from '@components/common/PageSEO'
import { productsAPI } from '@utils/api'
import { formatPrice as priceLabel, PRODUCT_PRICING } from '@utils/pricing'
import { SEED_PRODUCTS } from './ProductsPage'
import styles from './ContentPage.module.css'
import effects from './ProductEffects.module.css'

function productCategory(product) {
  return product.kicker || product.category || 'Platform product'
}

function productMatchesRoute(product, slug) {
  return product.slug === slug || product._id === slug || product.aliases?.includes(slug)
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const fallback = useMemo(
    () => SEED_PRODUCTS.find((product) => productMatchesRoute(product, slug)),
    [slug]
  )
  const [result, setResult] = useState({ slug, product: fallback, loading: !fallback })
  const product = result.slug === slug ? result.product : fallback
  const loading = result.slug === slug ? result.loading : !fallback

  useEffect(() => {
    let active = true

    setResult({ slug, product: fallback, loading: !fallback })
    productsAPI.getById(slug)
      .then((data) => {
        if (!active) return
        const loaded = data.product || data
        setResult({ slug, loading: false, product: {
          ...fallback,
          ...loaded,
          features: loaded.features?.length ? loaded.features : fallback?.features || [],
          tags: loaded.tags?.length ? loaded.tags : fallback?.tags || [],
        } })
      })
      .catch(() => {
        if (active) setResult({ slug, product: fallback, loading: false })
      })

    return () => { active = false }
  }, [fallback, slug])

  if (loading) {
    return <section className={`brand-header ${styles.hero}`}><div className={styles.heroInner}><p className={styles.subtitle} role="status">Loading product details…</p></div></section>
  }

  if (!product) {
    return (
      <section className={`brand-header ${styles.hero}`}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Product not found</span>
          <h1 className={styles.title}>This product is not available.</h1>
          <p className={styles.subtitle}>It may have moved, or it may not have been published yet.</p>
          <div className={styles.meta}>
            <Link to="/products" className={styles.button}>Back to Products</Link>
          </div>
        </div>
      </section>
    )
  }

  const description = product.description?.trim()
  const pricing = { ...product.pricing, ...PRODUCT_PRICING[product.slug] }
  const features = product.features || []
  const showFeatures = features.length > 0 && !features.every((feature) => description?.includes(feature))
  const initials = product.name.split(/\s+/).map((word) => word[0]).join('').slice(0, 3)

  return (
    <div key={slug} className={`${styles.page} ${styles.productPage}`}>
      <PageSEO
        title={product.seo?.metaTitle || product.name}
        description={product.seo?.metaDescription || product.summary || product.description || product.name}
        keywords={product.seo?.keywords?.join(', ') || product.tags?.join(', ')}
      />

      <section className={`brand-header ${styles.hero} ${effects.detailHero}`}>
        <div className={styles.heroInner}>
          <nav className={effects.breadcrumbs} aria-label="Breadcrumb"><Link to="/products">Products</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
          <div className={effects.heroLayout}>
          <motion.div className={effects.heroCopy} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className={styles.label}>{productCategory(product)}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.subtitle}>{product.summary || product.description}</p>
          <div className={styles.meta}>
            <span>{priceLabel(pricing)}</span>
            {product.version && <span>Version {product.version}</span>}
          </div>
          <div className={effects.heroActions}>
            <Link to="#product-details" className={styles.secondaryButton}>Explore capabilities</Link>
            <Link to="#product-pricing" className={styles.secondaryButton}>View pricing</Link>
          </div>
          </motion.div>
          <div className={effects.productVisual} aria-hidden="true">
            <div className={`${effects.visualLayer} ${effects.layerBack}`} />
            <div className={`${effects.visualLayer} ${effects.layerMiddle}`} />
            <div className={effects.visualCore}><strong>{initials}</strong><span>RhemaAI Platform</span></div>
            <div className={effects.signalRail}><i /><i /><i /></div>
          </div>
          </div>
        </div>
      </section>

      <section className={`${styles.content} ${effects.detailsSection}`} id="product-details">
        <div className={styles.detailLayout}>
          <motion.article className={`${styles.detailMain} ${effects.detailContent}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.45 }}>
            <h2>Overview</h2>
            {description ? (
              <MarkdownContent>
                {description}
              </MarkdownContent>
            ) : (
              <p>
                This product is designed as a reusable enterprise accelerator for AI,
                data and cloud teams that need governed delivery without rebuilding the
                operating model for every project.
              </p>
            )}

            {showFeatures && (
              <section className={effects.featureSection}>
                <h2>Full capabilities</h2>
                <ul className={effects.featureGrid}>
                  {features.map((feature, index) => <li key={feature}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{feature}</p></li>)}
                </ul>
              </section>
            )}
            {product.tags?.length > 0 && (
              <section className={effects.featureSection}>
                <h2>Technologies &amp; focus areas</h2>
                <div className={styles.meta}>{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </section>
            )}
            <section id="product-pricing" className={effects.pricingPanel}>
              <h2>Pricing &amp; deployment options</h2>
              <Price pricing={pricing} expanded />
            </section>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>Operating Focus</h3>
                <p>Designed for production teams that need accountability, observability and practical deployment controls.</p>
              </div>
              <div className={styles.card}>
                <h3>Delivery Model</h3>
                <p>Use it as a focused accelerator or combine it with RhemaAI services for a complete implementation path.</p>
              </div>
            </div>
          </motion.article>

          <aside className={`${styles.detailAside} ${effects.actionPanel}`}>
            <h2>Product Actions</h2>
            <div className={styles.factList}>
              <div><span>Category</span><strong>{productCategory(product)}</strong></div>
              <div><span>Price</span><strong>{priceLabel(pricing)}</strong></div>
              {product.version && <div><span>Version</span><strong>{product.version}</strong></div>}
            </div>
            <div className={styles.actionStack}>
              {pricing.paystackUrl && (
                <a href={pricing.paystackUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
                  Buy with Paystack
                </a>
              )}
              {product.demoUrl && (
                <a href={product.demoUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                  Open demo
                </a>
              )}
              {product.productUrl && (
                <a href={product.productUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                  View product
                </a>
              )}
              {product.assetUrl && (
                <a href={product.assetUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                  Download package
                </a>
              )}
              <Link to="/contact" className={styles.secondaryButton}>Ask about this product</Link>
              <Link to="/products#product-suite" className={styles.secondaryButton}>Back to Products</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <h2>Need this adapted to your operating model?</h2>
          <p>Book a discovery call and map the safest first implementation path.</p>
        </div>
        <Link to="/contact" className={styles.button}>Book consultation</Link>
      </section>
    </div>
  )
}
