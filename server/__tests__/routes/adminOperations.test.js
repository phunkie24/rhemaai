import { describe, it, expect, beforeAll } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'
import Product from '../../models/Product.js'
import Insight from '../../models/Insight.js'
import CaseStudy from '../../models/CaseStudy.js'
import { setupTestDB } from '../helpers/db.js'

setupTestDB()

beforeAll(() => {
  process.env.NODE_ENV = 'test'
})

describe('Product operations', () => {
  it('returns only published products on the public route', async () => {
    await Product.create({
      name: 'Published SaaS Product',
      slug: 'published-saas-product',
      category: 'saas',
      summary: 'A published SaaS product available on the public product page.',
      published: true,
      publishedAt: new Date('2026-05-01'),
    })
    await Product.create({
      name: 'Draft SaaS Product',
      slug: 'draft-saas-product',
      category: 'saas',
      summary: 'A draft SaaS product that should not be public yet.',
      published: false,
    })

    const res = await request(app).get('/api/products')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.products[0].slug).toBe('published-saas-product')
  })

  it('returns a published product detail by slug', async () => {
    await Product.create({
      name: 'Published SaaS Product',
      slug: 'published-saas-product',
      category: 'saas',
      summary: 'A published SaaS product available on the public product page.',
      description: 'Full product details for the dedicated product URL.',
      published: true,
      publishedAt: new Date('2026-05-01'),
    })

    const res = await request(app).get('/api/products/published-saas-product')

    expect(res.status).toBe(200)
    expect(res.body.slug).toBe('published-saas-product')
    expect(res.body.description).toBe('Full product details for the dedicated product URL.')
  })

  it('creates a SaaS product with an uploaded package URL through admin operations', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .send({
        name: 'AI Workflow SaaS',
        category: 'saas',
        summary: 'A SaaS product record for AI workflow operations.',
        description: 'Full product notes and release details.',
        assetUrl: '/api/uploads/release.zip',
        demoUrl: 'https://example.com/demo',
        tags: ['SaaS', 'AI'],
        pricing: {
          amount: 99,
          currency: 'USD',
          label: 'Monthly',
        },
        published: true,
      })

    expect(res.status).toBe(201)
    expect(res.body.product.slug).toBe('ai-workflow-saas')
    expect(res.body.product.assetUrl).toBe('/api/uploads/release.zip')
    expect(res.body.product.pricing.label).toBe('Monthly')
  })
})

describe('Case study operations', () => {
  it('returns only published case studies on the public route', async () => {
    await CaseStudy.create({
      title: 'Published Case Study',
      slug: 'published-case-study',
      industry: 'FinTech',
      client: 'Digital Bank',
      kpi1: { value: '94%', label: 'Fraud Recall' },
      kpi2: { value: '<50ms', label: 'Latency' },
      summary: 'A published case study available on the public page.',
      published: true,
      publishedAt: new Date('2026-05-01'),
    })
    await CaseStudy.create({
      title: 'Draft Case Study',
      slug: 'draft-case-study',
      industry: 'Energy',
      client: 'Energy Operator',
      kpi1: { value: '34%', label: 'Downtime Reduction' },
      kpi2: { value: '6hrs', label: 'Lead Time' },
      summary: 'A draft case study that should not be public yet.',
      published: false,
    })

    const res = await request(app).get('/api/case-studies')

    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.caseStudies[0].slug).toBe('published-case-study')
  })

  it('creates a case study through admin operations', async () => {
    const res = await request(app)
      .post('/api/admin/case-studies')
      .send({
        title: 'Admin Case Study',
        industry: 'Retail',
        client: 'Retail Group',
        kpi1: { value: '3wks to 2hrs', label: 'Reporting Cycle' },
        kpi2: { value: '5', label: 'ERPs Unified' },
        summary: 'A case study created from the admin operations console.',
        body: 'Full case study details and delivery notes.',
        tags: ['Azure Fabric', 'Power BI'],
        accent: '#34D399',
        published: true,
      })

    expect(res.status).toBe(201)
    expect(res.body.caseStudy.slug).toBe('admin-case-study')
    expect(res.body.caseStudy.kpi1.value).toBe('3wks to 2hrs')
  })

  it('updates and deletes a case study through admin operations', async () => {
    const created = await CaseStudy.create({
      title: 'Editable Case Study',
      slug: 'editable-case-study',
      industry: 'Healthcare',
      client: 'Care Network',
      kpi1: { value: '42%', label: 'Triage Speed' },
      kpi2: { value: '18%', label: 'Cost Reduction' },
      summary: 'A case study that can be edited and removed from admin operations.',
      published: false,
    })

    const updateRes = await request(app)
      .put(`/api/admin/case-studies/${created._id}`)
      .send({
        title: 'Edited Case Study',
        slug: 'edited-case-study',
        industry: 'Healthcare',
        client: 'Care Network',
        kpi1: { value: '55%', label: 'Triage Speed' },
        kpi2: { value: '22%', label: 'Cost Reduction' },
        summary: 'An edited case study ready to publish from admin operations.',
        body: 'Updated case study notes.',
        tags: ['AI', 'Healthcare'],
        published: true,
      })

    expect(updateRes.status).toBe(200)
    expect(updateRes.body.caseStudy.slug).toBe('edited-case-study')
    expect(updateRes.body.caseStudy.published).toBe(true)

    const deleteRes = await request(app).delete(`/api/admin/case-studies/${created._id}`)

    expect(deleteRes.status).toBe(200)
    expect(await CaseStudy.findById(created._id)).toBeNull()
  })
})

describe('Research article operations', () => {
  it('creates a research article through admin operations', async () => {
    const res = await request(app)
      .post('/api/admin/insights')
      .send({
        title: 'Research Article From Admin',
        excerpt: 'A concise excerpt for an admin-managed research article.',
        content: 'Full research article content with enough detail to validate.',
        category: 'enterprise-ai',
        tags: ['research', 'enterprise-ai'],
        coverImage: '/api/uploads/research-cover.png',
        readTime: 8,
        published: true,
        author: {
          name: 'RhemaAI Labs',
        },
        seo: {
          metaTitle: 'Research Article From Admin',
          metaDescription: 'SEO description for an admin-managed research article.',
        },
      })

    expect(res.status).toBe(201)
    expect(res.body.insight.slug).toBe('research-article-from-admin')
    expect(res.body.insight.coverImage).toBe('/api/uploads/research-cover.png')

    const stored = await Insight.findOne({ slug: 'research-article-from-admin' })
    expect(stored.published).toBe(true)
  })
})
