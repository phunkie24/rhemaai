import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'
import ProductsPage from '../../pages/ProductsPage'

vi.mock('../../utils/api', () => ({ productsAPI: { getAll: vi.fn().mockResolvedValue({ products: [] }) } }))
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))

function Catalogue() {
  const navigate = useNavigate()
  return <><Navbar /><button onClick={() => navigate(-1)}>Go back</button><ProductsPage /></>
}

describe('Products category navigation', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('filters the catalogue from the dropdown and restores the category on Back', async () => {
    const user = userEvent.setup()
    render(<Catalogue />, { route: '/products?category=enterprise-software' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const productsMenu = within(nav.getByRole('link', { name: 'Products', exact: true }).closest('li'))
    expect(productsMenu.getAllByRole('link')).toHaveLength(8)
    expect(productsMenu.queryByRole('link', { name: 'Forge SE' })).not.toBeInTheDocument()
    expect(productsMenu.queryByRole('link', { name: 'All Products' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Forge SE' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Apex RAG' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'All', exact: true })).not.toBeInTheDocument()

    await user.click(productsMenu.getByRole('link', { name: 'Agentic AI Engineering' }))
    expect(screen.getByRole('heading', { name: 'Apex RAG' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Forge SE' })).not.toBeInTheDocument()
    expect(productsMenu.getByRole('link', { name: 'Agentic AI Engineering' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(screen.getByRole('heading', { name: 'Forge SE' })).toBeInTheDocument()
    await user.click(productsMenu.getByRole('link', { name: 'Products', exact: true }))
    expect(screen.getByRole('heading', { name: 'Forge SE' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apex RAG' })).toBeInTheDocument()
  })

  it('selects a category and closes the mobile menu', async () => {
    const user = userEvent.setup()
    render(<Catalogue />, { route: '/products' })
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggle)
    const mobile = within(document.getElementById('mobile-navigation'))
    await user.click(mobile.getByRole('link', { name: 'Enterprise Software Eng.' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { name: 'Forge SE' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Apex RAG' })).not.toBeInTheDocument()
  })

  it('falls back to the full catalogue for an unknown category', () => {
    render(<ProductsPage />, { route: '/products?category=unknown' })
    expect(screen.getByRole('heading', { name: 'Forge SE' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apex RAG' })).toBeInTheDocument()
  })
})
