import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils/render'
import HomePage from '../../pages/HomePage'

vi.mock('@utils/api', () => ({
  contactAPI: { submit: vi.fn() },
  newsletterAPI: { subscribe: vi.fn() },
  insightsAPI: {
    getAll: vi.fn(() => Promise.resolve({ insights: [], total: 0 })),
    getById: vi.fn(),
  },
}))

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />)
    expect(document.body).toBeTruthy()
  })

  it('renders the hero h1 headline', () => {
    render(<HomePage />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toMatch(/Intelligent Systems|Enterprise|Transform/i)
  })

  it('renders Services section with Agentic AI card', () => {
    render(<HomePage />)
    expect(screen.getByText('Agentic AI Engineering')).toBeInTheDocument()
  })

  it('renders at least one navigation link', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders Data Engineering service card', () => {
    render(<HomePage />)
    expect(screen.getByText('Data Engineering & Platforms')).toBeInTheDocument()
  })
})
