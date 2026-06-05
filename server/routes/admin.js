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
