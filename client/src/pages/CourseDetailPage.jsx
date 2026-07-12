import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageSEO from '@components/common/PageSEO'
import { coursesAPI } from '@utils/api'
import enterpriseOpsImage from '../assets/enterprise-ai-operations.webp'
import { getCategoryMeta, LEVEL_COLOR, LEVEL_LABEL, SEED_COURSES } from './CoursesPage'
import styles from './ContentPage.module.css'

function categoryLabel(key) {
  return key ? getCategoryMeta(key).label : 'Course'
}

function priceLabel(pricing = {}) {
  if (pricing.amountNGN > 0) return `NGN ${Number(pricing.amountNGN).toLocaleString()}`
  if (pricing.amount > 0) return `${pricing.currency || 'USD'} ${Number(pricing.amount).toLocaleString()}`
  return pricing.label || 'Free'
}

function isPaid(pricing = {}) {
  return pricing.isFree === false || pricing.amount > 0 || pricing.amountNGN > 0
}

export default function CourseDetailPage() {
  const { slug } = useParams()
  const fallback = useMemo(
    () => SEED_COURSES.find((course) => course.slug === slug || course._id === slug),
    [slug]
  )
  const [course, setCourse] = useState(fallback)

  useEffect(() => {
    let active = true

    setCourse(fallback)
    coursesAPI.getById(slug)
      .then((data) => {
        if (!active) return
        setCourse(data.course || data)
      })
      .catch(() => {
        if (active) setCourse(fallback)
      })

    return () => { active = false }
  }, [fallback, slug])

  if (!course) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Course not found</span>
          <h1 className={styles.title}>This course is not available.</h1>
          <p className={styles.subtitle}>It may have moved, or it may not have been published yet.</p>
          <div className={styles.meta}>
            <Link to="/courses" className={styles.button}>Back to Courses</Link>
          </div>
        </div>
      </section>
    )
  }

  const pricing = course.pricing || {}
  const paid = isPaid(pricing)
  const canWatch = course.youtubeId && !paid
  const thumbnail = course.thumbnail || enterpriseOpsImage
  const category = getCategoryMeta(course.category)

  return (
    <div className={styles.page} style={{ '--content-accent': category.color }}>
      <PageSEO
        title={course.seo?.metaTitle || course.title}
        description={course.seo?.metaDescription || course.description || course.title}
        keywords={course.seo?.keywords?.join(', ') || course.tags?.join(', ')}
        image={thumbnail}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{categoryLabel(course.category)}</span>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.subtitle}>{course.description}</p>
          <div className={styles.meta}>
            <span>{priceLabel(pricing)}</span>
            {course.level && (
              <span style={{ color: LEVEL_COLOR[course.level] }}>{LEVEL_LABEL[course.level]}</span>
            )}
            {course.duration && <span>{course.duration}</span>}
            {course.instructor && <span>{course.instructor}</span>}
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.detailLayout}>
          <article className={styles.detailMain}>
            {canWatch ? (
              <div className={styles.videoFrame}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${course.youtubeId}?rel=0`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img className={styles.featureImage} src={thumbnail} alt="" loading="lazy" />
            )}

            <h2>Course Overview</h2>
            <p>
              {course.description || 'This course is designed for enterprise teams building production-grade AI, data and cloud systems.'}
            </p>

            {(course.tags || []).length > 0 && (
              <>
                <h2>Topics Covered</h2>
                <ul className={styles.list}>
                  {course.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </>
            )}
          </article>

          <aside className={styles.detailAside}>
            <h2>Course Details</h2>
            <div className={styles.factList}>
              <div><span>Category</span><strong>{categoryLabel(course.category)}</strong></div>
              <div><span>Price</span><strong>{priceLabel(pricing)}</strong></div>
              {course.level && <div><span>Level</span><strong>{LEVEL_LABEL[course.level]}</strong></div>}
              {course.duration && <div><span>Duration</span><strong>{course.duration}</strong></div>}
              {course.instructor && <div><span>Instructor</span><strong>{course.instructor}</strong></div>}
            </div>
            <div className={styles.actionStack}>
              {pricing.paymentUrl && (
                <a href={pricing.paymentUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
                  Enrol with Paystack
                </a>
              )}
              {!pricing.paymentUrl && course.youtubeUrl && !paid && (
                <a href={course.youtubeUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              )}
              <Link to="/contact" className={styles.secondaryButton}>Ask about team training</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
