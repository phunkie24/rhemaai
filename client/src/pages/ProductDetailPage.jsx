import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PageSEO from '@components/common/PageSEO'
import { productsAPI } from '@utils/api'
import { SEED_PRODUCTS } from './ProductsPage'
import styles from './ContentPage.module.css'

function priceLabel(pricing = {}) {
  if (pricing.amountNGN > 0) return `NGN ${Number(pricing.amountNGN).toLocaleString()}`
  if (pricing.amount > 0) return `${pricing.currency || 'USD'} ${Number(pricing.amount).toLocaleString()}`
  return pricing.label || 'Contact sales'
}

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
  const [product, setProduct] = useState(fallback)

  useEffect(() => {
    let active = true

    setProduct(fallback)
    productsAPI.getById(slug)
      .then((data) => {
        if (!active) return
        setProduct(data.product || data)
      })
      .catch(() => {
        if (active) setProduct(fallback)
      })

    return () => { active = false }
  }, [fallback, slug])

  if (!product) {
    return (
      <section className={styles.hero}>
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
  const pricing = product.pricing || {}

  return (
    <div className={styles.page}>
      <PageSEO
        title={product.seo?.metaTitle || product.name}
        description={product.seo?.metaDescription || product.summary || product.description || product.name}
        keywords={product.seo?.keywords?.join(', ') || product.tags?.join(', ')}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{productCategory(product)}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.subtitle}>{product.summary || product.description}</p>
          <div className={styles.meta}>
            <span>{priceLabel(pricing)}</span>
            {product.version && <span>Version {product.version}</span>}
            {(product.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.detailLayout}>
          <article className={styles.detailMain}>
            <h2>Overview</h2>
            {description ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            ) : (
              <p>
                This product is designed as a reusable enterprise accelerator for AI,
                data and cloud teams that need governed delivery without rebuilding the
                operating model for every project.
              </p>
            )}

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
          </article>

          <aside className={styles.detailAside}>
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
