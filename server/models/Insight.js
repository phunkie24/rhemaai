import mongoose from 'mongoose'

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 400,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'agentic-ai',
        'data-engineering',
        'data-science',
        'cloud-architecture',
        'mlops',
        'fintech',
        'enterprise-ai',
      ],
      required: true,
    },
    tags: [{ type: String, trim: true }],
    coverImage: String,
    architectureImage: String,
    readTime: { type: Number, default: 5 }, // minutes
    published: { type: Boolean, default: false },
    publishedAt: Date,
    author: {
      name:   { type: String, default: 'RhemaAI Solutions Ltd Team' },
      avatar: String,
    },
    seo: {
      metaTitle:       String,
      metaDescription: String,
    },
  },
  { timestamps: true }
)

insightSchema.index({ category: 1, published: 1, publishedAt: -1 })
insightSchema.index({ published: 1, publishedAt: -1 })

export default mongoose.model('Insight', insightSchema)
