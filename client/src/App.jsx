import { Routes, Route } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import ServicesPage from '@pages/ServicesPage'
import ProductsPage from '@pages/ProductsPage'
import AboutPage from '@pages/AboutPage'
import ContactPage from '@pages/ContactPage'
import InsightsPage from '@pages/InsightsPage'
import InsightDetailPage from '@pages/InsightDetailPage'
import PublicationsPage from '@pages/PublicationsPage'
import CaseStudiesPage from '@pages/CaseStudiesPage'
import CareersPage from '@pages/CareersPage'
import CoursesPage from '@pages/CoursesPage'
import AdminOperationsPage from '@pages/AdminOperationsPage'
import LegalPage from '@pages/LegalPage'
import NotFoundPage from '@pages/NotFoundPage'
import ScrollToTop from '@components/common/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/products"     element={<ProductsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/insights"     element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetailPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/contact"      element={<ContactPage />} />
          <Route path="/careers"      element={<CareersPage />} />
          <Route path="/courses"      element={<CoursesPage />} />
          <Route path="/labs"         element={<InsightsPage />} />
          <Route path="/rh-ops-9m2k"  element={<AdminOperationsPage />} />
          <Route path="/privacy"      element={<LegalPage type="privacy" />} />
          <Route path="/terms"        element={<LegalPage type="terms" />} />
          <Route path="/cookies"      element={<LegalPage type="cookies" />} />
          <Route path="*"             element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
