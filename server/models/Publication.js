import mongoose from 'mongoose'

const publicationSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['book', 'whitepaper'],
      required: true,
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
    coverImage: String,
    documentUrl: String,
    documentLabel: String,
    tags: [{ type: String, trim: true }],
    price: {
      amount: { type: Number, min: 0, default: 0 },
      currency: { type: String, trim: true, uppercase: true, default: 'USD' },
      label: { type: String, trim: true, default: 'Free' },
      kindleUrl: String,
      paymentUrl: String,
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    publishedAt: Date,
    author: {
      name: { type: String, default: 'RhemaAI Solutions Ltd' },
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      canonicalUrl: String,
      keywords: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
)

publicationSchema.index({ type: 1, published: 1, publishedAt: -1 })
publicationSchema.index({ featured: -1, publishedAt: -1 })

export default mongoose.model('Publication', publicationSchema)
