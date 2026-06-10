import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Publication from '../models/Publication.js'

const publications = [
  {
    title: 'Multi-Agent Orchestration Patterns for Enterprise Scale Systems',
    slug: 'multi-agent-orchestration-patterns-enterprise-scale-systems',
    type: 'book',
    summary: 'Architectures, patterns and operational practices for reliable, governed and scalable multi-agent AI systems in enterprise environments.',
    body: `Multi-Agent Orchestration Patterns for Enterprise Scale Systems is a practical guide for architects, founders and technology leaders designing reliable agentic AI systems.

The book covers orchestration patterns, governance controls, observability, operational practices and enterprise-scale delivery approaches for multi-agent AI systems.`,
    coverImage: '/api/uploads/multi-agent-book-cover.jpg',
    tags: ['Multi-Agent Systems', 'Agentic AI', 'Enterprise Architecture', 'Governance'],
    price: {
      amount: 0,
      currency: 'USD',
      label: 'New release',
    },
    featured: true,
    published: true,
    publishedAt: new Date('2026-06-10'),
    author: { name: 'Funke R. Yusuf' },
    seo: {
      metaTitle: 'Multi-Agent Orchestration Patterns Book | Funke R. Yusuf',
      metaDescription: 'A practical enterprise AI book on multi-agent orchestration patterns, governed agentic AI systems, architecture and operations.',
      canonicalUrl: '/publications',
      keywords: ['multi-agent orchestration', 'agentic AI', 'enterprise AI', 'AI governance'],
    },
  },
]

async function seedPublications() {
  try {
    await connectDB()

    await Promise.all(publications.map((publication) => (
      Publication.updateOne(
        { slug: publication.slug },
        { $setOnInsert: publication },
        { upsert: true }
      )
    )))

    console.log(`Verified ${publications.length} publication`)
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Publication seed failed:', err)
    await mongoose.disconnect().catch(() => {})
    process.exit(1)
  }
}

seedPublications()
