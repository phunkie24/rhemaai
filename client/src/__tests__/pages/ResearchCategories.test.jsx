import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'
import InsightsPage from '../../pages/InsightsPage'

vi.mock('../../utils/api', () => ({ insightsAPI: { getAll: vi.fn().mockResolvedValue({ insights: [] }) } }))
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))

function Research() {
  const navigate = useNavigate()
  return <><Navbar /><button onClick={() => navigate(-1)}>Go back</button><InsightsPage /></>
}

describe('Research topic navigation', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))))
  afterEach(() => vi.unstubAllGlobals())

  it('supports direct topic links, selection, Back, and All Topics', async () => {
    const user = userEvent.setup()
    render(<Research />, { route: '/insights?category=data-engineering' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const menu = within(nav.getByRole('link', { name: 'Research', exact: true }).closest('li'))
    expect(menu.getAllByRole('link')).toHaveLength(9)
    expect(screen.queryByRole('button', { name: 'All Topics' })).not.toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: /Medallion Architecture:/ })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /MLOps at Scale:/ })).not.toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'MLOps & DataOps' }))
    expect(await screen.findByRole('heading', { name: /MLOps at Scale:/ })).toBeInTheDocument()
    expect(menu.getByRole('link', { name: 'MLOps & DataOps' })).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(await screen.findByRole('heading', { name: /Medallion Architecture:/ })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'All Topics' }))
    expect(await screen.findByRole('heading', { name: /MLOps at Scale:/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Medallion Architecture:/ })).toBeInTheDocument()
  })

  it('closes the mobile menu after selecting a research topic', async () => {
    const user = userEvent.setup()
    render(<Research />, { route: '/insights' })
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggle)
    const mobile = within(document.getElementById('mobile-navigation'))
    const research = within(mobile.getByRole('link', { name: 'Research', exact: true }).parentElement)
    await user.click(research.getByRole('link', { name: 'FinTech' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { name: 'FinTech research' })).toBeInTheDocument()
    expect(await screen.findByText('No research notes in this category yet. Check back soon.')).toBeInTheDocument()
  })
})
