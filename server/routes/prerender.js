import { Router } from 'express'
import {
  renderHome,
  renderServices,
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

router.get('/', renderHome)
router.get('/services', renderServices)
router.get('/products', renderProducts)
router.get([
  '/products/nexus-aos',
  '/products/nexus-aos/demo',
  '/products/nexus-aos/readiness-assessment',
  '/products/nexus-aos/solutions',
  '/products/nexus-aos/solutions/agentic-data-engineering',
  '/products/nexus-aos/solutions/procurement',
  '/products/nexus-aos/architecture',
  '/products/nexus-aos/pricing',
], renderNexusStatic)
router.get('/products/nexus-aos/docs', renderNexusDocs)
router.get('/products/nexus-aos/docs/:section', renderNexusDocs)
router.get('/products/nexus-aos/solutions/:domain', renderNexusDomain)
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
