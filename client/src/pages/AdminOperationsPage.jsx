import { useEffect, useMemo, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { adminAPI } from '@utils/api'
import styles from './AdminOperationsPage.module.css'

const AREAS = [
  { key: 'products', label: 'Products', eyebrow: 'RhemaAI Platform', title: 'Create, edit and delete SaaS software products.' },
  { key: 'caseStudies', label: 'Case Studies', eyebrow: 'Client Results', title: 'Create, edit and delete case studies.' },
  { key: 'research', label: 'Research', eyebrow: 'RhemaAI Labs', title: 'Create, edit and delete research articles.' },
  { key: 'publications', label: 'Publications', eyebrow: 'RhemaAI Press', title: 'Create, edit and delete books and white papers.' },
  { key: 'courses', label: 'Courses', eyebrow: 'RhemaAI Academy', title: 'Create, edit and delete courses with pricing and category tags.' },
]

const PRODUCT_CATEGORIES = [
  { value: 'saas', label: 'SaaS' },
  { value: 'platform', label: 'Platform' },
  { value: 'tool', label: 'Tool' },
  { value: 'accelerator', label: 'Accelerator' },
  { value: 'api', label: 'API' },
  { value: 'template', label: 'Template' },
]

const INSIGHT_CATEGORIES = [
  { value: 'agentic-ai', label: 'Agentic AI' },
  { value: 'data-engineering', label: 'Data Engineering' },
  { value: 'data-science', label: 'Data Science & Analytics' },
  { value: 'cloud-architecture', label: 'Cloud Architecture' },
  { value: 'mlops', label: 'MLOps & DataOps' },
  { value: 'enterprise-ai', label: 'Enterprise AI' },
  { value: 'fintech', label: 'FinTech' },
]

const PUBLICATION_TYPES = [
  { value: 'book', label: 'Book' },
  { value: 'whitepaper', label: 'White paper' },
]

const COURSE_LEVEL_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const emptyProductForm = {
  _id: '',
  name: '',
  slug: '',
  kicker: '',
  category: 'saas',
  summary: '',
  description: '',
  tagsText: '',
  logoUrl: '',
  assetUrl: '',
  demoUrl: '',
  productUrl: '',
  version: '1.0.0',
  priceAmount: '0',
  priceNGN: '0',
  priceCurrency: 'USD',
  priceLabel: 'Contact sales',
  paystackUrl: '',
  featured: false,
  published: false,
  seoMetaTitle: '',
  seoMetaDescription: '',
  canonicalUrl: '',
  keywordsText: '',
}

const emptyResearchForm = {
  _id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'agentic-ai',
  tagsText: '',
  coverImage: '',
  architectureImage: '',
  readTime: '5',
  published: false,
  authorName: 'RhemaAI Solutions Ltd Team',
  authorAvatar: '',
  seoMetaTitle: '',
  seoMetaDescription: '',
}

const emptyCaseStudyForm = {
  _id: '',
  title: '',
  slug: '',
  industry: '',
  client: '',
  kpi1Value: '',
  kpi1Label: '',
  kpi2Value: '',
  kpi2Label: '',
  summary: '',
  body: '',
  tagsText: '',
  accent: '#9B6DFF',
  coverImage: '',
  featured: false,
  published: false,
  seoMetaTitle: '',
  seoMetaDescription: '',
  canonicalUrl: '',
  keywordsText: '',
}

const emptyPublicationForm = {
  _id: '',
  title: '',
  slug: '',
  type: 'book',
  summary: '',
  body: '',
  coverImage: '',
  documentUrl: '',
  documentLabel: '',
  tagsText: '',
  priceAmount: '0',
  priceNGN: '0',
  priceCurrency: 'USD',
  priceLabel: 'Free',
  paystackUrl: '',
  kindleUrl: '',
  featured: false,
  published: false,
  authorName: 'RhemaAI Solutions Ltd',
  seoMetaTitle: '',
  seoMetaDescription: '',
  canonicalUrl: '',
  keywordsText: '',
}

const emptyCourseForm = {
  _id: '',
  title: '',
  slug: '',
  description: '',
  category: 'data-engineering',
  youtubeUrl: '',
  instructor: 'RhemaAI Technologies',
  duration: '',
  level: 'intermediate',
  tagsText: '',
  isFree: true,
  priceAmount: '0',
  priceNGN: '0',
  priceCurrency: 'USD',
  priceLabel: 'Free',
  paymentUrl: '',
  featured: false,
  published: false,
  seoMetaTitle: '',
  seoMetaDescription: '',
  canonicalUrl: '',
  keywordsText: '',
}

const emptyForms = {
  products: emptyProductForm,
  caseStudies: emptyCaseStudyForm,
  research: emptyResearchForm,
  publications: emptyPublicationForm,
  courses: emptyCourseForm,
}

const apiConfig = {
  products: {
    list: adminAPI.listProducts,
    save: adminAPI.saveProduct,
    delete: adminAPI.deleteProduct,
    responseKey: 'products',
    savedKey: 'product',
  },
  caseStudies: {
    list: adminAPI.listCaseStudies,
    save: adminAPI.saveCaseStudy,
    delete: adminAPI.deleteCaseStudy,
    responseKey: 'caseStudies',
    savedKey: 'caseStudy',
  },
  research: {
    list: adminAPI.listInsights,
    save: adminAPI.saveInsight,
    delete: adminAPI.deleteInsight,
    responseKey: 'insights',
    savedKey: 'insight',
  },
  publications: {
    list: adminAPI.listPublications,
    save: adminAPI.savePublication,
    delete: adminAPI.deletePublication,
    responseKey: 'publications',
    savedKey: 'publication',
  },
  courses: {
    list: adminAPI.listCourses,
    save: adminAPI.saveCourse,
    delete: adminAPI.deleteCourse,
    responseKey: 'courses',
    savedKey: 'course',
  },
}

function splitList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function stripMarkdown(value = '') {
  return value
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

function markdownTitle(value = '') {
  const heading = value.match(/^\s*#{1,6}\s+(.+)$/m)
  return heading ? stripMarkdown(heading[1]).slice(0, 180) : ''
}

function markdownExcerpt(value = '') {
  const cleaned = stripMarkdown(value)
  const paragraph = cleaned
    .split(/\n\s*\n/)
    .map((item) => item.replace(/\s+/g, ' ').trim())
    .find((item) => item.length > 40)

  return paragraph ? paragraph.slice(0, 220) : ''
}

function normalizeMarkdownInput(content = '') {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n|\\n|\\r/g, '\n')
    .replace(/([^\n])\s+(#{1,4}\s+)/g, '$1\n\n$2')
    .replace(/([^\n])\s+([-*]\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/([^\n])\s+(\d+\.\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function productToForm(product) {
  return {
    _id: product._id,
    name: product.name || '',
    slug: product.slug || '',
    kicker: product.kicker || '',
    category: product.category || 'saas',
    summary: product.summary || '',
    description: product.description || '',
    tagsText: (product.tags || []).join(', '),
    logoUrl: product.logoUrl || '',
    assetUrl: product.assetUrl || '',
    demoUrl: product.demoUrl || '',
    productUrl: product.productUrl || '',
    version: product.version || '1.0.0',
    priceAmount: String(product.pricing?.amount ?? 0),
    priceNGN: String(product.pricing?.amountNGN ?? 0),
    priceCurrency: product.pricing?.currency || 'USD',
    priceLabel: product.pricing?.label || 'Contact sales',
    paystackUrl: product.pricing?.paystackUrl || '',
    featured: !!product.featured,
    published: !!product.published,
    seoMetaTitle: product.seo?.metaTitle || '',
    seoMetaDescription: product.seo?.metaDescription || '',
    canonicalUrl: product.seo?.canonicalUrl || '',
    keywordsText: (product.seo?.keywords || []).join(', '),
  }
}

function formToProduct(form) {
  return {
    _id: form._id || undefined,
    name: form.name,
    slug: form.slug,
    kicker: form.kicker,
    category: form.category,
    summary: form.summary,
    description: form.description,
    tags: splitList(form.tagsText),
    logoUrl: form.logoUrl,
    assetUrl: form.assetUrl,
    demoUrl: form.demoUrl,
    productUrl: form.productUrl,
    version: form.version,
    pricing: {
      amount:      Number(form.priceAmount || 0),
      amountNGN:   Number(form.priceNGN || 0),
      currency:    form.priceCurrency,
      label:       form.priceLabel,
      paystackUrl: form.paystackUrl,
    },
    featured: form.featured,
    published: form.published,
    seo: {
      metaTitle: form.seoMetaTitle,
      metaDescription: form.seoMetaDescription,
      canonicalUrl: form.canonicalUrl,
      keywords: splitList(form.keywordsText),
    },
  }
}

function caseStudyToForm(caseStudy) {
  return {
    _id: caseStudy._id,
    title: caseStudy.title || '',
    slug: caseStudy.slug || '',
    industry: caseStudy.industry || '',
    client: caseStudy.client || '',
    kpi1Value: caseStudy.kpi1?.value || '',
    kpi1Label: caseStudy.kpi1?.label || '',
    kpi2Value: caseStudy.kpi2?.value || '',
    kpi2Label: caseStudy.kpi2?.label || '',
    summary: caseStudy.summary || '',
    body: caseStudy.body || '',
    tagsText: (caseStudy.tags || []).join(', '),
    accent: caseStudy.accent || '#9B6DFF',
    coverImage: caseStudy.coverImage || '',
    featured: !!caseStudy.featured,
    published: !!caseStudy.published,
    seoMetaTitle: caseStudy.seo?.metaTitle || '',
    seoMetaDescription: caseStudy.seo?.metaDescription || '',
    canonicalUrl: caseStudy.seo?.canonicalUrl || '',
    keywordsText: (caseStudy.seo?.keywords || []).join(', '),
  }
}

function formToCaseStudy(form) {
  return {
    _id: form._id || undefined,
    title: form.title,
    slug: form.slug,
    industry: form.industry,
    client: form.client,
    kpi1: {
      value: form.kpi1Value,
      label: form.kpi1Label,
    },
    kpi2: {
      value: form.kpi2Value,
      label: form.kpi2Label,
    },
    summary: form.summary,
    body: form.body,
    tags: splitList(form.tagsText),
    accent: form.accent,
    coverImage: form.coverImage,
    featured: form.featured,
    published: form.published,
    seo: {
      metaTitle: form.seoMetaTitle,
      metaDescription: form.seoMetaDescription,
      canonicalUrl: form.canonicalUrl,
      keywords: splitList(form.keywordsText),
    },
  }
}

function researchToForm(article) {
  return {
    _id: article._id,
    title: article.title || '',
    slug: article.slug || '',
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category || 'agentic-ai',
    tagsText: (article.tags || []).join(', '),
    coverImage: article.coverImage || '',
    architectureImage: article.architectureImage || '',
    readTime: String(article.readTime || 5),
    published: !!article.published,
    authorName: article.author?.name || 'RhemaAI Solutions Ltd Team',
    authorAvatar: article.author?.avatar || '',
    seoMetaTitle: article.seo?.metaTitle || '',
    seoMetaDescription: article.seo?.metaDescription || '',
  }
}

function formToResearch(form) {
  return {
    _id: form._id || undefined,
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    content: normalizeMarkdownInput(form.content),
    category: form.category,
    tags: splitList(form.tagsText),
    coverImage: form.coverImage,
    architectureImage: form.architectureImage,
    readTime: Number(form.readTime || 5),
    published: form.published,
    author: {
      name: form.authorName,
      avatar: form.authorAvatar,
    },
    seo: {
      metaTitle: form.seoMetaTitle,
      metaDescription: form.seoMetaDescription,
    },
  }
}

function publicationToForm(publication) {
  return {
    _id: publication._id,
    title: publication.title || '',
    slug: publication.slug || '',
    type: publication.type || 'book',
    summary: publication.summary || '',
    body: publication.body || '',
    coverImage: publication.coverImage || '',
    documentUrl: publication.documentUrl || '',
    documentLabel: publication.documentLabel || '',
    tagsText: (publication.tags || []).join(', '),
    priceAmount: String(publication.price?.amount ?? 0),
    priceNGN: String(publication.price?.amountNGN ?? 0),
    priceCurrency: publication.price?.currency || 'USD',
    priceLabel: publication.price?.label || 'Free',
    paystackUrl: publication.price?.paystackUrl || '',
    kindleUrl: publication.price?.kindleUrl || publication.price?.paymentUrl || '',
    featured: !!publication.featured,
    published: !!publication.published,
    authorName: publication.author?.name || 'RhemaAI Solutions Ltd',
    seoMetaTitle: publication.seo?.metaTitle || '',
    seoMetaDescription: publication.seo?.metaDescription || '',
    canonicalUrl: publication.seo?.canonicalUrl || '',
    keywordsText: (publication.seo?.keywords || []).join(', '),
  }
}

function formToPublication(form) {
  return {
    _id: form._id || undefined,
    title: form.title,
    slug: form.slug,
    type: form.type,
    summary: form.summary,
    body: form.body,
    coverImage: form.coverImage,
    documentUrl: form.documentUrl,
    documentLabel: form.documentLabel,
    tags: splitList(form.tagsText),
    price: {
      amount:     Number(form.priceAmount || 0),
      amountNGN:  Number(form.priceNGN || 0),
      currency:   form.priceCurrency,
      label:      form.priceLabel,
      paystackUrl: form.paystackUrl,
      kindleUrl:  form.kindleUrl,
      paymentUrl: form.paystackUrl || form.kindleUrl,
    },
    featured: form.featured,
    published: form.published,
    author: {
      name: form.authorName,
    },
    seo: {
      metaTitle: form.seoMetaTitle,
      metaDescription: form.seoMetaDescription,
      canonicalUrl: form.canonicalUrl,
      keywords: splitList(form.keywordsText),
    },
  }
}

function courseToForm(course) {
  return {
    _id: course._id || '',
    title: course.title || '',
    slug: course.slug || '',
    description: course.description || '',
    category: course.category || 'data-engineering',
    youtubeUrl: course.youtubeUrl || '',
    instructor: course.instructor || 'RhemaAI Technologies',
    duration: course.duration || '',
    level: course.level || 'intermediate',
    tagsText: (course.tags || []).join(', '),
    isFree: course.pricing?.isFree !== false,
    priceAmount: String(course.pricing?.amount ?? 0),
    priceNGN: String(course.pricing?.amountNGN ?? 0),
    priceCurrency: course.pricing?.currency || 'USD',
    priceLabel: course.pricing?.label || 'Free',
    paymentUrl: course.pricing?.paymentUrl || '',
    featured: !!course.featured,
    published: !!course.published,
    seoMetaTitle: course.seo?.metaTitle || '',
    seoMetaDescription: course.seo?.metaDescription || '',
    canonicalUrl: course.seo?.canonicalUrl || '',
    keywordsText: (course.seo?.keywords || []).join(', '),
  }
}

function formToCourse(form) {
  const payload = {
    title: form.title,
    slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    description: form.description,
    category: form.category,
    youtubeUrl: form.youtubeUrl,
    instructor: form.instructor,
    duration: form.duration,
    level: form.level,
    tags: splitList(form.tagsText),
    pricing: {
      isFree:     form.isFree,
      amount:     Number(form.priceAmount) || 0,
      amountNGN:  Number(form.priceNGN) || 0,
      currency:   form.priceCurrency || 'USD',
      label:      form.priceLabel || (form.isFree ? 'Free' : 'Paid'),
      paymentUrl: form.paymentUrl || '',
    },
    featured: form.featured,
    published: form.published,
    seo: {
      metaTitle: form.seoMetaTitle,
      metaDescription: form.seoMetaDescription,
      canonicalUrl: form.canonicalUrl,
      keywords: splitList(form.keywordsText),
    },
  }
  if (form._id) payload._id = form._id
  return payload
}

const formMappers = {
  products: { toForm: productToForm, toPayload: formToProduct, empty: emptyProductForm },
  caseStudies: { toForm: caseStudyToForm, toPayload: formToCaseStudy, empty: emptyCaseStudyForm },
  research: { toForm: researchToForm, toPayload: formToResearch, empty: emptyResearchForm },
  publications: { toForm: publicationToForm, toPayload: formToPublication, empty: emptyPublicationForm },
  courses: { toForm: courseToForm, toPayload: formToCourse, empty: emptyCourseForm },
}

function recordTitle(area, record) {
  if (area === 'products') return record.name || 'Untitled product'
  return record.title || 'Untitled record'
}

function recordType(area, record) {
  if (area === 'products') return record.category
  if (area === 'caseStudies') return record.industry
  if (area === 'research') return record.category
  if (area === 'courses') return getCourseCategoryLabel(record.category)
  return record.type
}

function statusLine(area, record) {
  const status = record.published ? 'Published' : 'Draft'
  if (area === 'products') return `${status} - ${record.pricing?.label || 'Contact sales'}`
  if (area === 'caseStudies') return `${status} - ${record.client || 'No client'}`
  if (area === 'publications') return `${status} - ${record.price?.label || 'Free'}`
  if (area === 'courses') return `${status} - ${COURSE_LEVEL_LABEL[record.level] || 'Course'} - ${record.pricing?.label || 'Free'}`
  return `${status} - ${record.readTime || 5} min read`
}

function getCourseCategoryLabel(category) {
  const labels = {
    'data-engineering': 'Data Engineering',
    'machine-learning': 'Machine Learning',
    'generative-ai': 'Generative AI',
    'agentic-ai': 'Agentic AI',
    'software-engineering': 'Software Engineering',
    'cloud-architecture': 'Cloud & Architecture',
    'advanced-analytics': 'Advanced Analytics',
  }

  return labels[category] || 'Course'
}

export default function AdminOperationsPage() {
  const [activeArea, setActiveArea] = useState('products')
  const [adminKey, setAdminKey] = useState('')
  const [keyStatus, setKeyStatus] = useState('idle') // idle | verifying | ok | error
  const [records, setRecords] = useState({ products: [], caseStudies: [], research: [], publications: [], courses: [] })
  const [forms, setForms] = useState(emptyForms)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState('')

  const activeMeta = AREAS.find((area) => area.key === activeArea)
  const form = forms[activeArea]

  const seoScore = useMemo(() => {
    let score = 0
    if (form.slug) score += 20
    if (form.seoMetaTitle?.length >= 35 && form.seoMetaTitle.length <= 70) score += 25
    if (form.seoMetaDescription?.length >= 80 && form.seoMetaDescription.length <= 170) score += 25
    if (form.keywordsText && splitList(form.keywordsText).length >= 3) score += 15
    if (form.assetUrl || form.documentUrl || form.coverImage || form.kindleUrl || form.productUrl) score += 15
    return score
  }, [form])

  const loadItems = async (area = activeArea) => {
    setStatus('loading')
    setKeyStatus('verifying')
    setMessage('')
    try {
      const config = apiConfig[area]
      const data = await config.list(adminKey, { limit: 100 })
      setRecords((current) => ({ ...current, [area]: data[config.responseKey] || [] }))
      setStatus('idle')
      setKeyStatus('ok')
    } catch (err) {
      setStatus('error')
      setKeyStatus('error')
      setMessage(err.message)
    }
  }

  useEffect(() => {
    if (adminKey.length >= 24) loadItems(activeArea)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeArea, adminKey])

  const updateForm = (field, value) => {
    setForms((current) => ({
      ...current,
      [activeArea]: {
        ...current[activeArea],
        [field]: value,
      },
    }))
  }

  const resetForm = () => {
    setForms((current) => ({ ...current, [activeArea]: formMappers[activeArea].empty }))
  }

  const editRecord = (record) => {
    setForms((current) => ({
      ...current,
      [activeArea]: formMappers[activeArea].toForm(record),
    }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setStatus('saving')
    setMessage('')
    try {
      const config = apiConfig[activeArea]
      const payload = formMappers[activeArea].toPayload(form)
      const data = await config.save(adminKey, payload)
      const saved = data[config.savedKey]

      setRecords((current) => {
        const list = current[activeArea]
        const exists = list.some((item) => item._id === saved._id)
        return {
          ...current,
          [activeArea]: exists
            ? list.map((item) => item._id === saved._id ? saved : item)
            : [saved, ...list],
        }
      })
      setForms((current) => ({ ...current, [activeArea]: formMappers[activeArea].toForm(saved) }))
      setStatus('idle')
      setMessage(`${activeMeta.label} record saved.`)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  const handleDelete = async (id) => {
    const target = records[activeArea].find((item) => item._id === id)
    const title = target ? recordTitle(activeArea, target) : 'this record'
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return

    setStatus('saving')
    setMessage('')
    try {
      await apiConfig[activeArea].delete(adminKey, id)
      setRecords((current) => ({
        ...current,
        [activeArea]: current[activeArea].filter((item) => item._id !== id),
      }))
      if (form._id === id) resetForm()
      setStatus('idle')
      setMessage(`${activeMeta.label} record deleted.`)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  const handleUpload = async (event, field, labelField) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(field)
    setMessage('')
    try {
      const asset = await adminAPI.uploadAsset(adminKey, file)
      updateForm(field, asset.url)
      if (labelField) updateForm(labelField, file.name)
      setMessage('Upload complete.')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setUploading('')
      event.target.value = ''
    }
  }

  const handleMarkdownImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading('content')
    setMessage('')
    try {
      const content = normalizeMarkdownInput(await file.text())
      const importedTitle = markdownTitle(content)
      const importedExcerpt = markdownExcerpt(content)

      setForms((current) => ({
        ...current,
        research: {
          ...current.research,
          title: current.research.title || importedTitle,
          excerpt: current.research.excerpt || importedExcerpt,
          content,
        },
      }))
      setMessage('Markdown file imported into article content.')
    } catch (err) {
      setMessage(err.message || 'Could not import Markdown file.')
    } finally {
      setUploading('')
      event.target.value = ''
    }
  }

  return (
    <div className={styles.page}>
      <PageSEO title="Admin Operations | RhemaAI Solutions Ltd" description="RhemaAI Solutions Ltd internal operations panel." noindex />

      <section className={styles.hero}>
        <div>
          <span>Administration Operations</span>
          <h1>Manage products, case studies, research articles, books and white papers.</h1>
          <p>Create, edit and delete public content across products, case studies, research and publications.</p>
        </div>
        <div className={styles.keyPanel}>
          <label htmlFor="admin-key">Admin key</label>
          <input
            id="admin-key"
            type="password"
            value={adminKey}
            onChange={(event) => { setAdminKey(event.target.value); setKeyStatus('idle') }}
            placeholder="Production API key"
          />
          <button type="button" onClick={() => loadItems(activeArea)}>Refresh</button>
          {keyStatus === 'verifying' && <span className={styles.keyVerifying}>Verifying...</span>}
          {keyStatus === 'ok'        && <span className={styles.keyOk}>Key accepted — authenticated</span>}
          {keyStatus === 'error'     && <span className={styles.keyError}>Invalid key — access denied</span>}
        </div>
      </section>

      <section className={styles.tabs} aria-label="Admin operation areas">
        {AREAS.map((area) => (
          <button
            key={area.key}
            type="button"
            className={activeArea === area.key ? styles.activeTab : ''}
            onClick={() => setActiveArea(area.key)}
          >
            <span>{area.eyebrow}</span>
            {area.label}
          </button>
        ))}
      </section>

      <section className={styles.workspace}>
        <form className={styles.editor} onSubmit={handleSave}>
          <div className={styles.formHeader}>
            <div>
              <span>{activeMeta.eyebrow}</span>
              <h2>{activeMeta.title}</h2>
            </div>
            <button type="button" onClick={resetForm}>New</button>
          </div>

          {activeArea === 'products' && (
            <>
              <div className={styles.twoCol}>
                <label>
                  Product name
                  <input value={form.name} onChange={(event) => updateForm('name', event.target.value)} required />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="auto-generated if empty" />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Category
                  <select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
                    {PRODUCT_CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                  </select>
                </label>
                <label>
                  Kicker
                  <input value={form.kicker} onChange={(event) => updateForm('kicker', event.target.value)} placeholder="SaaS operations" />
                </label>
              </div>
              <label>
                Summary
                <textarea rows="3" value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} required />
              </label>
              <label>
                Description
                <textarea rows="6" value={form.description} onChange={(event) => updateForm('description', event.target.value)} />
              </label>
              <div className={styles.twoCol}>
                <label>
                  Logo URL
                  <input value={form.logoUrl} onChange={(event) => updateForm('logoUrl', event.target.value)} />
                </label>
                <label>
                  Logo upload
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleUpload(event, 'logoUrl')} />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  SaaS package URL
                  <input value={form.assetUrl} onChange={(event) => updateForm('assetUrl', event.target.value)} />
                </label>
                <label>
                  Upload SaaS package
                  <input type="file" accept=".zip,application/zip" onChange={(event) => handleUpload(event, 'assetUrl')} />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Demo URL
                  <input value={form.demoUrl} onChange={(event) => updateForm('demoUrl', event.target.value)} />
                </label>
                <label>
                  Product URL
                  <input value={form.productUrl} onChange={(event) => updateForm('productUrl', event.target.value)} />
                </label>
              </div>
              <div className={styles.priceGrid}>
                <label>
                  Version
                  <input value={form.version} onChange={(event) => updateForm('version', event.target.value)} />
                </label>
                <label>
                  Sale price (NGN) ₦
                  <input type="number" min="0" step="0.01" value={form.priceNGN} onChange={(event) => updateForm('priceNGN', event.target.value)} placeholder="0" />
                </label>
                <label>
                  Sale price (USD) $
                  <input type="number" min="0" step="0.01" value={form.priceAmount} onChange={(event) => updateForm('priceAmount', event.target.value)} placeholder="0" />
                </label>
                <label>
                  Price label
                  <input value={form.priceLabel} onChange={(event) => updateForm('priceLabel', event.target.value)} placeholder="Contact sales / ₦5,000" />
                </label>
              </div>
              <label>
                Paystack payment link
                <input value={form.paystackUrl} onChange={(event) => updateForm('paystackUrl', event.target.value)} placeholder="https://paystack.com/pay/..." />
              </label>
              <label>
                Tags
                <input value={form.tagsText} onChange={(event) => updateForm('tagsText', event.target.value)} placeholder="SaaS, AI, Workflow" />
              </label>
            </>
          )}

          {activeArea === 'caseStudies' && (
            <>
              <div className={styles.twoCol}>
                <label>
                  Case study title
                  <input value={form.title} onChange={(event) => updateForm('title', event.target.value)} required />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="auto-generated if empty" />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Industry
                  <input value={form.industry} onChange={(event) => updateForm('industry', event.target.value)} required />
                </label>
                <label>
                  Client
                  <input value={form.client} onChange={(event) => updateForm('client', event.target.value)} required />
                </label>
              </div>
              <div className={styles.priceGrid}>
                <label>
                  KPI 1 value
                  <input value={form.kpi1Value} onChange={(event) => updateForm('kpi1Value', event.target.value)} required />
                </label>
                <label>
                  KPI 1 label
                  <input value={form.kpi1Label} onChange={(event) => updateForm('kpi1Label', event.target.value)} required />
                </label>
                <label>
                  KPI 2 value
                  <input value={form.kpi2Value} onChange={(event) => updateForm('kpi2Value', event.target.value)} required />
                </label>
                <label>
                  KPI 2 label
                  <input value={form.kpi2Label} onChange={(event) => updateForm('kpi2Label', event.target.value)} required />
                </label>
              </div>
              <label>
                Summary
                <textarea rows="3" value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} required />
              </label>
              <label>
                Body
                <textarea rows="7" value={form.body} onChange={(event) => updateForm('body', event.target.value)} />
              </label>
              <div className={styles.twoCol}>
                <label>
                  Cover image URL
                  <input value={form.coverImage} onChange={(event) => updateForm('coverImage', event.target.value)} />
                </label>
                <label>
                  Cover upload
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleUpload(event, 'coverImage')} />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Accent color
                  <input value={form.accent} onChange={(event) => updateForm('accent', event.target.value)} placeholder="#9B6DFF" />
                </label>
                <label>
                  Tags
                  <input value={form.tagsText} onChange={(event) => updateForm('tagsText', event.target.value)} placeholder="Azure, MLOps, AI" />
                </label>
              </div>
            </>
          )}

          {activeArea === 'research' && (
            <>
              <div className={styles.twoCol}>
                <label>
                  Article title
                  <input value={form.title} onChange={(event) => updateForm('title', event.target.value)} required />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="auto-generated if empty" />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Category
                  <select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
                    {INSIGHT_CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                  </select>
                </label>
                <label>
                  Read time
                  <input type="number" min="1" max="120" value={form.readTime} onChange={(event) => updateForm('readTime', event.target.value)} />
                </label>
              </div>
              <label>
                Excerpt
                <textarea rows="3" value={form.excerpt} onChange={(event) => updateForm('excerpt', event.target.value)} required />
              </label>
              <label>
                Article content
                <textarea
                  rows="10"
                  value={form.content}
                  onChange={(event) => updateForm('content', event.target.value)}
                  placeholder="Paste Markdown here, for example: ## Introduction"
                  required
                />
              </label>
              <label>
                Import Markdown file
                <input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={handleMarkdownImport} />
              </label>
              <div className={styles.twoCol}>
                <label>
                  Cover image URL
                  <input value={form.coverImage} onChange={(event) => updateForm('coverImage', event.target.value)} />
                </label>
                <label>
                  Cover upload
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleUpload(event, 'coverImage')} />
                </label>
              </div>
              <div className={styles.archRow}>
                <div className={styles.twoCol}>
                  <label>
                    Architecture image URL
                    <input value={form.architectureImage} onChange={(event) => updateForm('architectureImage', event.target.value)} placeholder="https://... or upload below" />
                  </label>
                  <label>
                    Architecture upload
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={!!uploading} onChange={(event) => handleUpload(event, 'architectureImage')} />
                  </label>
                </div>
                {form.architectureImage && (
                  <div className={styles.archPreview}>
                    <span>Preview</span>
                    <img src={form.architectureImage} alt="Architecture diagram preview" />
                  </div>
                )}
              </div>
              <div className={styles.twoCol}>
                <label>
                  Author
                  <input value={form.authorName} onChange={(event) => updateForm('authorName', event.target.value)} />
                </label>
                <label>
                  Author avatar URL
                  <input value={form.authorAvatar} onChange={(event) => updateForm('authorAvatar', event.target.value)} />
                </label>
              </div>
              <label>
                Tags
                <input value={form.tagsText} onChange={(event) => updateForm('tagsText', event.target.value)} placeholder="Research, AI, Cloud" />
              </label>
            </>
          )}

          {activeArea === 'courses' && (
            <>
              <div className={styles.twoCol}>
                <label>
                  Course Title *
                  <input value={form.title} onChange={(event) => updateForm('title', event.target.value)} required placeholder="e.g. Building Agentic AI Systems" />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="auto-generated if empty" />
                </label>
              </div>
              <label>
                YouTube URL *
                <input
                  value={form.youtubeUrl}
                  onChange={(event) => updateForm('youtubeUrl', event.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </label>
              <label>
                Description
                <textarea rows="3" value={form.description} onChange={(event) => updateForm('description', event.target.value)} placeholder="What will students learn in this course?" />
              </label>
              <div className={styles.twoCol}>
                <label>
                  Category *
                  <select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
                    <option value="data-engineering">Data Engineering</option>
                    <option value="machine-learning">Machine Learning</option>
                    <option value="generative-ai">Generative AI</option>
                    <option value="agentic-ai">Agentic AI</option>
                    <option value="software-engineering">Software Engineering</option>
                    <option value="cloud-architecture">Cloud & Architecture</option>
                    <option value="advanced-analytics">Advanced Analytics</option>
                  </select>
                </label>
                <label>
                  Level
                  <select value={form.level} onChange={(event) => updateForm('level', event.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Instructor
                  <input value={form.instructor} onChange={(event) => updateForm('instructor', event.target.value)} />
                </label>
                <label>
                  Duration
                  <input value={form.duration} onChange={(event) => updateForm('duration', event.target.value)} placeholder="e.g. 2h 30m" />
                </label>
              </div>
              <label>
                Tags
                <input value={form.tagsText} onChange={(event) => updateForm('tagsText', event.target.value)} placeholder="Python, AI, Data, LangChain" />
              </label>
              <div className={styles.priceGrid}>
                <label style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" checked={form.isFree} onChange={(e) => updateForm('isFree', e.target.checked)} />
                  Free course (no payment required)
                </label>
                {!form.isFree && (
                  <>
                    <label>
                      Sale price (NGN) ₦
                      <input type="number" min="0" step="0.01" value={form.priceNGN} onChange={(event) => updateForm('priceNGN', event.target.value)} placeholder="0" />
                    </label>
                    <label>
                      Sale price (USD) $
                      <input type="number" min="0" step="0.01" value={form.priceAmount} onChange={(event) => updateForm('priceAmount', event.target.value)} placeholder="0" />
                    </label>
                    <label>
                      Price label
                      <input value={form.priceLabel} onChange={(event) => updateForm('priceLabel', event.target.value)} placeholder="e.g. Full access" />
                    </label>
                    <label>
                      Paystack payment link
                      <input value={form.paymentUrl} onChange={(event) => updateForm('paymentUrl', event.target.value)} placeholder="https://paystack.com/pay/..." />
                    </label>
                  </>
                )}
              </div>
            </>
          )}

          {activeArea === 'publications' && (
            <>
              <div className={styles.twoCol}>
                <label>
                  Title
                  <input value={form.title} onChange={(event) => updateForm('title', event.target.value)} required />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="auto-generated if empty" />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Type
                  <select value={form.type} onChange={(event) => updateForm('type', event.target.value)}>
                    {PUBLICATION_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                </label>
                <label>
                  Author
                  <input value={form.authorName} onChange={(event) => updateForm('authorName', event.target.value)} />
                </label>
              </div>
              <label>
                Summary
                <textarea rows="3" value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} required />
              </label>
              <label>
                Body
                <textarea rows="7" value={form.body} onChange={(event) => updateForm('body', event.target.value)} />
              </label>
              <div className={styles.twoCol}>
                <label>
                  Cover image URL
                  <input value={form.coverImage} onChange={(event) => updateForm('coverImage', event.target.value)} />
                </label>
                <label>
                  Cover upload
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleUpload(event, 'coverImage')} />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Document URL
                  <input value={form.documentUrl} onChange={(event) => updateForm('documentUrl', event.target.value)} />
                </label>
                <label>
                  Document upload
                  <input type="file" accept=".pdf,.doc,.docx,application/pdf" onChange={(event) => handleUpload(event, 'documentUrl', 'documentLabel')} />
                </label>
              </div>
              <div className={styles.twoCol}>
                <label>
                  Document label
                  <input value={form.documentLabel} onChange={(event) => updateForm('documentLabel', event.target.value)} />
                </label>
                <label>
                  Tags
                  <input value={form.tagsText} onChange={(event) => updateForm('tagsText', event.target.value)} placeholder="Book, AI, Cloud" />
                </label>
              </div>
              <div className={styles.priceGrid}>
                <label>
                  Sale price (NGN) ₦
                  <input type="number" min="0" step="0.01" value={form.priceNGN} onChange={(event) => updateForm('priceNGN', event.target.value)} placeholder="0" />
                </label>
                <label>
                  Sale price (USD) $
                  <input type="number" min="0" step="0.01" value={form.priceAmount} onChange={(event) => updateForm('priceAmount', event.target.value)} placeholder="0" />
                </label>
                <label>
                  Price label
                  <input value={form.priceLabel} onChange={(event) => updateForm('priceLabel', event.target.value)} placeholder="Free / ₦5,000 / $9.99" />
                </label>
                <label>
                  Amazon Kindle URL
                  <input value={form.kindleUrl} onChange={(event) => updateForm('kindleUrl', event.target.value)} placeholder="https://www.amazon.com/dp/..." />
                </label>
              </div>
              <label>
                Paystack payment link
                <input value={form.paystackUrl} onChange={(event) => updateForm('paystackUrl', event.target.value)} placeholder="https://paystack.com/pay/..." />
              </label>
            </>
          )}

          <div className={styles.seoPanel}>
            <div className={styles.seoTop}>
              <div>
                <span>SEO tools</span>
                <h3>Search metadata</h3>
              </div>
              <strong>{seoScore}/100</strong>
            </div>
            <label>
              Meta title <small>{form.seoMetaTitle?.length || 0}/70</small>
              <input value={form.seoMetaTitle} onChange={(event) => updateForm('seoMetaTitle', event.target.value)} maxLength="70" />
            </label>
            <label>
              Meta description <small>{form.seoMetaDescription?.length || 0}/170</small>
              <textarea rows="3" value={form.seoMetaDescription} onChange={(event) => updateForm('seoMetaDescription', event.target.value)} maxLength="170" />
            </label>
            {activeArea !== 'research' && (
              <div className={styles.twoCol}>
                <label>
                  Canonical URL
                  <input value={form.canonicalUrl} onChange={(event) => updateForm('canonicalUrl', event.target.value)} />
                </label>
                <label>
                  Keywords
                  <input value={form.keywordsText} onChange={(event) => updateForm('keywordsText', event.target.value)} />
                </label>
              </div>
            )}
          </div>

          <div className={styles.checkRow}>
            {activeArea !== 'research' && (
              <label>
                <input type="checkbox" checked={form.featured} onChange={(event) => updateForm('featured', event.target.checked)} />
                Featured
              </label>
            )}
            <label>
              <input type="checkbox" checked={form.published} onChange={(event) => updateForm('published', event.target.checked)} />
              Published
            </label>
          </div>

          <div className={styles.actionRow}>
            <button type="submit" disabled={status === 'saving' || !!uploading}>
              {status === 'saving' ? 'Saving...' : `Save ${activeMeta.label}`}
            </button>
            {uploading && <span>Uploading...</span>}
            {message && <span className={status === 'error' ? styles.error : styles.message}>{message}</span>}
          </div>
        </form>

        <aside className={styles.listPanel}>
          <div className={styles.formHeader}>
            <div>
              <span>{activeMeta.eyebrow}</span>
              <h2>{records[activeArea].length} records</h2>
            </div>
          </div>

          <div className={styles.itemList}>
            {records[activeArea].map((item) => (
              <article key={item._id} className={styles.item}>
                <div>
                  <span>{recordType(activeArea, item)}</span>
                  <h3>{recordTitle(activeArea, item)}</h3>
                  <p>{statusLine(activeArea, item)}</p>
                </div>
                <div className={styles.itemActions}>
                  <button
                    type="button"
                    onClick={() => editRecord(item)}
                    aria-label={`Edit ${recordTitle(activeArea, item)}`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item._id)}
                    aria-label={`Delete ${recordTitle(activeArea, item)}`}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
            {!records[activeArea].length && <div className={styles.empty}>No records loaded.</div>}
          </div>
        </aside>
      </section>
    </div>
  )
}
