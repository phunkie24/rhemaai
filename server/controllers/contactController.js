import nodemailer from 'nodemailer'
import Joi from 'joi'
import Contact from '../models/Contact.js'
import { parsePagination } from '../utils/pagination.js'

const CONTACT_STATUSES = new Set(['new', 'read', 'replied', 'closed'])

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  company: Joi.string().trim().max(150).allow('', null),
  service: Joi.string().valid(
    'agentic-ai', 'generative-ai', 'ai-advisory',
    'data-engineering', 'data-science', 'cloud-architecture',
    'mlops', 'software-engineering', 'fintech-blockchain', 'general'
  ).default('general'),
  budget: Joi.string().valid(
    'under-10k', '10k-50k', '50k-100k', 'above-100k', 'not-specified'
  ).default('not-specified'),
  message: Joi.string().trim().min(10).max(2000).required(),
})

// Hostinger email uses SMTP directly (not the gmail service shorthand)
const emailEnabled = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
const transporter = emailEnabled
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_PORT || '465', 10),
      secure: true,          // SSL on port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function submitContact(req, res, next) {
  try {
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((d) => d.message),
      })
    }

    const contact = await Contact.create({ ...value, ipAddress: req.ip })
    const firstName = escapeHtml(value.name.split(' ')[0])
    const company = value.company ? escapeHtml(value.company) : 'Not provided'

    // NOTIFY_EMAIL can be a different inbox (e.g. personal Gmail); falls back to EMAIL_USER
    const notifyRecipients = [
      process.env.EMAIL_USER,
      process.env.NOTIFY_EMAIL,
    ].filter(Boolean).join(', ')

    const notificationEmail = {
      from: `"RhemaAI Solutions Ltd Website" <${process.env.EMAIL_USER}>`,
      to: notifyRecipients,
      subject: `New Consultation Request - ${value.name} (${value.company || 'No company'})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #6B46FF; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Consultation Request</h2>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">RhemaAI Solutions Ltd Website</p>
          </div>
          <div style="background: #f8f7ff; padding: 28px; border-radius: 0 0 12px 12px; border: 1px solid #e8e6f5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600; width: 120px;">Name</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${escapeHtml(value.name)}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;"><a href="mailto:${escapeHtml(value.email)}">${escapeHtml(value.email)}</a></td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Company</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${company}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Service</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${escapeHtml(value.service)}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #6B6080; font-weight: 600;">Budget</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0F0A1E;">${escapeHtml(value.budget)}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e8e6f5;">
              <p style="font-size: 13px; color: #6B6080; font-weight: 600; margin-bottom: 8px;">Message</p>
              <p style="font-size: 14px; color: #0F0A1E; line-height: 1.7; margin: 0;">${escapeHtml(value.message)}</p>
            </div>
          </div>
        </div>
      `,
    }

    const autoReply = {
      from: `"RhemaAI Solutions Ltd" <${process.env.EMAIL_USER}>`,
      to: value.email,
      subject: `Thank you for reaching out, ${value.name.split(' ')[0]} - RhemaAI Solutions Ltd`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6B46FF, #3D1FAB); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">RhemaAI Solutions Ltd</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Enterprise AI & Cloud Transformation</p>
          </div>
          <div style="background: #f8f7ff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8e6f5;">
            <h2 style="font-size: 20px; color: #0F0A1E; margin: 0 0 16px;">Thank you, ${firstName}!</h2>
            <p style="font-size: 15px; color: #5A5370; line-height: 1.75; margin-bottom: 20px;">
              We've received your consultation request and our team will review it within <strong>24 hours</strong>.
              We look forward to discussing how we can help transform your enterprise with AI and cloud technology.
            </p>
            <p style="font-size: 15px; color: #5A5370; line-height: 1.75; margin-bottom: 28px;">
              In the meantime, you can explore our <a href="https://rhemaaisolutions.tech/insights" style="color: #6B46FF;">latest insights</a>
              or check out <a href="https://eliteaiacademy.com" style="color: #6B46FF;">EliteAI Academy</a> for enterprise AI learning resources.
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://rhemaaisolutions.tech/services" style="background: #6B46FF; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Explore Our Services
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e8e6f5; margin: 24px 0;">
            <p style="font-size: 12px; color: #9896AB; text-align: center; margin: 0;">
              RhemaAI Solutions Ltd | info@rhemaaisolutions.tech | rhemaaisolutions.tech
            </p>
          </div>
        </div>
      `,
    }

    if (emailEnabled) {
      await Promise.allSettled([
        transporter.sendMail(notificationEmail),
        transporter.sendMail(autoReply),
      ])
    } else if (process.env.NODE_ENV !== 'test') {
      console.warn('Email not configured. Set EMAIL_USER and EMAIL_PASS in .env to enable.')
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      id: contact._id,
    })
  } catch (err) {
    next(err)
  }
}

export async function getContacts(req, res, next) {
  try {
    const { status } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 20, maxLimit: 100 })

    if (status && !CONTACT_STATUSES.has(status)) {
      return res.status(400).json({ message: 'Invalid status filter.' })
    }

    const filter = status ? { status } : {}
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const total = await Contact.countDocuments(filter)
    return res.json({ contacts, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}
