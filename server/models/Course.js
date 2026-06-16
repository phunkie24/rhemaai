import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug:  { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, maxlength: 2000 },
    category: {
      type: String,
      required: true,
      enum: [
        'data-engineering',
        'machine-learning',
        'generative-ai',
        'agentic-ai',
        'software-engineering',
        'cloud-architecture',
        'advanced-analytics',
      ],
    },
    youtubeUrl: { type: String, required: true, trim: true },
    youtubeId:  { type: String, trim: true },
    thumbnail:  { type: String, trim: true },
    instructor: { type: String, trim: true, default: 'RhemaAI Technologies' },
    duration:   { type: String, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    tags:      [{ type: String, trim: true }],
    pricing: {
      isFree:      { type: Boolean, default: true },
      amount:      { type: Number, min: 0, default: 0 },
      amountNGN:   { type: Number, min: 0, default: 0 },
      currency:    { type: String, uppercase: true, default: 'USD' },
      label:       { type: String, default: 'Free' },
      paymentUrl:  String,
    },
    featured:  { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    publishedAt: Date,
    seo: {
      metaTitle:       String,
      metaDescription: String,
    },
  },
  { timestamps: true }
)

courseSchema.index({ category: 1, published: 1, publishedAt: -1 })
courseSchema.index({ featured: -1, publishedAt: -1 })

export default mongoose.model('Course', courseSchema)
