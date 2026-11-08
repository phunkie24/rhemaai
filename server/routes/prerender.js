import { Router } from 'express'
import {
  renderHome,
  renderServices,
  renderServiceDetail,
  renderProducts,
  renderProductDetail,
  renderCaseStudies,
  renderAbout,
  renderInsights,
  renderInsightDetail,
  renderPublications,
  renderPublicationDetail,
  renderCourses,
  renderCourseDetail,
  renderContact,
  renderCareers,
  renderNexusStatic,
  renderNexusDomain,
  renderNexusDocs,
} from '../controllers/prerenderController.js'

const router = Router()

router.get(['/products/nexus-aos', '/products/nexus-aos/*', '/products/enterprise-ai-control-room'], (req, res) => {
  res.redirect(301, req.originalUrl.replace(/^\/products\/(?:nexus-aos|enterprise-ai-control-room)/, '/nexus-aos'))
})

router.get('/', renderHome)
router.get('/services', renderServices)
router.get('/services/:slug', renderServiceDetail)
router.get('/products', renderProducts)
router.get([
  '/nexus-aos',
  '/nexus-aos/demo',
  '/nexus-aos/readiness-assessment',
  '/nexus-aos/solutions',
  '/nexus-aos/solutions/agentic-data-engineering',
  '/nexus-aos/solutions/procurement',
  '/nexus-aos/architecture',
  '/nexus-aos/pricing',
], renderNexusStatic)
router.get('/nexus-aos/docs', renderNexusDocs)
router.get('/nexus-aos/docs/:section', renderNexusDocs)
router.get('/nexus-aos/solutions/:domain', renderNexusDomain)
router.get('/products/:slug', renderProductDetail)
router.get('/case-studies', renderCaseStudies)
router.get('/about', renderAbout)
router.get('/insights', renderInsights)
router.get('/insights/:slug', renderInsightDetail)
router.get('/publications', renderPublications)
router.get('/publications/:slug', renderPublicationDetail)
router.get('/courses', renderCourses)
router.get('/courses/:slug', renderCourseDetail)
router.get('/contact', renderContact)
router.get('/careers', renderCareers)

export default router
