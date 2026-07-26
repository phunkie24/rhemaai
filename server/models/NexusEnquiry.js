import mongoose from 'mongoose'

const dimensionScoreSchema = new mongoose.Schema({
  slug: { type: String, trim: true, maxlength: 80 },
  name: { type: String, trim: true, maxlength: 120 },
  score: { type: Number, min: 0, max: 100 },
}, { _id: false })

const nexusEnquirySchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['demo', 'assessment'], required: true },
    fullName: { type: String, trim: true, maxlength: 100 },
    workEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    company: { type: String, trim: true, maxlength: 160 },
    jobTitle: { type: String, trim: true, maxlength: 120 },
    country: { type: String, trim: true, maxlength: 100 },
    organisationSize: { type: String, trim: true, maxlength: 40 },
    industry: { type: String, trim: true, maxlength: 120 },
    primaryUseCase: { type: String, trim: true, maxlength: 1000 },
    aiMaturity: { type: String, trim: true, maxlength: 40 },
    cloudEnvironment: { type: String, trim: true, maxlength: 80 },
    requiredIntegrations: { type: String, trim: true, maxlength: 600 },
    deploymentOption: { type: String, trim: true, maxlength: 80 },
    timeline: { type: String, trim: true, maxlength: 40 },
    additionalContext: { type: String, trim: true, maxlength: 1600 },
    engagement: { type: String, trim: true, maxlength: 40 },
    interest: { type: String, trim: true, maxlength: 60 },
    indicativeBudget: { type: String, trim: true, maxlength: 40 },
    assessmentScore: { type: Number, min: 0, max: 100 },
    assessmentBand: { type: String, trim: true, maxlength: 60 },
    dimensionScores: [dimensionScoreSchema],
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
    ipAddress: String,
  },
  { timestamps: true }
)

nexusEnquirySchema.index({ kind: 1, status: 1, createdAt: -1 })
nexusEnquirySchema.index({ workEmail: 1, createdAt: -1 })

export default mongoose.model('NexusEnquiry', nexusEnquirySchema)
