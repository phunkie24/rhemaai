import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils/render'
import SectionHeader from '../../components/common/SectionHeader'

describe('SectionHeader', () => {
  it('renders the title', () => {
    render(<SectionHeader title="Our Services" />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<SectionHeader label="WHAT WE DO" title="Services" />)
    expect(screen.getByText('WHAT WE DO')).toBeInTheDocument()
  })

  it('does not render label when omitted', () => {
    render(<SectionHeader title="Services" />)
    expect(screen.queryByRole('generic', { name: /label/i })).not.toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Services" subtitle="Explore what we offer" />)
    expect(screen.getByText('Explore what we offer')).toBeInTheDocument()
  })

  it('does not render subtitle when omitted', () => {
    render(<SectionHeader title="Services" />)
    expect(screen.queryByText(/explore/i)).not.toBeInTheDocument()
  })

  it('renders an h2 for the title', () => {
    render(<SectionHeader title="Heading Text" />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Heading Text')
  })

  it('renders with all props together', () => {
    render(
      <SectionHeader
        label="LABEL"
        title="Main Title"
        subtitle="Supporting text"
        centered
        light
      />
    )
    expect(screen.getByText('LABEL')).toBeInTheDocument()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText('Supporting text')).toBeInTheDocument()
  })
})
