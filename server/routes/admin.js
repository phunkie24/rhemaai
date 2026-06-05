import express from 'express'
import { Router } from 'express'
import { requireAdmin } from '../middleware/adminAuth.js'
import {
  createAdminPublication,
  deleteAdminPublication,
  listAdminPublications,
  updateAdminPublication,
  uploadAdminAsset,
} from '../controllers/publicationsController.js'
import {
  createAdminProduct,
  deleteAdminProduct,
  listAdminProducts,
  updateAdminProduct,
} from '../controllers/productsController.js'
import {
  createAdminCaseStudy,
  deleteAdminCaseStudy,
  listAdminCaseStudies,
  updateAdminCaseStudy,
} from '../controllers/caseStudiesController.js'
import {
  createAdminInsight,
  deleteAdminInsight,
  listAdminInsights,
  updateAdminInsight,
} from '../controllers/adminInsightsController.js'

const router = Router()

/**
 * @openapi
 * /admin/insights:
 *   get:
 *     tags: [Admin]
 *     summary: List all insights (admin)
 *     security: [{ AdminApiKey: [] }]
 *     responses:
 *       200: { description: All insights }
 *       401: { description: Unauthorized }
 *   post:
 *     tags: [Admin]
 *     summary: Create a new insight
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug, excerpt, content, category]
 *             properties:
 *               title:    { type: string }
 *               slug:     { type: string }
 *               excerpt:  { type: string }
 *               content:  { type: string }
 *               category: { type: string }
 *               tags:     { type: array, items: { type: string } }
 *               published: { type: boolean }
 *     responses:
 *       201: { description: Insight created }
 *       400: { description: Validation error }
 * /admin/insights/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update an insight
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     tags: [Admin]
 *     summary: Delete an insight
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /admin/uploads:
 *   post:
 *     tags: [Admin]
 *     summary: Upload a file asset (image, PDF, doc)
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             type: string
 *             format: binary
 *     parameters:
 *       - in: header
 *         name: x-file-name
 *         required: true
 *         schema: { type: string }
 *         description: Original filename including extension
 *     responses:
 *       201:
 *         description: Upload successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 asset: { type: string, description: Public URL of uploaded file }
 *       400: { description: Unsupported file type or missing filename }
 */
router.use(requireAdmin)

router.get('/publications', listAdminPublications)
router.post('/publications', createAdminPublication)
router.put('/publications/:id', updateAdminPublication)
router.delete('/publications/:id', deleteAdminPublication)

router.get('/products', listAdminProducts)
router.post('/products', createAdminProduct)
router.put('/products/:id', updateAdminProduct)
router.delete('/products/:id', deleteAdminProduct)

router.get('/case-studies', listAdminCaseStudies)
router.post('/case-studies', createAdminCaseStudy)
router.put('/case-studies/:id', updateAdminCaseStudy)
router.delete('/case-studies/:id', deleteAdminCaseStudy)

router.get('/insights', listAdminInsights)
router.post('/insights', createAdminInsight)
router.put('/insights/:id', updateAdminInsight)
router.delete('/insights/:id', deleteAdminInsight)

router.post(
  '/uploads',
  express.raw({
    type: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream',
      'image/png',
      'image/jpeg',
      'image/webp',
      'application/zip',
      'application/x-zip-compressed',
      'text/markdown',
      'text/plain',
    ],
    limit: '25mb',
  }),
  uploadAdminAsset
)

export default router
