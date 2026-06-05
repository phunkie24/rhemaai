import { Router } from 'express'
import { getPublicationBySlug, getPublications } from '../controllers/publicationsController.js'

const router = Router()

/**
 * @openapi
 * /publications:
 *   get:
 *     tags: [Publications]
 *     summary: List published research publications
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, whitepaper, case-study, research, report]
 *     responses:
 *       200:
 *         description: Paginated publications list
 * /publications/{slug}:
 *   get:
 *     tags: [Publications]
 *     summary: Get a single publication by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Publication detail
 *       404:
 *         description: Publication not found
 */
router.get('/', getPublications)
router.get('/:slug', getPublicationBySlug)

export default router
