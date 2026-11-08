import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { render } from '../../test-utils/render'
import App from '../../App'
import ProductsPage from '../../pages/ProductsPage'

vi.mock('../../utils/api', () => ({
  newsletterAPI: { subscribe: vi.fn() },
  nexusAPI: { requestDemo: vi.fn(), emailAssessment: vi.fn() },
  productsAPI: {
    getAll: vi.fn().mockResolvedValue({ products: [
      { _id: 'legacy-nexus', slug: 'nexus-aos', name: 'Nexus AOS' },
      { _id: 'current-product', slug: 'current-product', name: 'Current API product' },
    ] }),
  },
}))

function LocationProbe() {
  const { pathname, search, hash } = useLocation()
  return <output data-testid="location">{pathname}{search}{hash}</output>
}

describe('standalone Nexus section', () => {
  it.each([
    ['/products/nexus-aos', '/nexus-aos', /Build, Govern and Operate Enterprise AI Agents/],
    ['/products/enterprise-ai-control-room', '/nexus-aos', /Build, Govern and Operate Enterprise AI Agents/],
    ['/products/nexus-aos/docs/security', '/nexus-aos/docs/security', 'Security'],
    ['/products/nexus-aos/demo?interest=standard-pilot#request', '/nexus-aos/demo?interest=standard-pilot#request', /See How Nexus AOS/],
  ])('redirects %s to the standalone section', async (oldRoute, newRoute, heading) => {
    render(<><App /><LocationProbe /></>, { route: oldRoute })
    expect(await screen.findByRole('heading', { level: 1, name: heading }, { timeout: 5000 })).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent(newRoute)
    const breadcrumbs = within(screen.getByRole('navigation', { name: 'Breadcrumb' }))
    expect(breadcrumbs.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(breadcrumbs.queryByRole('link', { name: 'Products' })).not.toBeInTheDocument()
    if (newRoute.includes('/demo')) {
      expect(screen.getByRole('combobox', { name: /What are you interested in/ })).toHaveValue('standard-pilot')
    }
  }, 10000)

  it('excludes Nexus from Products even when returned by the API', async () => {
    render(<ProductsPage />, { route: '/products' })
    expect(await screen.findByRole('heading', { name: 'Current API product' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Nexus AOS' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Apex RAG' })).toBeInTheDocument()
  })
})
