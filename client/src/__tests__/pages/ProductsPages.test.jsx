import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { render } from '../../test-utils/render'
import ProductsPage, { SEED_PRODUCTS } from '../../pages/ProductsPage'
import ProductDetailPage from '../../pages/ProductDetailPage'
import { productsAPI } from '../../utils/api'

vi.mock('../../utils/api', () => ({ productsAPI: { getAll: vi.fn(), getById: vi.fn() } }))
// Code highlighting is unrelated to product content; its CJS entry requires an ESM-only dependency in Node 18.
vi.mock('react-syntax-highlighter', () => {
  const PrismLight = ({ children }) => <pre>{children}</pre>
  PrismLight.registerLanguage = vi.fn()
  return { PrismLight }
})

function ProductRoutes() {
  return <Routes><Route path="/products" element={<ProductsPage />} /><Route path="/products/:slug" element={<ProductDetailPage />} /></Routes>
}

describe('Product highlights and detail pages', () => {
  beforeEach(() => {
    productsAPI.getAll.mockResolvedValue({ products: [] })
    productsAPI.getById.mockRejectedValue(new Error('Offline'))
  })

  it('shows highlights in the catalogue and reveals full capabilities and pricing through the details link', async () => {
    const user = userEvent.setup()
    const product = SEED_PRODUCTS.find((item) => item.slug === 'aura-xai')
    render(<ProductRoutes />, { route: '/products' })
    const card = within(screen.getByRole('heading', { name: product.name }).closest('article'))
    expect(card.getAllByRole('listitem')).toHaveLength(2)
    expect(card.queryByText(product.summary)).not.toBeInTheDocument()
    expect(card.queryByText(product.features[2])).not.toBeInTheDocument()
    expect(screen.queryByText('View pricing options')).not.toBeInTheDocument()
    expect(card.getAllByRole('link')).toHaveLength(2)

    await user.click(card.getByRole('link', { name: `View details: ${product.name}` }))
    expect(screen.getByRole('heading', { level: 1, name: product.name })).toBeInTheDocument()
    for (const feature of product.features) expect(screen.getByText(feature)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Pricing & deployment options' })).toBeInTheDocument()
    expect(screen.getByText('View pricing options').closest('details')).toHaveAttribute('open')
    for (const tag of product.tags) expect(screen.getByText(tag)).toBeInTheDocument()
  })

  it('retains seed capabilities when a stored product has only basic metadata', async () => {
    const product = SEED_PRODUCTS.find((item) => item.slug === 'apex-rag')
    productsAPI.getAll.mockResolvedValue({ products: [{ slug: product.slug, name: product.name }] })
    productsAPI.getById.mockResolvedValue({ product: { slug: product.slug, name: product.name, description: 'Updated overview.' } })
    render(<ProductRoutes />, { route: `/products/${product.slug}` })
    expect(await screen.findByText('Updated overview.')).toBeInTheDocument()
    for (const feature of product.features) expect(screen.getByText(feature)).toBeInTheDocument()
  })

  it('waits for API-only products and displays all capabilities and available actions', async () => {
    let resolveProduct
    productsAPI.getById.mockReturnValue(new Promise((resolve) => { resolveProduct = resolve }))
    render(<ProductRoutes />, { route: '/products/custom-platform' })
    expect(screen.getByRole('status')).toHaveTextContent('Loading product details')
    expect(screen.queryByText('This product is not available.')).not.toBeInTheDocument()
    await act(async () => resolveProduct({ product: {
      slug: 'custom-platform', name: 'Custom Platform', description: 'Complete platform documentation.',
      features: ['One capability', 'Two capability', 'Three capability'], tags: ['Custom'],
      demoUrl: 'https://example.com/demo', productUrl: 'https://example.com/product', assetUrl: 'https://example.com/package',
      pricing: { amount: 100, currency: 'USD', paystackUrl: 'https://example.com/buy' },
    } }))
    expect(screen.getByText('Three capability')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open demo' })).toHaveAttribute('href', 'https://example.com/demo')
    expect(screen.getByRole('link', { name: 'View product', exact: true })).toHaveAttribute('href', 'https://example.com/product')
    expect(screen.getByRole('link', { name: 'Download package' })).toHaveAttribute('href', 'https://example.com/package')
    expect(screen.getByRole('link', { name: 'Buy with Paystack' })).toHaveAttribute('href', 'https://example.com/buy')
  })

  it('offers a route back when a product cannot be found', async () => {
    render(<ProductRoutes />, { route: '/products/missing-product' })
    expect(await screen.findByText('This product is not available.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to Products' })).toHaveAttribute('href', '/products')
  })
})
