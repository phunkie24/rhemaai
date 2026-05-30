import nodemailer from 'nodemailer'
import Joi from 'joi'
import Contact from '../models/Contact.js'

// Joi validation schema
const contactSchema = Joi.object({
  name:    Joi.string().min(2).max(100).required(),
  email:   Joi.string().email().required(),
  company: Joi.string().max(150).allow('', null),
  service: Joi.string().valid(
    'agentic-ai', 'data-engineering', 'data-science',
    'cloud-architecture', 'mlops', 'software-engineering',
    'fintech-blockchain', 'general'
  ).default('general'),
  budget:  Joi.string().valid(
    'under-10k', '10k-50k', '50k-100k', 'above-100k', 'not-specified'
  ).default('not-specified'),
  message: Joi.string().min(10).max(2000).required(),
})

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// POST /api/contact
export async function submitContact(req, res, next) {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((d) => d.message),
      })
    }

    // Save to MongoDB
    const contact = await Contact.create({
      ...value,
      ipAddress: req.ip,
    })

    // Send notification email to team
    const notificationEmail = {
      from: `"RhemaAI Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Consultation Request — ${value.name} (${value.company || 'No company'})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #6B46FF; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Consultation Request</h2>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">RhemaAI Technologies Website</p>
          </div>
          <div style="background: #f8f7ff; padding: 28px; border-radius: 0 0 12px 12px; border: 1px solid #e8e6f5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600; width: 120px;">Name</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${value.name}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;"><a href="mailto:${value.email}">${value.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Company</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${value.company || '—'}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Service</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${value.service}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Budget</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${value.budget}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e8e6f5;">
              <p style="font-size: 13px; color: #6B6080; font-weight: 600; margin-bottom: 8px;">Message</p>
              <p style="font-size: 14px; color: #0F0A1E; line-height: 1.7; margin: 0;">${value.message}</p>
            </div>
          </div>
        </div>
      `,
    }

    // Send auto-reply to client
    const autoReply = {
      from: `"RhemaAI Technologies" <${process.env.EMAIL_USER}>`,
      to: value.email,
      subject: `Thank you for reaching out, ${value.name.split(' ')[0]} — RhemaAI Technologies`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6B46FF, #3D1FAB); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">RhemaAI Technologies</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Enterprise AI & Cloud Transformation</p>
          </div>
          <div style="background: #f8f7ff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8e6f5;">
            <h2 style="font-size: 20px; color: #0F0A1E; margin: 0 0 16px;">Thank you, ${value.name.split(' ')[0]}!</h2>
            <p style="font-size: 15px; color: #5A5370; line-height: 1.75; margin-bottom: 20px;">
              We've received your consultation request and our team will review it within <strong>24 hours</strong>.
              We look forward to discussing how we can help transform your enterprise with AI and cloud technology.
            </p>
            <p style="font-size: 15px; color: #5A5370; line-height: 1.75; margin-bottom: 28px;">
              In the meantime, you can explore our <a href="https://rhemaai.tech/insights" style="color: #6B46FF;">latest insights</a> 
              or check out <a href="https://eliteaiacademy.com" style="color: #6B46FF;">EliteAI Academy</a> for enterprise AI learning resources.
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://rhemaai.tech/services" style="background: #6B46FF; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Explore Our Services →
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e8e6f5; margin: 24px 0;">
            <p style="font-size: 12px; color: #9896AB; text-align: center; margin: 0;">
              RhemaAI Technologies · hello@rhemaai.tech · rhemaai.tech
            </p>
          </div>
        </div>
      `,
    }

    // Fire emails (non-blocking)
    await Promise.allSettled([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(autoReply),
    ])

    return res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      id: contact._id,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/contact (admin only — add auth middleware in prod)
export async function getContacts(req, res, next) {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = status ? { status } : {}
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
    const total = await Contact.countDocuments(filter)
    return res.json({ contacts, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}
