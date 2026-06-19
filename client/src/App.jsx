import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '@components/Navbar/Navbar'
import Footer from '@components/Footer/Footer'
import ScrollToTop from '@components/common/ScrollToTop'

const HomePage           = lazy(() => import('@pages/HomePage'))
const ServicesPage       = lazy(() => import('@pages/ServicesPage'))
const ProductsPage       = lazy(() => import('@pages/ProductsPage'))
const ProductDetailPage  = lazy(() => import('@pages/ProductDetailPage'))
const AboutPage          = lazy(() => import('@pages/AboutPage'))
const ContactPage        = lazy(() => import('@pages/ContactPage'))
const InsightsPage       = lazy(() => import('@pages/InsightsPage'))
const InsightDetailPage  = lazy(() => import('@pages/InsightDetailPage'))
const PublicationsPage   = lazy(() => import('@pages/PublicationsPage'))
const PublicationDetailPage = lazy(() => import('@pages/PublicationDetailPage'))
const CaseStudiesPage    = lazy(() => import('@pages/CaseStudiesPage'))
const CareersPage        = lazy(() => import('@pages/CareersPage'))
const CoursesPage        = lazy(() => import('@pages/CoursesPage'))
const CourseDetailPage   = lazy(() => import('@pages/CourseDetailPage'))
const AdminOperationsPage = lazy(() => import('@pages/AdminOperationsPage'))
const LegalPage          = lazy(() => import('@pages/LegalPage'))
const NotFoundPage       = lazy(() => import('@pages/NotFoundPage'))

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07111f' }}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#67e8f9', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/services"       element={<ServicesPage />} />
            <Route path="/products"       element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/case-studies"   element={<CaseStudiesPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/insights"       element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/publications"   element={<PublicationsPage />} />
            <Route path="/publications/:slug" element={<PublicationDetailPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/careers"        element={<CareersPage />} />
            <Route path="/courses"        element={<CoursesPage />} />
            <Route path="/courses/:slug"  element={<CourseDetailPage />} />
            <Route path="/labs"           element={<InsightsPage />} />
            <Route path="/rh-ops-9m2k"    element={<AdminOperationsPage />} />
            <Route path="/privacy"        element={<LegalPage type="privacy" />} />
            <Route path="/terms"          element={<LegalPage type="terms" />} />
            <Route path="/cookies"        element={<LegalPage type="cookies" />} />
            <Route path="*"               element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  )
}
