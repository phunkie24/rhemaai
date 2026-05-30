// models/Subscriber.js (inline for brevity — can be split)
import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    active: { type: Boolean, default: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
)

export const Subscriber = mongoose.model('Subscriber', subscriberSchema)
