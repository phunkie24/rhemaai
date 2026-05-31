import Joi from 'joi'
import { Subscriber } from '../models/Subscriber.js'

const emailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
})

export async function subscribe(req, res, next) {
  try {
    const { error, value } = emailSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    const existing = await Subscriber.findOne({ email: value.email })
    if (existing) {
      if (!existing.active) {
        existing.active = true
        await existing.save()
        return res.json({ success: true, message: 'Welcome back! You are resubscribed.' })
      }
      return res.json({ success: true, message: 'You are already subscribed.' })
    }

    await Subscriber.create({ email: value.email })
    return res.status(201).json({ success: true, message: 'Successfully subscribed!' })
  } catch (err) {
    next(err)
  }
}
