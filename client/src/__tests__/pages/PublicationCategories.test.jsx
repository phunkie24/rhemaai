import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'
import PublicationsPage, { SEED_PUBLICATIONS } from '../../pages/PublicationsPage'
import { publicationsAPI } from '../../utils/api'

vi.mock('../../utils/api', () => ({ publicationsAPI: { getAll: vi.fn() } }))
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))
function Press() {
  const navigate = useNavigate()
  return <><Navbar /><button onClick={() => navigate(-1)}>Go back</button><PublicationsPage /></>
}
describe('Publications dropdown', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
    publicationsAPI.getAll.mockImplementation(async ({ type }) => ({ publications: type === 'all' ? SEED_PUBLICATIONS : SEED_PUBLICATIONS.filter(item => item.type === type) }))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('filters from direct links and supports Back and All', async () => {
    const user = userEvent.setup()
    render(<Press />, { route: '/publications?category=book' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const menu = within(nav.getByRole('link', { name: 'Publications', exact: true }).closest('li'))
    expect(menu.getAllByRole('link')).toHaveLength(4)
    expect(screen.queryByRole('button', { name: 'Books' })).not.toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Enterprise Agentic AI Playbook' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Cloud Landing Zones for AI Workloads' })).not.toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'White Papers' }))
    expect(await screen.findByRole('heading', { name: 'Cloud Landing Zones for AI Workloads' })).toBeInTheDocument()
    expect(menu.getByRole('link', { name: 'White Papers' })).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('heading', { name: 'Enterprise Agentic AI Playbook' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(await screen.findByRole('heading', { name: 'Enterprise Agentic AI Playbook' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'All', exact: true }))
    expect(await screen.findByRole('heading', { name: 'Cloud Landing Zones for AI Workloads' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Enterprise Agentic AI Playbook' })).toBeInTheDocument()
  })

  it('closes the mobile menu after choosing Books', async () => {
    const user = userEvent.setup()
    render(<Press />, { route: '/publications' })
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggle)
    const mobile = within(document.getElementById('mobile-navigation'))
    const menu = within(mobile.getByRole('link', { name: 'Publications', exact: true }).parentElement)
    await user.click(menu.getByRole('link', { name: 'Books' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(await screen.findByRole('heading', { name: 'Enterprise Agentic AI Playbook' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Cloud Landing Zones for AI Workloads' })).not.toBeInTheDocument()
  })
})
