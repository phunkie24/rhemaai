import { describe, it, expect } from '@jest/globals'
import Insight from '../../models/Insight.js'
import { setupTestDB } from '../helpers/db.js'
import { validInsight, unpublishedInsight } from '../helpers/fixtures.js'

setupTestDB()

describe('Insight Model', () => {
  describe('Valid insight creation', () => {
    it('creates an insight with all required fields', async () => {
      const insight = await Insight.create(validInsight)
      expect(insight._id).toBeDefined()
      expect(insight.title).toBe(validInsight.title)
      expect(insight.slug).toBe(validInsight.slug)
      expect(insight.published).toBe(true)
    })

    it('defaults published to false', async () => {
      const insight = await Insight.create(unpublishedInsight)
      expect(insight.published).toBe(false)
    })

    it('defaults readTime to 5', async () => {
      const { readTime, ...rest } = validInsight
      const insight = await Insight.create({ ...rest, slug: 'no-read-time' })
      expect(insight.readTime).toBe(5)
    })

    it('stores tags as an array', async () => {
      const insight = await Insight.create({ ...validInsight, slug: 'with-tags' })
      expect(Array.isArray(insight.tags)).toBe(true)
      expect(insight.tags).toContain('test')
    })

    it('lowercases slug', async () => {
      const insight = await Insight.create({ ...validInsight, slug: 'UPPERCASE-SLUG' })
      expect(insight.slug).toBe('uppercase-slug')
    })

    it('stores nested author', async () => {
      const insight = await Insight.create(validInsight)
      expect(insight.author.name).toBe('Test Author')
    })

    it('stores SEO metadata', async () => {
      const insight = await Insight.create({
        ...validInsight,
        slug: 'with-seo',
        seo: { metaTitle: 'SEO Title', metaDescription: 'SEO Desc' },
      })
      expect(insight.seo.metaTitle).toBe('SEO Title')
    })
  })

  describe('Validation errors', () => {
    it('rejects missing title', async () => {
      const { title, ...rest } = validInsight
      await expect(Insight.create({ ...rest, slug: 'no-title' })).rejects.toThrow()
    })

    it('rejects missing slug', async () => {
      const { slug, ...rest } = validInsight
      await expect(Insight.create(rest)).rejects.toThrow()
    })

    it('rejects missing excerpt', async () => {
      const { excerpt, ...rest } = validInsight
      await expect(Insight.create(rest)).rejects.toThrow()
    })

    it('rejects missing content', async () => {
      const { content, ...rest } = validInsight
      await expect(Insight.create(rest)).rejects.toThrow()
    })

    it('rejects missing category', async () => {
      const { category, ...rest } = validInsight
      await expect(Insight.create(rest)).rejects.toThrow()
    })

    it('rejects invalid category enum', async () => {
      await expect(
        Insight.create({ ...validInsight, slug: 'bad-cat', category: 'blockchain' })
      ).rejects.toThrow()
    })

    it('rejects duplicate slug', async () => {
      await Insight.create(validInsight)
      const err = await Insight.create(validInsight).catch((e) => e)
      expect(err.code).toBe(11000)
    })
  })

  describe('Valid category values', () => {
    const categories = [
      'agentic-ai', 'data-engineering', 'data-science',
      'cloud-architecture', 'mlops', 'fintech', 'enterprise-ai',
    ]

    categories.forEach((category, i) => {
      it(`accepts category: ${category}`, async () => {
        const insight = await Insight.create({
          ...validInsight,
          slug: `cat-test-${i}`,
          category,
        })
        expect(insight.category).toBe(category)
      })
    })
  })
})
