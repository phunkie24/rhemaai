import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { render } from '../../test-utils/render'
import ServicesPage from '../../pages/ServicesPage'
import ServiceDetailPage from '../../pages/ServiceDetailPage'
import { SERVICES } from '../../utils/servicesData'
import { SERVICE_CATALOGUE } from '../../../../server/config/serviceCatalogue'

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn() }))
})
afterEach(() => vi.unstubAllGlobals())

describe('Service overview and detail pages', () => {
  it('shows highlights with working detail links and keeps pricing on detail pages', async () => {
    const user = userEvent.setup()
    render(<Routes><Route path="/services" element={<ServicesPage />} /><Route path="/services/:slug" element={<ServiceDetailPage />} /></Routes>, { route: '/services' })
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(SERVICES.length)
    expect(screen.queryByText('View pricing options')).not.toBeInTheDocument()
    expect(screen.queryByText(SERVICES[0].description)).not.toBeInTheDocument()
    for (const [index, service] of SERVICES.entries()) {
      const link = within(cards[index]).getByRole('link', { name: `Explore service: ${service.title}` })
      expect(link).toHaveAttribute('href', `/services/${service.id}`)
      expect(within(link.closest('article')).getAllByRole('listitem')).toHaveLength(2)
    }
    await user.click(screen.getByRole('link', { name: 'Explore service: Agentic AI Engineering' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Agentic AI Engineering' })).toBeInTheDocument()
    expect(screen.getByText(SERVICES[0].description)).toBeInTheDocument()
    for (const capability of SERVICES[0].capabilities) expect(screen.getByText(capability)).toBeInTheDocument()
    expect(screen.getByText('View pricing options')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore Nexus AOS' })).toHaveAttribute('href', '/nexus-aos')
  })

  it.each(SERVICES.map((service) => [service.id, service.title]))('opens the %s service directly', (slug, title) => {
    render(<Routes><Route path="/services/:slug" element={<ServiceDetailPage />} /></Routes>, { route: `/services/${slug}` })
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Request a quote' })).toHaveAttribute('href', '/contact')
    expect(screen.getByText('View pricing options')).toBeInTheDocument()
  })

  it('shows a not-found page for an unknown service', () => {
    render(<Routes><Route path="/services/:slug" element={<ServiceDetailPage />} /></Routes>, { route: '/services/unknown' })
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.queryByText('View pricing options')).not.toBeInTheDocument()
  })

  it('keeps search metadata aligned with the complete public catalogue', () => {
    expect(SERVICE_CATALOGUE).toEqual(SERVICES.map(({ id, title, description }) => ({ id, title, description })))
  })
})
