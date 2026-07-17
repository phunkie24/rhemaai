import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    kicker: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    category: {
      type: String,
      enum: ['saas', 'platform', 'tool', 'accelerator', 'api', 'template'],
      default: 'saas',
    },
    group: {
      type: String,
      enum: [
        'agentic-ai',
        'data-engineering',
        'data-science',
        'cloud-architecture',
        'mlops-dataops',
        'enterprise-software',
        'fintech-blockchain',
      ],
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 360,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 6000,
    },
    tags: [{ type: String, trim: true }],
    logoUrl: String,
    assetUrl: String,
    demoUrl: String,
    productUrl: String,
    version: { type: String, trim: true, default: '1.0.0' },
    pricing: {
      amount:      { type: Number, min: 0, default: 0 },
      amountNGN:   { type: Number, min: 0, default: 0 },
      currency:    { type: String, trim: true, uppercase: true, default: 'USD' },
      label:       { type: String, trim: true, default: 'Contact sales' },
      paystackUrl: String,
    },
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

productSchema.index({ category: 1, published: 1, publishedAt: -1 })
productSchema.index({ group: 1, published: 1, publishedAt: -1 })
productSchema.index({ featured: -1, publishedAt: -1 })

export default mongoose.model('Product', productSchema)
