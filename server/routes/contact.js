import { Router } from 'express'
import { submitContact, getContacts } from '../controllers/contactController.js'
import { requireAdmin } from '../middleware/adminAuth.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = Router()

/**
 * @openapi
 * /contact:
 *   post:
 *     tags: [Contact]
 *     summary: Submit a consultation request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Request received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 id:      { type: string }
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       429:
 *         description: Too many submissions (5/hr limit)
 *   get:
 *     tags: [Contact]
 *     summary: List contact submissions (admin only)
 *     security:
 *       - AdminApiKey: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, read, replied, closed]
 *     responses:
 *       200:
 *         description: Paginated contact submissions
 *       401:
 *         description: Missing or invalid admin key
 */
router.post('/', contactLimiter, submitContact)
router.get('/', requireAdmin, getContacts)

export default router
