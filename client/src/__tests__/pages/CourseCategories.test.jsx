import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { render } from '../../test-utils/render'
import Navbar from '../../components/Navbar/Navbar'
import CoursesPage from '../../pages/CoursesPage'
import { coursesAPI } from '../../utils/api'

vi.mock('../../utils/api', () => ({ coursesAPI: { getAll: vi.fn() } }))
vi.mock('../../components/Navbar/Navbar.module.css', () => ({ default: {} }))
const courses = [
  { _id: 'data-1', title: 'Lakehouse Foundations', category: 'data-engineering' },
  { _id: 'data-2', title: 'Streaming Data', category: 'data-engineering' },
  { _id: 'cloud', title: 'Cloud Foundations', category: 'cloud-architecture' },
]
function Academy() {
  const navigate = useNavigate()
  return <><Navbar /><button onClick={() => navigate(-1)}>Go back</button><CoursesPage /></>
}
describe('Courses dropdown', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
    coursesAPI.getAll.mockImplementation(async ({ category, page }) => {
      const filtered = category ? courses.filter(course => course.category === category) : courses
      return { courses: category === 'data-engineering' ? [filtered[page - 1]] : filtered, total: filtered.length, page, pages: category === 'data-engineering' ? 2 : 1 }
    })
  })
  afterEach(() => vi.unstubAllGlobals())

  it('supports category URLs, resets pagination, and handles Back and All Courses', async () => {
    const user = userEvent.setup()
    render(<Academy />, { route: '/courses?category=data-engineering' })
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    const menu = within(nav.getByRole('link', { name: 'Courses', exact: true }).closest('li'))
    expect(menu.getAllByRole('link')).toHaveLength(9)
    expect(screen.queryByRole('button', { name: 'All Courses' })).not.toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Lakehouse Foundations' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '2', exact: true }))
    expect(await screen.findByRole('heading', { name: 'Streaming Data' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Cloud & Architecture' }))
    expect(await screen.findByRole('heading', { name: 'Cloud Foundations' })).toBeInTheDocument()
    expect(coursesAPI.getAll).toHaveBeenLastCalledWith({ category: 'cloud-architecture', page: 1, limit: 12 })
    expect(menu.getByRole('link', { name: 'Cloud & Architecture' })).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(await screen.findByRole('heading', { name: 'Lakehouse Foundations' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'All Courses' }))
    expect(await screen.findByRole('heading', { name: 'Cloud Foundations' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Lakehouse Foundations' })).toBeInTheDocument()
  })

  it('selects a topic on mobile and closes the menu', async () => {
    const user = userEvent.setup()
    render(<Academy />, { route: '/courses' })
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggle)
    const mobile = within(document.getElementById('mobile-navigation'))
    const menu = within(mobile.getByRole('link', { name: 'Courses', exact: true }).parentElement)
    await user.click(menu.getByRole('link', { name: 'Machine Learning' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { name: 'Machine Learning courses' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'No courses yet in this category' })).toBeInTheDocument()
  })
})
