import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'

// Responsive visibility is covered in the browser; jsdom does not apply viewport media queries.
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))

describe('mobile navigation', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('shows Nexus AOS as an active top-level section on desktop and mobile', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { route: '/nexus-aos/pricing' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const nexus = nav.getByRole('link', { name: 'Nexus AOS', exact: true })
    const products = nav.getByRole('link', { name: 'Products', exact: true })
    expect(nexus).toHaveAttribute('href', '/nexus-aos')
    expect(nexus).toHaveAttribute('aria-current', 'page')
    expect(products).not.toHaveAttribute('aria-current')
    expect(products.closest('li')).not.toContainElement(nexus)
    await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
    const mobile = within(document.getElementById('mobile-navigation'))
    expect(mobile.getByRole('link', { name: 'Nexus AOS' })).toHaveAttribute('href', '/nexus-aos')
    expect(mobile.getByRole('link', { name: 'Nexus AOS' })).toHaveAttribute('aria-current', 'page')
  })

  it('closes with Escape and restores focus to the menu button', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const button = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('mobile-navigation')).toHaveAttribute('aria-hidden', 'false')
    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('marks the active section and closes after selecting a page', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { route: '/products/forge-se' })
    expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Products', exact: true })).toHaveAttribute('aria-current', 'page')
    const button = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(button)
    await user.click(within(document.getElementById('mobile-navigation')).getByRole('link', { name: 'Services', exact: true }))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
