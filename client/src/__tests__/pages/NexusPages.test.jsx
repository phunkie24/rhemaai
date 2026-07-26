import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils/render'
import NexusDemoPage from '../../pages/NexusDemoPage'
import NexusDocsPage from '../../pages/NexusDocsPage'
import NexusPricingPage from '../../pages/NexusPricingPage'
import NexusAssessmentPage from '../../pages/NexusAssessmentPage'

const requestDemo = vi.hoisted(() => vi.fn())

vi.mock('../../utils/api', () => ({
  nexusAPI: {
    requestDemo,
    emailAssessment: vi.fn(),
  },
}))

describe('Nexus pricing page', () => {
  it('renders the essential public prices without offline commercial detail', () => {
    render(<NexusPricingPage />, { route: '/products/nexus-aos/pricing' })

    expect(screen.getByRole('heading', { level: 1, name: /Start with One Workflow/ })).toBeInTheDocument()
    expect(screen.getAllByText('$2,500 fixed fee').length).toBeGreaterThan(0)
    expect(screen.getAllByText('From $30,000').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$90,000/year').length).toBeGreaterThan(0)
    expect(screen.queryByText(/contact for pricing/i)).not.toBeInTheDocument()
    expect(screen.getByText('Can pricing be customised?')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Cloud, Model and Infrastructure Costs' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Build Accountable Operating Capability' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'General Commercial Summary' })).not.toBeInTheDocument()
    expect(screen.queryByText('Why do regulated industries cost more?')).not.toBeInTheDocument()
  })
})

describe('Nexus demo form', () => {
  beforeEach(() => requestDemo.mockReset())

  it('preselects a safe package query and renders every indicative budget', () => {
    render(<NexusDemoPage />, { route: '/products/nexus-aos/demo?interest=standard-pilot' })

    expect(screen.getByRole('combobox', { name: /What are you interested in/i })).toHaveValue('standard-pilot')
    expect(screen.getByRole('combobox', { name: /Indicative project budget/i })).toHaveValue('not-defined')
    expect(screen.getByRole('option', { name: 'Above $500,000' })).toBeInTheDocument()
  })

  it('shows an accessible required-field summary and does not call the API', async () => {
    const user = userEvent.setup()
    render(<NexusDemoPage />, { route: '/products/nexus-aos/demo' })

    await user.click(screen.getByRole('button', { name: 'Request a Tailored Demo' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Please correct 5 required fields')
    expect(screen.getByRole('link', { name: 'Consent is required.' })).toHaveAttribute('href', '#demo-consent')
    expect(requestDemo).not.toHaveBeenCalled()
  })

  it('submits pricing interest and budget without using them as eligibility gates', async () => {
    const user = userEvent.setup()
    requestDemo.mockResolvedValueOnce({ success: true })
    render(<NexusDemoPage />, { route: '/products/nexus-aos/demo?interest=workflow-discovery' })

    await user.type(screen.getByLabelText(/Full name/), 'Amina Bello')
    await user.type(screen.getByLabelText(/Work email/), 'amina@example.com')
    await user.type(screen.getByLabelText(/Company/), 'Example Energy')
    await user.type(screen.getByLabelText(/Primary use case/), 'Coordinate governed maintenance investigation workflows.')
    await user.click(screen.getByLabelText(/I consent/))
    await user.click(screen.getByRole('button', { name: 'Request a Tailored Demo' }))

    await waitFor(() => expect(requestDemo).toHaveBeenCalled())
    expect(requestDemo.mock.calls[0][0]).toMatchObject({
      interest: 'workflow-discovery',
      indicativeBudget: 'not-defined',
    })
    expect(await screen.findByText('Request received')).toBeInTheDocument()
  })
})

describe('Nexus documentation', () => {
  it('renders section navigation, TOC, search and next-page navigation', async () => {
    const user = userEvent.setup()
    render(<NexusDocsPage />, { route: '/products/nexus-aos/docs/getting-started' })

    expect(screen.getByRole('heading', { level: 1, name: 'Getting Started' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Documentation sections' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Core Concepts/ })[0]).toHaveAttribute('href', '/products/nexus-aos/docs/concepts')

    await user.type(screen.getByRole('searchbox', { name: 'Search Nexus documentation' }), 'prompt injection')
    expect(await screen.findByRole('option', { name: /Security/ })).toBeInTheDocument()
  })
})

describe('Nexus readiness assessment', () => {
  it('navigates all twelve sections and produces deterministic dimension results', async () => {
    sessionStorage.clear()
    render(<NexusAssessmentPage />, { route: '/products/nexus-aos/readiness-assessment' })

    fireEvent.click(screen.getByRole('button', { name: 'Start the Assessment' }))

    for (let section = 0; section < 12; section += 1) {
      const radios = screen.getAllByRole('radio')
      fireEvent.click(radios[4])
      fireEvent.click(radios[9])
      fireEvent.click(radios[14])
      fireEvent.click(screen.getAllByRole('checkbox')[0])
      fireEvent.click(screen.getByRole('button', {
        name: section === 11 ? 'Calculate Results' : 'Next Section',
      }))
    }

    expect(await screen.findByRole('heading', { level: 1, name: 'Scale Ready' })).toBeInTheDocument()
    expect(screen.getByLabelText('Overall score 81 out of 100')).toBeInTheDocument()
    expect(screen.getAllByText('Business strategy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Organisational capability').length).toBeGreaterThan(0)
  })
})
