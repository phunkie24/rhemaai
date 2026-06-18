import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import bookAuthor from '../../assets/multi-agent-book-author.webp'
import bookTable from '../../assets/multi-agent-book-table.webp'
import bookStack from '../../assets/multi-agent-book-stack.webp'
import bookCover from '../../assets/multi-agent-book-cover.webp'
import styles from './BookPromoStream.module.css'

const BOOK_IMAGES = [
  {
    src: bookAuthor,
    alt: 'Author holding Multi-Agent Orchestration Patterns for Enterprise Scale Systems',
  },
  {
    src: bookStack,
    alt: 'Multi-Agent Orchestration Patterns book stacked for enterprise AI readers',
  },
  {
    src: bookCover,
    alt: 'Multi-Agent Orchestration Patterns book cover by Funke R. Yusuf',
  },
  {
    src: bookTable,
    alt: 'Multi-Agent Orchestration Patterns book collection on a desk',
  },
]

const TOPICS = [
  'Multi-agent orchestration',
  'Enterprise AI architecture',
  'Agent governance',
  'Production-ready systems',
]

export default function BookPromoStream() {
  const streamImages = [...BOOK_IMAGES, ...BOOK_IMAGES]

  return (
    <section className={styles.streamSection} aria-labelledby="book-stream-title">
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>New enterprise AI book</span>
          <h2 id="book-stream-title">
            Multi-Agent Orchestration Patterns for Enterprise Scale Systems
          </h2>
          <p>
            A practical guide for architects, founders and technology leaders building
            reliable, governed and scalable agentic AI systems with multi-agent
            orchestration, observability and operational control.
          </p>
          <div className={styles.topicRow} aria-label="Book topics">
            {TOPICS.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <div className={styles.actions}>
            <Link to="/publications" className={styles.primaryAction}>
              View publication
            </Link>
            <Link to="/contact" className={styles.secondaryAction}>
              Discuss enterprise AI
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.stream}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          aria-label="Animated book preview stream"
        >
          <div className={styles.streamTrack}>
            {streamImages.map((image, index) => (
              <article className={styles.bookCard} key={`${image.alt}-${index}`}>
                <img src={image.src} alt={image.alt} loading={index > 2 ? 'lazy' : 'eager'} />
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
