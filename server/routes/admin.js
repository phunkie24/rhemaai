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
import {
  createAdminCourse,
  deleteAdminCourse,
  listAdminCourses,
  updateAdminCourse,
} from '../controllers/coursesController.js'

const router = Router()

/**
 * @openapi
 * /admin/products:
 *   get:
 *     tags: [Admin]
 *     summary: List all products (admin, includes drafts)
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [saas, platform, tool, accelerator, api, template] }
 *       - in: query
 *         name: published
 *         schema: { type: string, enum: ['true', 'false'] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 30 }
 *     responses:
 *       200: { description: All products }
 *       401: { description: Unauthorized }
 *   post:
 *     tags: [Admin]
 *     summary: Create a product
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, summary]
 *             properties:
 *               name:        { type: string }
 *               slug:        { type: string }
 *               kicker:      { type: string }
 *               category:    { type: string, enum: [saas, platform, tool, accelerator, api, template] }
 *               summary:     { type: string }
 *               description: { type: string }
 *               tags:        { type: array, items: { type: string } }
 *               logoUrl:     { type: string }
 *               assetUrl:    { type: string }
 *               demoUrl:     { type: string }
 *               productUrl:  { type: string }
 *               version:     { type: string }
 *               pricing:
 *                 type: object
 *                 properties:
 *                   amount:   { type: number }
 *                   currency: { type: string }
 *                   label:    { type: string }
 *               featured:    { type: boolean }
 *               published:   { type: boolean }
 *     responses:
 *       201: { description: Product created }
 *       400: { description: Validation error }
 *       409: { description: Slug already exists }
 * /admin/products/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a product
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
 *     summary: Delete a product
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /admin/publications:
 *   get:
 *     tags: [Admin]
 *     summary: List all publications (admin, includes drafts)
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [book, whitepaper] }
 *       - in: query
 *         name: published
 *         schema: { type: string, enum: ['true', 'false'] }
 *     responses:
 *       200: { description: All publications }
 *       401: { description: Unauthorized }
 *   post:
 *     tags: [Admin]
 *     summary: Create a publication
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, type, summary]
 *             properties:
 *               title:        { type: string }
 *               slug:         { type: string }
 *               type:         { type: string, enum: [book, whitepaper] }
 *               summary:      { type: string }
 *               body:         { type: string }
 *               coverImage:   { type: string }
 *               documentUrl:  { type: string }
 *               documentLabel: { type: string }
 *               tags:         { type: array, items: { type: string } }
 *               price:
 *                 type: object
 *                 properties:
 *                   amount:    { type: number }
 *                   currency:  { type: string }
 *                   label:     { type: string }
 *                   kindleUrl: { type: string }
 *               featured:   { type: boolean }
 *               published:  { type: boolean }
 *     responses:
 *       201: { description: Publication created }
 *       400: { description: Validation error }
 *       409: { description: Slug already exists }
 * /admin/publications/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a publication
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
 *     summary: Delete a publication
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /admin/case-studies:
 *   get:
 *     tags: [Admin]
 *     summary: List all case studies (admin, includes drafts)
 *     security: [{ AdminApiKey: [] }]
 *     responses:
 *       200: { description: All case studies }
 *       401: { description: Unauthorized }
 *   post:
 *     tags: [Admin]
 *     summary: Create a case study
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, industry, client, summary]
 *             properties:
 *               title:    { type: string }
 *               slug:     { type: string }
 *               industry: { type: string }
 *               client:   { type: string }
 *               kpi1:
 *                 type: object
 *                 properties:
 *                   value: { type: string }
 *                   label: { type: string }
 *               kpi2:
 *                 type: object
 *                 properties:
 *                   value: { type: string }
 *                   label: { type: string }
 *               summary:    { type: string }
 *               body:       { type: string }
 *               tags:       { type: array, items: { type: string } }
 *               accent:     { type: string }
 *               coverImage: { type: string }
 *               featured:   { type: boolean }
 *               published:  { type: boolean }
 *     responses:
 *       201: { description: Case study created }
 *       400: { description: Validation error }
 * /admin/case-studies/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a case study
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
 *     summary: Delete a case study
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /admin/insights:
 *   get:
 *     tags: [Admin]
 *     summary: List all insights (admin, includes drafts)
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: published
 *         schema: { type: string, enum: ['true', 'false'] }
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
 * /admin/courses:
 *   get:
 *     tags: [Admin]
 *     summary: List all courses (admin, includes drafts)
 *     security: [{ AdminApiKey: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *     responses:
 *       200: { description: All courses }
 *       401: { description: Unauthorized }
 *   post:
 *     tags: [Admin]
 *     summary: Create a course
 *     security: [{ AdminApiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug, category, youtubeUrl]
 *             properties:
 *               title:       { type: string }
 *               slug:        { type: string }
 *               description: { type: string }
 *               category:
 *                 type: string
 *                 enum: [data-engineering, machine-learning, generative-ai, agentic-ai, software-engineering, cloud-architecture, advanced-analytics]
 *               youtubeUrl:  { type: string }
 *               instructor:  { type: string }
 *               duration:    { type: string }
 *               level:       { type: string, enum: [beginner, intermediate, advanced] }
 *               tags:        { type: array, items: { type: string } }
 *               pricing:
 *                 type: object
 *                 properties:
 *                   isFree:     { type: boolean }
 *                   amount:     { type: number }
 *                   currency:   { type: string }
 *                   label:      { type: string }
 *                   paymentUrl: { type: string }
 *               featured:    { type: boolean }
 *               published:   { type: boolean }
 *     responses:
 *       201: { description: Course created }
 *       400: { description: Validation error }
 *       409: { description: Slug already exists }
 * /admin/courses/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a course
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
 *     summary: Delete a course
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

router.get('/courses', listAdminCourses)
router.post('/courses', createAdminCourse)
router.put('/courses/:id', updateAdminCourse)
router.delete('/courses/:id', deleteAdminCourse)

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
