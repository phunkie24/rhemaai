import { Router } from 'express'
import { subscribe } from '../controllers/newsletterController.js'
import { newsletterLimiter } from '../middleware/rateLimiter.js'

const router = Router()

/**
 * @openapi
 * /newsletter:
 *   post:
 *     tags: [Newsletter]
 *     summary: Subscribe to the RhemaAI newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: you@company.com
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       400:
 *         description: Invalid email or already subscribed
 *       429:
 *         description: Too many attempts (10/hr limit)
 */
router.post('/', newsletterLimiter, subscribe)
export default router
