import mongoose from 'mongoose'

// Short-lived abuse counters shared by all server processes. No message bodies,
// email addresses or IP addresses are stored here; keys are SHA-256 digests.
const formGuardBucketSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  events: { type: [Date], default: [] },
  expiresAt: { type: Date, required: true },
}, { versionKey: false })

formGuardBucketSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.model('FormGuardBucket', formGuardBucketSchema)
