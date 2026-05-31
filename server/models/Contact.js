import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    service: {
      type: String,
      enum: [
        'agentic-ai',
        'generative-ai',
        'ai-advisory',
        'data-engineering',
        'data-science',
        'cloud-architecture',
        'mlops',
        'software-engineering',
        'fintech-blockchain',
        'general',
      ],
      default: 'general',
    },
    budget: {
      type: String,
      enum: ['under-10k', '10k-50k', '50k-100k', 'above-100k', 'not-specified'],
      default: 'not-specified',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new',
    },
    ipAddress: String,
  },
  { timestamps: true }
)

// Index for querying by status and date
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.model('Contact', contactSchema)
