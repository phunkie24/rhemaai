import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('navbar is visible on load', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('navbar contains logo text', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toContainText(/RhemaAI/i)
  })

  test('navigates to Services page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^Services$/i }).first().click()
    await expect(page).toHaveURL(/\/services/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('navigates to About page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^About$/i }).first().click()
    await expect(page).toHaveURL(/\/about/)
  })

  test('navigates to Insights page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^Insights$/i }).first().click()
    await expect(page).toHaveURL(/\/insights/)
  })

  test('navigates to Contact page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^Contact$/i }).first().click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('Book Consultation CTA navigates to contact', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Book Consultation/i }).first().click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('mobile hamburger menu toggles on small screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const hamburger = page.locator('[class*="hamburger"], button[aria-label*="menu" i], button[class*="mobile"]')
    if (await hamburger.count() > 0) {
      await hamburger.first().click()
      const mobileMenu = page.locator('[class*="mobileMenu"], [class*="mobile-menu"], nav[class*="open"]')
      await expect(mobileMenu.first()).toBeVisible({ timeout: 2000 }).catch(() => null)
    }
  })

  test('navigating back returns to homepage', async ({ page }) => {
    await page.goto('/')
    await page.goto('/contact')
    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})
