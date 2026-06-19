import { test, expect } from '@playwright/test'

function collectBrowserErrors(page) {
  const errors = []

  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  return errors
}

test.describe('RhemaAI Solutions Ltd website', () => {
  test('loads the enterprise home page without browser errors', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/')

    await expect(page.getByRole('heading', {
      name: 'Enterprise AI Systems for Production',
    })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Start a transformation' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View client outcomes' })).toBeVisible()

    expect(errors).toEqual([])
  })

  test('renders service streaming and contact paths', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/services')
    await expect(page.getByRole('heading', {
      name: /AI, Data and Cloud Services/,
    })).toBeVisible()
    await expect(page.locator('[aria-label="Live enterprise service stream"]')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Start a conversation' }).first()).toBeVisible()

    await page.goto('/contact')
    await expect(page.getByRole('heading', { name: 'Book a Consultation' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Call RhemaAI Solutions Ltd/ }))
      .toHaveAttribute('href', 'tel:+2349043138981')

    expect(errors).toEqual([])
  })

  test('renders shareable detail pages for content items', async ({ page }) => {
    const detailPages = [
      ['/products/enterprise-ai-control-room', /Enterprise AI Control Room/],
      ['/publications/multi-agent-orchestration-patterns-enterprise-scale-systems', /Multi-Agent Orchestration Patterns/],
      ['/courses/agentic-ai-operations-blueprint', /Agentic AI Operations Blueprint/],
      ['/insights/building-21-pattern-agentic-ai-systems', /Building 21-Pattern Agentic AI Systems/],
    ]

    for (const [path, heading] of detailPages) {
      await page.goto(path)
      await expect(page).toHaveURL(new RegExp(`${path}$`))
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible({ timeout: 10000 })
    }
  })
})
