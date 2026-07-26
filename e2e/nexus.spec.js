import { expect, test } from '@playwright/test'

test.describe('Nexus AOS public ecosystem', () => {
  test('navigates overview, domain, architecture, pricing, docs and demo', async ({ page }) => {
    await page.goto('/products/nexus-aos')
    await expect(page.getByRole('heading', { level: 1, name: /Build, Govern and Operate Enterprise AI Agents/ })).toBeVisible()

    await page.goto('/products/nexus-aos/solutions/energy')
    await expect(page.getByRole('heading', { level: 1, name: /Energy/ })).toBeVisible()
    await expect(page.getByText('3,839 design artefacts')).toBeVisible()

    await page.goto('/products/nexus-aos/architecture')
    await expect(page.getByRole('heading', { level: 1, name: /Governed Multi-Agent Orchestration/ })).toBeVisible()

    await page.goto('/products/nexus-aos/pricing')
    await expect(page.getByRole('heading', { level: 1, name: /Start with One Workflow/ })).toBeVisible()
    await expect(page.getByText('$2,500 fixed fee').first()).toBeVisible()

    await page.goto('/products/nexus-aos/docs/security')
    await expect(page.getByRole('heading', { level: 1, name: 'Security' })).toBeVisible()

    await page.goto('/products/nexus-aos/demo?interest=standard-pilot')
    await expect(page.getByRole('combobox', { name: /What are you interested in/ })).toHaveValue('standard-pilot')
  })

  test('passes responsive accessibility and browser-error smoke checks', async ({ page }) => {
    const browserErrors = []
    page.on('pageerror', (error) => browserErrors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(message.text())
    })

    const routes = [
      '/products/nexus-aos',
      '/products/nexus-aos/readiness-assessment',
      '/products/nexus-aos/pricing',
      '/products/nexus-aos/docs/security',
      '/products/nexus-aos/demo',
    ]

    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('h1')).toHaveCount(1)

      const audit = await page.evaluate(() => {
        const visibleControls = [...document.querySelectorAll('input, select, textarea')]
          .filter((control) => !control.closest('[aria-hidden="true"]') && control.type !== 'hidden')
        const unlabeledControls = visibleControls
          .filter((control) => (
            !control.labels?.length
            && !control.getAttribute('aria-label')
            && !control.getAttribute('aria-labelledby')
          ))
          .map((control) => control.id || control.name || control.tagName)
        const imagesWithoutAlt = [...document.querySelectorAll('img:not([alt])')]
          .map((image) => image.currentSrc || image.src)

        return {
          documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          unlabeledControls,
          imagesWithoutAlt,
        }
      })

      expect(audit.documentOverflow).toBeLessThanOrEqual(2)
      expect(audit.unlabeledControls).toEqual([])
      expect(audit.imagesWithoutAlt).toEqual([])
    }

    expect(browserErrors).toEqual([])
  })
})
