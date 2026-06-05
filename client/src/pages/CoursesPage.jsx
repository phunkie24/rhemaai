import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { coursesAPI } from '@utils/api'
import styles from './CoursesPage.module.css'

const CATEGORIES = [
  { key: 'all',                 label: 'All Courses',         color: '#9B6DFF' },
  { key: 'data-engineering',   label: 'Data Engineering',    color: '#0E9488' },
  { key: 'machine-learning',   label: 'Machine Learning',    color: '#B7791F' },
  { key: 'generative-ai',      label: 'Generative AI',       color: '#7C3AED' },
  { key: 'agentic-ai',         label: 'Agentic AI',          color: '#3157D5' },
  { key: 'software-engineering', label: 'Software Engineering', color: '#C2415D' },
  { key: 'cloud-architecture', label: 'Cloud & Architecture', color: '#2447B8' },
  { key: 'advanced-analytics', label: 'Advanced Analytics',  color: '#047857' },
]

const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
const LEVEL_COLOR = { beginner: '#047857', intermediate: '#B7791F', advanced: '#C2415D' }

function getCategoryMeta(key) {
  return CATEGORIES.find((c) => c.key === key) || CATEGORIES[0]
}

function YoutubeModal({ course, onClose }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${course.youtubeId}?autoplay=1&rel=0`

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
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
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
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
            {course.instructor && <span className={styles.modalTag}>👤 {course.instructor}</span>}
            {course.duration   && <span className={styles.modalTag}>⏱ {course.duration}</span>}
            {course.level      && (
              <span className={styles.modalTag} style={{ color: LEVEL_COLOR[course.level] }}>
                {LEVEL_LABEL[course.level]}
              </span>
            )}
          </div>
          <div className={styles.modalActions}>
            <span className={`${styles.modalPrice} ${course.pricing?.isFree !== false ? styles.priceFree : styles.pricePaid}`}>
              {course.pricing?.isFree !== false
                ? '🎓 Free Course'
                : `${course.pricing?.currency || 'USD'} ${course.pricing?.amount ?? 0} — ${course.pricing?.label || 'Paid'}`}
            </span>
            {course.pricing?.isFree === false && course.pricing?.paymentUrl && (
              <a
                href={course.pricing.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enrollBtn}
                onClick={(e) => e.stopPropagation()}
              >
                Enrol Now →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CourseCard({ course, onClick }) {
  const cat = getCategoryMeta(course.category)
  const thumb = course.thumbnail || `https://img.youtube.com/vi/${course.youtubeId}/maxresdefault.jpg`

  return (
    <motion.article
      className={styles.card}
      style={{ '--cat-color': cat.color }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className={styles.thumb}>
        <img src={thumb} alt={course.title} loading="lazy" />
        <div className={styles.thumbOverlay} />
        <div className={styles.playBtn}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        {course.featured && <span className={styles.featuredBadge}>Featured</span>}
        <span className={styles.catBadge} style={{ background: cat.color + '22', color: cat.color, borderColor: cat.color + '44' }}>
          {cat.label}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        {course.description && (
          <p className={styles.cardDesc}>{course.description.slice(0, 110)}{course.description.length > 110 ? '…' : ''}</p>
        )}
        <div className={styles.cardMeta}>
          {course.instructor && <span>{course.instructor}</span>}
          {course.duration   && <span>⏱ {course.duration}</span>}
          {course.level && (
            <span className={styles.levelPill} style={{ color: LEVEL_COLOR[course.level], borderColor: LEVEL_COLOR[course.level] + '44' }}>
              {LEVEL_LABEL[course.level]}
            </span>
          )}
        </div>
        <div className={styles.cardFooter}>
          <span className={`${styles.priceBadge} ${course.pricing?.isFree !== false ? styles.priceFree : styles.pricePaid}`}>
            {course.pricing?.isFree !== false
              ? 'Free'
              : `${course.pricing?.currency || 'USD'} ${course.pricing?.amount ?? 0}`}
          </span>
          <span className={styles.watchBtn} style={{ color: cat.color }}>
            {course.pricing?.isFree !== false ? 'Watch now →' : 'Enrol →'}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [courses, setCourses]   = useState([])
  const [total, setTotal]       = useState(0)
  const [page, setPage]         = useState(1)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchCourses = useCallback(async (cat, pg) => {
    setLoading(true)
    try {
      const params = { page: pg, limit: 12 }
      if (cat !== 'all') params.category = cat
      const data = await coursesAPI.getAll(params)
      setCourses(data.courses || [])
      setTotal(data.total || 0)
      setPage(data.page || 1)
      setPages(data.pages || 1)
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCourses(activeCategory, 1) }, [activeCategory, fetchCourses])

  const handleCategory = (key) => {
    setActiveCategory(key)
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Courses | RhemaAI Technologies</title>
        <meta name="description" content="Free enterprise AI and data engineering courses — Generative AI, Agentic AI, Machine Learning, Data Engineering, Cloud Architecture, and Advanced Analytics." />
      </Helmet>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}>RhemaAI Academy</span>
            <h1 className={styles.heroTitle}>
              Expert-Led Courses in<br />
              <span className={styles.heroGradient}>AI, Data & Cloud</span>
            </h1>
            <p className={styles.heroSub}>
              Free video courses taught by RhemaAI practitioners — covering Agentic AI,
              Generative AI, Data Engineering, Machine Learning, Cloud Architecture, and Advanced Analytics.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}><strong>{total}</strong><span>Courses</span></div>
              <div className={styles.heroStatDiv} />
              <div className={styles.heroStat}><strong>7</strong><span>Topics</span></div>
              <div className={styles.heroStatDiv} />
              <div className={styles.heroStat}><strong>Free</strong><span>Always</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterActive : ''}`}
              style={activeCategory === cat.key ? { borderColor: cat.color, color: cat.color, background: cat.color + '18' } : {}}
              onClick={() => handleCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className={styles.gridSection}>
        <div className={styles.gridInner}>
          {loading ? (
            <div className={styles.loadingGrid}>
              {[...Array(6)].map((_, i) => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🎓</div>
              <h3>No courses yet in this category</h3>
              <p>Check back soon — more content is being added regularly.</p>
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
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} onClick={() => setSelected(course)} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className={styles.pagination}>
              {[...Array(pages)].map((_, i) => (
                <button
                  key={i}
                  className={`${styles.pageBtn} ${page === i + 1 ? styles.pageActive : ''}`}
                  onClick={() => fetchCourses(activeCategory, i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* YouTube modal */}
      <AnimatePresence>
        {selected && (
          <YoutubeModal course={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
