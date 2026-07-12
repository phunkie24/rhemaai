import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils/render'
import ContactPage from '../../pages/ContactPage'

const mockSubmit = vi.hoisted(() => vi.fn())

vi.mock('@utils/api', () => ({
  contactAPI: { submit: mockSubmit },
  newsletterAPI: { subscribe: vi.fn() },
  insightsAPI: { getAll: vi.fn(), getById: vi.fn() },
}))

describe('ContactPage', () => {
  beforeEach(() => {
    mockSubmit.mockReset()
  })

  it('renders the consultation form heading', () => {
    render(<ContactPage />)
    expect(screen.getByText('Book a Consultation')).toBeInTheDocument()
  })

  it('renders the left-panel heading', () => {
    render(<ContactPage />)
    expect(screen.getByText('Start Your')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<ContactPage />)
    expect(screen.getByPlaceholderText(/Funke R\. Yusuf/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/you@company\.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Acme Enterprises/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument()
  })

  it('renders service and budget dropdowns', () => {
    render(<ContactPage />)
    expect(screen.getByText('General Enquiry')).toBeInTheDocument()
    expect(screen.getByText('Prefer not to say')).toBeInTheDocument()
  })

  it('shows four info cards', () => {
    render(<ContactPage />)
    expect(screen.getByText('24-Hour Response')).toBeInTheDocument()
    expect(screen.getByText('Free Discovery Call')).toBeInTheDocument()
    expect(screen.getByText('Global Clients')).toBeInTheDocument()
    expect(screen.getByText('NDA Available')).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByRole('button', { name: /Send Consultation Request/i }))
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Please describe your project')).toBeInTheDocument()
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    mockSubmit.mockResolvedValueOnce({ success: true })
    render(<ContactPage />)

    await user.type(screen.getByPlaceholderText(/Funke R\. Yusuf/i), 'Amaka Okafor')
    await user.type(screen.getByPlaceholderText(/you@company\.com/i), 'amaka@corp.ng')
    await user.type(
      screen.getByPlaceholderText(/Tell us about your project/i),
      'We need AI-powered analytics for our energy data platform.'
    )

    await user.click(screen.getByRole('button', { name: /Send Consultation Request/i }))

    await waitFor(() => {
      expect(screen.getByText('Request Received!')).toBeInTheDocument()
    })
    expect(screen.getByText(/24 hours/i)).toBeInTheDocument()
  })

  it('shows error message when API call fails', async () => {
    const user = userEvent.setup()
    mockSubmit.mockRejectedValueOnce(new Error('Server error'))
    render(<ContactPage />)

    await user.type(screen.getByPlaceholderText(/Funke R\. Yusuf/i), 'Amaka')
    await user.type(screen.getByPlaceholderText(/you@company\.com/i), 'amaka@corp.ng')
    await user.type(
      screen.getByPlaceholderText(/Tell us about your project/i),
      'We need AI-powered analytics for our energy data.'
    )

    await user.click(screen.getByRole('button', { name: /Send Consultation Request/i }))

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })

  it('allows sending another request after success', async () => {
    const user = userEvent.setup()
    mockSubmit.mockResolvedValueOnce({ success: true })
    render(<ContactPage />)

    await user.type(screen.getByPlaceholderText(/Funke R\. Yusuf/i), 'Test User')
    await user.type(screen.getByPlaceholderText(/you@company\.com/i), 'test@test.com')
    await user.type(
      screen.getByPlaceholderText(/Tell us about your project/i),
      'Test project description with enough detail.'
    )
    await user.click(screen.getByRole('button', { name: /Send Consultation Request/i }))

    await waitFor(() => {
      expect(screen.getByText('Request Received!')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Send another request/i }))
    await waitFor(() => {
      expect(screen.getByText('Book a Consultation')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    let resolveSubmit
    mockSubmit.mockImplementationOnce(
      () => new Promise((resolve) => { resolveSubmit = resolve })
    )
    render(<ContactPage />)

    await user.type(screen.getByPlaceholderText(/Funke R\. Yusuf/i), 'Test')
    await user.type(screen.getByPlaceholderText(/you@company\.com/i), 'test@test.com')
    await user.type(
      screen.getByPlaceholderText(/Tell us about your project/i),
      'Long enough message here.'
    )

    await user.click(screen.getByRole('button', { name: /Send Consultation Request/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sending/i })).toBeDisabled()
    })

    resolveSubmit({ success: true })
  })
})
