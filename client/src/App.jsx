import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@components/Navbar/Navbar'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import ServicesPage from '@pages/ServicesPage'
import AboutPage from '@pages/AboutPage'
import ContactPage from '@pages/ContactPage'
import InsightsPage from '@pages/InsightsPage'
import ScrollToTop from '@components/common/ScrollToTop'

export default function App() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/insights"  element={<InsightsPage />} />
          <Route path="/contact"   element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
