import mongoose from 'mongoose'

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    client: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    kpi1: {
      value: { type: String, required: true, trim: true, maxlength: 40 },
      label: { type: String, required: true, trim: true, maxlength: 80 },
    },
    kpi2: {
      value: { type: String, required: true, trim: true, maxlength: 40 },
      label: { type: String, required: true, trim: true, maxlength: 80 },
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    body: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    tags: [{ type: String, trim: true }],
    accent: { type: String, default: '#9B6DFF' },
    coverImage: String,
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    publishedAt: Date,
    seo: {
      metaTitle: String,
      metaDescription: String,
      canonicalUrl: String,
      keywords: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
)

caseStudySchema.index({ industry: 1, published: 1, publishedAt: -1 })
caseStudySchema.index({ featured: -1, publishedAt: -1 })

export default mongoose.model('CaseStudy', caseStudySchema)
