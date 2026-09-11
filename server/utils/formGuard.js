import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import FormGuardBucket from '../models/FormGuardBucket.js'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR
const digest = (value) => createHash('sha256').update(value).digest('hex')
const normalize = (value) => String(value || '').normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()

function senderKey(email) {
  let [local, domain] = normalize(email).split('@')
  // Quotas group common aliases; delivery still uses the submitted address.
  local = local.split('+')[0]
  if (domain === 'googlemail.com') domain = 'gmail.com'
  if (domain === 'gmail.com') local = local.replace(/\./g, '')
  return `${local}@${domain}`
}

// Group IPv6 clients by /64 so rotating addresses within one network does not
// trivially bypass the form limit. Express supplies the trusted proxy's IP.
function networkKey(ip = '') {
  if (ip.startsWith('::ffff:') && isIP(ip.slice(7)) === 4) return ip.slice(7)
  if (isIP(ip) !== 6) return ip
  const expanded = new URL(`http://[${ip}]/`).hostname.slice(1, -1)
  const [left, right = ''] = expanded.split('::')
  const first = left ? left.split(':') : []
  const last = right ? right.split(':') : []
  const groups = expanded.includes('::') ? [...first, ...Array(8 - first.length - last.length).fill('0'), ...last] : first
  return groups.slice(0, 4).map((part) => part.padStart(4, '0')).join(':')
}

// Atomic sliding windows, including simultaneous requests and multiple workers.
// Expiry is checked here; Mongo's asynchronous TTL cleanup is not relied upon.
export async function consumeFormQuota(kind, key, limit, windowMs, now = new Date()) {
  const id = `${kind}:${digest(key)}`
  const expiresAt = new Date(now.getTime() + windowMs)
  try {
    await FormGuardBucket.updateOne({ _id: id }, {
      $setOnInsert: { events: [], expiresAt },
    }, { upsert: true })
  } catch (error) {
    if (error.code !== 11000) throw error
  }
  const recent = { $filter: {
    input: '$events', as: 'event',
    cond: { $gt: ['$$event', new Date(now.getTime() - windowMs)] },
  } }
  const bucket = await FormGuardBucket.findOneAndUpdate({
    _id: id,
    $expr: { $lt: [{ $size: recent }, limit] },
  }, [{ $set: { events: { $concatArrays: [recent, [now]] }, expiresAt } }], { new: true })
  return bucket ? id : null
}

function reject(res, scope, reason, status, message, retryAfter) {
  // Do not put visitor content or personal data into security logs.
  console.warn(`[form-guard] ${scope}: ${reason}`)
  if (retryAfter) res.set('Retry-After', String(retryAfter))
  res.status(status).json({ message })
  return false
}

// Empty for people using the form, commonly filled by indiscriminate form bots.
export function formHoneypot(req, res, next) {
  if (req.body?.website != null && req.body.website !== '') {
    console.warn('[form-guard] honeypot submission ignored')
    return res.status(201).json({ success: true, message: 'Your request has been received.' })
  }
  if (req.body && typeof req.body === 'object') delete req.body.website
  next()
}

const linksIn = (text) => text.match(/\b(?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9][a-z0-9.-]*\.(?:com|net|org|io|co|xyz|top|click|ru|cn|info|biz|tech|online|site|link)\b(?:\/[^\s<>"']*)?/gi) || []

function blockedSender(email) {
  const entries = (process.env.FORM_BLOCKED_SENDERS || '').split(',').map(normalize).filter(Boolean)
  const domain = email.split('@')[1]
  return entries.some((entry) => entry.includes('@') ? entry === email : domain === entry || domain.endsWith(`.${entry}`))
}

function suspiciousContent(text, singleLineFields) {
  if (singleLineFields.some((field) => /[\r\n\u0000-\u001F\u007F]/.test(field || '') || linksIn(field || '').length)) return 'identity-content'
  if (/<\s*(?:script|iframe|object|embed|a)\b|\[url[=\]]/i.test(text)) return 'active-markup'
  const links = linksIn(text)
  if (links.length > 2) return 'link-flood'
  for (const link of links) {
    try {
      const url = new URL(/^https?:\/\//i.test(link) ? link : `https://${link}`)
      if (url.username || url.password || /\.(?:exe|msi|scr|bat|cmd|ps1|vbs)(?:$|\/)/i.test(url.pathname)) return 'unsafe-link'
    } catch { return 'invalid-link' }
  }
  // Narrow combinations, not broad bans on financial or security vocabulary:
  // RhemaAI has legitimate FinTech, blockchain and cybersecurity enquiries.
  if (/\b(?:you have won|you are (?:a |the )?(?:winner|beneficiary)|unclaimed inheritance)\b/i.test(text) && /\b(?:claim|transfer|fee|funds|prize)\b/i.test(text)) return 'prize-scam'
  if (/\b(?:send|share|provide|confirm)\s+(?:us\s+)?your\s+(?:password|otp|one.time (?:code|password)|seed phrase|private key)\b/i.test(text)) return 'credential-request'
  if (links.length && /\b(?:mailbox|email account|hosting account)\b/i.test(text) && /\b(?:suspend(?:ed)?|deactivat(?:ed|ion)|verify (?:your|the) account)\b/i.test(text)) return 'account-phishing'
  return null
}

export async function allowFormSubmission(req, res, { scope, email, text = '', singleLineFields = [], fingerprint }) {
  const sender = normalize(email)
  if (blockedSender(sender)) return reject(res, scope, 'blocked-sender', 422, 'This enquiry could not be accepted. Please use the telephone contact on this page.')
  const reason = suspiciousContent(text.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, ''), singleLineFields)
  if (reason) return reject(res, scope, reason, 422, 'Please use plain text, keep links to a maximum of two, and remove sign-in requests or download links before submitting.')

  if (!await consumeFormQuota('network', networkKey(req.ip), 5, HOUR)) {
    return reject(res, scope, 'network-limit', 429, 'Too many form submissions. Please try again in an hour.', 3600)
  }
  if (!await consumeFormQuota('sender', senderKey(email), 3, HOUR)) {
    return reject(res, scope, 'sender-limit', 429, 'Too many form submissions. Please try again in an hour.', 3600)
  }
  if (fingerprint) {
    const key = JSON.stringify([scope, senderKey(email), normalize(fingerprint)])
    const claim = await consumeFormQuota('duplicate', key, 1, DAY)
    if (!claim) return reject(res, scope, 'duplicate', 429, 'This message was submitted recently. Please allow our team time to respond.', 86400)
    // Release a duplicate reservation if saving the enquiry fails. Quotas still
    // count attempted submissions, so retries cannot bypass the other controls.
    req.releaseFormDuplicate = () => FormGuardBucket.deleteOne({ _id: claim })
  }
  return true
}

export async function releaseFailedSubmission(req) {
  if (req.releaseFormDuplicate) {
    await req.releaseFormDuplicate().catch(() => {})
    delete req.releaseFormDuplicate
  }
}

// An unverified address can receive at most one automatic reply per hour,
// shared between contact, demo and assessment forms, even across IP changes.
export async function allowVisitorEmail(email) {
  return Boolean(await consumeFormQuota('visitor-email', senderKey(email), 1, HOUR))
}
