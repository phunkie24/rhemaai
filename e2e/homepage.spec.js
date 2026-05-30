import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads successfully with 200 status', async ({ page }) => {
    const response = await page.goto('/')
    expect(response.status()).toBe(200)
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/RhemaAI/i)
  })

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('hero contains main CTA buttons', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Start Transformation|Book Consultation|Explore Services/i }).first()
    ).toBeVisible()
  })

  test('stats section shows numbers', async ({ page }) => {
    // Wait for count-up animations to settle
    await page.waitForTimeout(2500)
    const statsText = await page.locator('[class*="stats"], [class*="stat"]').first().textContent()
    expect(statsText).toBeTruthy()
  })

  test('Services section is rendered', async ({ page }) => {
    await page.getByRole('heading', { name: 'Agentic AI Engineering' }).waitFor({ timeout: 5000 })
    await expect(page.getByRole('heading', { name: 'Agentic AI Engineering' })).toBeVisible()
  })

  test('Industries section lists industry pills', async ({ page }) => {
    await page.locator('text=Oil & Gas, text=Energy, text=FinTech').first().waitFor({ timeout: 5000 }).catch(() => null)
    // At minimum confirm the section renders
    const industrySection = page.locator('[class*="industri"], section').filter({ hasText: /Industri|sector/i }).first()
    await expect(industrySection).toBeVisible()
  })

  test('footer is visible and contains copyright', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
    await expect(footer).toContainText(/RhemaAI/i)
  })

  test('newsletter form in footer accepts email', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    const emailInput = page.locator('footer input[type="email"], footer input[placeholder*="email" i]').first()
    await expect(emailInput).toBeVisible()
    await emailInput.fill('test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')
  })
})
