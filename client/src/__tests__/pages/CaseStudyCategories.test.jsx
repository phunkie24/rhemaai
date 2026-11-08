import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'
import CaseStudiesPage from '../../pages/CaseStudiesPage'

vi.mock('../../utils/api', () => ({ caseStudiesAPI: { getAll: vi.fn().mockResolvedValue({ caseStudies: [] }) } }))
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))

function CaseStudies() {
  const navigate = useNavigate()
  return <><Navbar /><button onClick={() => navigate(-1)}>Go back</button><CaseStudiesPage /></>
}

describe('Case Studies dropdown', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))))
  afterEach(() => vi.unstubAllGlobals())

  it('filters by industry, supports Back, and returns to all case studies', async () => {
    const user = userEvent.setup()
    render(<CaseStudies />, { route: '/case-studies?category=energy' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const menu = within(nav.getByRole('link', { name: 'Case Studies', exact: true }).closest('li'))
    expect(menu.getAllByRole('link')).toHaveLength(9)
    expect(screen.queryByRole('button', { name: 'Energy' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Energy case studies' })).toBeInTheDocument()
    expect(screen.getByText('Tier-1 Oil & Gas Operator')).toBeInTheDocument()
    expect(screen.queryByText('West African Digital Bank')).not.toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'FinTech' }))
    expect(screen.getByRole('heading', { name: 'FinTech case studies' })).toBeInTheDocument()
    expect(screen.getByText('West African Digital Bank')).toBeInTheDocument()
    expect(screen.queryByText('Tier-1 Oil & Gas Operator')).not.toBeInTheDocument()
    expect(menu.getByRole('link', { name: 'FinTech' })).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(screen.getByRole('heading', { name: 'Energy case studies' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'All', exact: true }))
    expect(screen.getByRole('heading', { name: 'All case studies' })).toBeInTheDocument()
    expect(screen.getByText('West African Digital Bank')).toBeInTheDocument()
    expect(screen.getByText('Tier-1 Oil & Gas Operator')).toBeInTheDocument()
  })

  it('closes the mobile menu after selection without activating a Products category', async () => {
    const user = userEvent.setup()
    render(<CaseStudies />, { route: '/case-studies' })
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggle)
    const mobile = within(document.getElementById('mobile-navigation'))
    await user.click(mobile.getByRole('link', { name: 'Data Engineering', exact: true }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { name: 'Data Engineering case studies' })).toBeInTheDocument()
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    expect(nav.getByRole('link', { name: 'Data Engineering', exact: true })).toHaveAttribute('aria-current', 'page')
    expect(nav.getByRole('link', { name: 'Data Engineering & Platforms' })).not.toHaveAttribute('aria-current')
  })

  it('shows the full catalogue for an unknown category', () => {
    render(<CaseStudiesPage />, { route: '/case-studies?category=unknown' })
    expect(screen.getByRole('heading', { name: 'All case studies' })).toBeInTheDocument()
    expect(screen.getByText('West African Digital Bank')).toBeInTheDocument()
    expect(screen.getByText('Tier-1 Oil & Gas Operator')).toBeInTheDocument()
  })
})
