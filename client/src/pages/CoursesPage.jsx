import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { coursesAPI } from '@utils/api'
import styles from './CoursesPage.module.css'

export const CATEGORIES = [
  { key: 'all', label: 'All Courses', color: '#2563EB' },
  { key: 'data-engineering', label: 'Data Engineering', color: '#0F766E' },
  { key: 'machine-learning', label: 'Machine Learning', color: '#D97706' },
  { key: 'generative-ai', label: 'Generative AI', color: '#7C3AED' },
  { key: 'agentic-ai', label: 'Agentic AI', color: '#3157D5' },
  { key: 'software-engineering', label: 'Software Engineering', color: '#E11D48' },
  { key: 'cloud-architecture', label: 'Cloud & Architecture', color: '#0284C7' },
  { key: 'advanced-analytics', label: 'Advanced Analytics', color: '#047857' },
]

export const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
export const LEVEL_COLOR = { beginner: '#10B981', intermediate: '#F59E0B', advanced: '#F43F5E' }

const HERO_TRACKS = [
  { label: 'Agentic AI labs', value: 'Architecture patterns', color: '#67E8F9' },
  { label: 'Cloud delivery', value: 'Azure, AWS and GCP', color: '#FBBF24' },
  { label: 'Data engineering', value: 'Lakehouse to analytics', color: '#34D399' },
]

export const SEED_COURSES = [
  {
    _id: 'seed-agentic-ai-blueprint',
    slug: 'agentic-ai-operations-blueprint',
    title: 'Agentic AI Operations Blueprint',
    description: 'A practical starter course on designing governed AI agent workflows, approval paths, telemetry and production rollout controls.',
    category: 'agentic-ai',
    instructor: 'RhemaAI Academy',
    duration: '48m',
    level: 'intermediate',
    tags: ['Agentic AI', 'Governance', 'Operations'],
    pricing: { isFree: true, amount: 0, amountNGN: 0, currency: 'USD', label: 'Free' },
    featured: true,
  },
  {
    _id: 'seed-data-engineering-lakehouse',
    slug: 'enterprise-lakehouse-foundations',
    title: 'Enterprise Lakehouse Foundations',
    description: 'Learn the production decisions behind ingestion, medallion architecture, data quality, lineage and business-facing analytics products.',
    category: 'data-engineering',
    instructor: 'RhemaAI Academy',
    duration: '1h 12m',
    level: 'beginner',
    tags: ['Lakehouse', 'Data Quality', 'Analytics'],
    pricing: { isFree: true, amount: 0, amountNGN: 0, currency: 'USD', label: 'Free' },
  },
  {
    _id: 'seed-cloud-ai-architecture',
    slug: 'cloud-architecture-for-ai-workloads',
    title: 'Cloud Architecture for AI Workloads',
    description: 'A focused course on identity, networking, deployment boundaries and observability for enterprise AI systems across cloud platforms.',
    category: 'cloud-architecture',
    instructor: 'RhemaAI Academy',
    duration: '55m',
    level: 'advanced',
    tags: ['Cloud', 'Architecture', 'AI Platform'],
    pricing: { isFree: true, amount: 0, amountNGN: 0, currency: 'USD', label: 'Free' },
  },
]

function getCategoryMeta(key) {
  return CATEGORIES.find((category) => category.key === key) || CATEGORIES[0]
}

function formatPaidPrice(pricing = {}) {
  return `${pricing.currency || 'USD'} ${pricing.amount ?? 0}`
}

function YoutubeModal({ course, onClose }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${course.youtubeId}?autoplay=1&rel=0`

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.modalClose} type="button" onClick={onClose} aria-label="Close video">
          x
        </button>
        <div className={styles.playerWrap}>
          <iframe
            src={embedUrl}
            title={course.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.player}
          />
        </div>
        <div className={styles.modalMeta}>
          <span className={styles.modalCat} style={{ color: getCategoryMeta(course.category).color }}>
            {getCategoryMeta(course.category).label}
          </span>
          <h3 className={styles.modalTitle}>{course.title}</h3>
          {course.description && <p className={styles.modalDesc}>{course.description}</p>}
          <div className={styles.modalTags}>
            {course.instructor && <span className={styles.modalTag}>Instructor: {course.instructor}</span>}
            {course.duration && <span className={styles.modalTag}>Duration: {course.duration}</span>}
            {course.level && (
              <span className={styles.modalTag} style={{ color: LEVEL_COLOR[course.level] }}>
                {LEVEL_LABEL[course.level]}
              </span>
            )}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.modalPriceRow}>
              {course.pricing?.amountNGN > 0 && (
                <span className={styles.pricePaid}>₦{Number(course.pricing.amountNGN).toLocaleString()}</span>
              )}
              {course.pricing?.amount > 0 && (
                <span className={styles.priceUSD}>${Number(course.pricing.amount).toFixed(2)}</span>
              )}
              {!course.pricing?.amountNGN && !course.pricing?.amount && (
                <span className={styles.priceFree}>Free Course</span>
              )}
            </div>
            {course.pricing?.paymentUrl && (
              <a
                href={course.pricing.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPaystack}
                onClick={(event) => event.stopPropagation()}
              >
                Pay with Paystack
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CourseCard({ course }) {
  const category = getCategoryMeta(course.category)

  return (
    <motion.article
      className={styles.card}
      style={{ '--cat-color': category.color }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={`/courses/${course.slug || course._id}`} className={styles.cardLink} aria-label={`Open ${course.title}`}>
      <div className={styles.cardBody}>
        <div className={styles.cardBadges}>
          {course.featured && <span className={styles.featuredBadge}>Featured</span>}
          <span className={styles.catBadge}>
            {category.label}
          </span>
        </div>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        {course.description && (
          <p className={styles.cardDesc}>
            {course.description.slice(0, 112)}
            {course.description.length > 112 ? '...' : ''}
          </p>
        )}
        <div className={styles.cardMeta}>
          {course.instructor && <span>{course.instructor}</span>}
          {course.duration && <span>{course.duration}</span>}
          {course.level && (
            <span className={styles.levelPill} style={{ color: LEVEL_COLOR[course.level], borderColor: LEVEL_COLOR[course.level] + '55' }}>
              {LEVEL_LABEL[course.level]}
            </span>
          )}
        </div>
        <div className={styles.cardFooter}>
          <span className={`${styles.priceBadge} ${(course.pricing?.amountNGN > 0 || course.pricing?.amount > 0) ? styles.pricePaid : styles.priceFree}`}>
            {course.pricing?.amountNGN > 0
              ? `₦${Number(course.pricing.amountNGN).toLocaleString()}`
              : course.pricing?.amount > 0
                ? `$${Number(course.pricing.amount).toFixed(2)}`
                : 'Free'}
          </span>
          <span className={styles.watchBtn}>
            View course
          </span>
        </div>
      </div>
      </Link>
    </motion.article>
  )
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [courses, setCourses] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchCourses = useCallback(async (category, nextPage) => {
    setLoading(true)
    try {
      const params = { page: nextPage, limit: 12 }
      if (category !== 'all') params.category = category
      const data = await coursesAPI.getAll(params)
      setCourses(data.courses || [])
      setTotal(data.total || 0)
      setPage(data.page || 1)
      setPages(data.pages || 1)
    } catch {
      const fallback = category === 'all'
        ? SEED_COURSES
        : SEED_COURSES.filter((course) => course.category === category)
      setCourses(fallback)
      setTotal(fallback.length)
      setPage(1)
      setPages(1)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses(activeCategory, 1)
  }, [activeCategory, fetchCourses])

  const handleCategory = (key) => {
    setActiveCategory(key)
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageSEO
        title="Enterprise AI & Data Engineering Courses | RhemaAI Academy"
        description="Free and premium RhemaAI Academy courses: agentic AI, generative AI, data engineering, machine learning, Azure cloud architecture, data science and advanced analytics — taught at enterprise production level for professionals in Nigeria, UK, US, UAE and globally."
        keywords="AI courses online Nigeria, data engineering training Africa, agentic AI course, machine learning certification, Azure cloud training, data science course, enterprise AI education, BI analytics course UK UAE"
      />

      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}>RhemaAI Academy</span>
            <h1>
              Enterprise AI, Data and Cloud Courses
            </h1>
            <p>
              Practitioner-led courses for teams building agentic AI systems,
              generative AI products, data platforms, machine learning workflows
              and cloud architecture with production discipline.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}><strong>{total}</strong><span>Courses</span></div>
              <div className={styles.heroStatDiv} />
              <div className={styles.heroStat}><strong>7</strong><span>Topics</span></div>
              <div className={styles.heroStatDiv} />
              <div className={styles.heroStat}><strong>Free</strong><span>Starter lessons</span></div>
            </div>
          </motion.div>

          <motion.aside
            className={styles.heroPanel}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            aria-label="RhemaAI Academy curriculum highlights"
          >
            <span className={styles.panelLabel}>Curriculum map</span>
            <div className={styles.trackList}>
              {HERO_TRACKS.map((track) => (
                <div className={styles.trackItem} key={track.label} style={{ '--track-color': track.color }}>
                  <span />
                  <div>
                    <strong>{track.label}</strong>
                    <p>{track.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.panelMetric}>
              <strong>Production focused</strong>
              <span>Courses designed for real enterprise delivery.</span>
            </div>
          </motion.aside>
        </div>
      </section>

      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              className={`${styles.filterBtn} ${activeCategory === category.key ? styles.filterActive : ''}`}
              style={activeCategory === category.key ? { '--active-color': category.color } : {}}
              onClick={() => handleCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.gridSection}>
        <div className={styles.gridInner}>
          {loading ? (
            <div className={styles.loadingGrid}>
              {[...Array(6)].map((_, index) => <div key={index} className={styles.skeleton} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>Academy</div>
              <h3>No courses yet in this category</h3>
              <p>Check back soon. More enterprise AI lessons are being added regularly.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + page}
                className={styles.grid}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {courses.map((course, index) => (
                  <CourseCard key={course._id || course.slug} course={course} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {pages > 1 && (
            <div className={styles.pagination}>
              {[...Array(pages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.pageBtn} ${page === index + 1 ? styles.pageActive : ''}`}
                  onClick={() => fetchCourses(activeCategory, index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <YoutubeModal course={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
