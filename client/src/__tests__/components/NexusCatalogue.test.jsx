import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils/render'
import DomainCatalogue from '../../components/Nexus/DomainCatalogue'
import { NexusSubNavigation } from '../../components/Nexus/NexusComponents'

describe('Nexus catalogue and navigation', () => {
  it('filters domains by searchable application content', async () => {
    const user = userEvent.setup()
    render(<DomainCatalogue />)

    expect(screen.getByText('Showing 20 of 20 domains')).toBeInTheDocument()
    await user.type(screen.getByRole('searchbox'), 'adaptive tutoring')

    expect(screen.getByText('Showing 1 of 20 domains')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Energy' })).not.toBeInTheDocument()
  })

  it('exposes all Nexus sub-navigation paths in a keyboard-accessible nav', () => {
    render(<NexusSubNavigation />, { route: '/products/nexus-aos' })

    const nav = screen.getByRole('navigation', { name: 'Nexus AOS' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/products/nexus-aos')
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/products/nexus-aos/pricing')
    expect(screen.getByRole('link', { name: 'Request Demo' })).toHaveAttribute('href', '/products/nexus-aos/demo')
  })
})
