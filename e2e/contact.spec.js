import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('renders the contact page heading', async ({ page }) => {
    await expect(page.getByText('Book a Consultation')).toBeVisible()
  })

  test('renders the left panel info cards', async ({ page }) => {
    await expect(page.getByText('24-Hour Response')).toBeVisible()
    await expect(page.getByText('Free Discovery Call')).toBeVisible()
    await expect(page.getByText('NDA Available')).toBeVisible()
  })

  test('form has all required fields', async ({ page }) => {
    await expect(page.getByPlaceholder(/Funke Yusuf/i)).toBeVisible()
    await expect(page.getByPlaceholder(/you@company/i)).toBeVisible()
    await expect(page.getByPlaceholder(/Tell us about your project/i)).toBeVisible()
    await expect(page.locator('select').first()).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /Send Consultation Request/i }).click()
    await expect(page.getByText('Name is required')).toBeVisible({ timeout: 3000 })
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Please describe your project')).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.getByPlaceholder(/Funke Yusuf/i).fill('Test User')
    await page.getByPlaceholder(/you@company/i).fill('not-an-email')
    await page.getByPlaceholder(/Tell us about your project/i).fill('This is a detailed enough message.')
    await page.getByRole('button', { name: /Send Consultation Request/i }).click()
    await expect(page.getByText('Invalid email')).toBeVisible({ timeout: 3000 })
  })

  test('service dropdown contains expected options', async ({ page }) => {
    const select = page.locator('select').first()
    const options = await select.evaluate((select) =>
      Array.from(select.options, (option) => option.textContent?.trim() || '')
    )
    expect(options).toContain('Agentic AI Engineering')
    expect(options).toContain('Data Engineering & Platforms')
    expect(options).toContain('General Enquiry')
  })

  test('budget dropdown contains expected options', async ({ page }) => {
    const selects = page.locator('select')
    const budgetSelect = selects.nth(1)
    const options = await budgetSelect.evaluate((select) =>
      Array.from(select.options, (option) => option.textContent?.trim() || '')
    )
    expect(options.some((o) => o.includes('$100,000'))).toBeTruthy()
    expect(options.some((o) => o.includes('Prefer not'))).toBeTruthy()
  })

  test('submit button text changes during submission', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await new Promise((r) => setTimeout(r, 300))
      await route.fulfill({
        status: 201,
        body: JSON.stringify({ success: true, message: 'Thank you!', id: '123' }),
        headers: { 'Content-Type': 'application/json' },
      })
    })

    await page.getByPlaceholder(/Funke Yusuf/i).fill('Amaka Okafor')
    await page.getByPlaceholder(/you@company/i).fill('amaka@energycorp.ng')
    await page.getByPlaceholder(/Tell us about your project/i).fill(
      'We want predictive maintenance models for our pipeline assets — looking forward to a call.'
    )

    const submitBtn = page.getByRole('button', { name: /Send Consultation Request/i })
    await submitBtn.click()

    await expect(page.getByRole('button', { name: /Sending/i })).toBeVisible({ timeout: 1000 })
  })

  test('shows success state after valid submission', async ({ page }) => {
    await page.route('/api/contact', (route) => route.fulfill({
      status: 201,
      body: JSON.stringify({ success: true, message: 'Thank you! We will be in touch within 24 hours.', id: '507f1f77bcf86cd799439011' }),
      headers: { 'Content-Type': 'application/json' },
    }))

    await page.getByPlaceholder(/Funke Yusuf/i).fill('Amaka Okafor')
    await page.getByPlaceholder(/you@company/i).fill('amaka@energycorp.ng')
    await page.getByPlaceholder(/Tell us about your project/i).fill(
      'We want predictive maintenance models for our pipeline assets.'
    )

    await page.getByRole('button', { name: /Send Consultation Request/i }).click()
    await expect(page.getByText('Request Received!')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/24 hours/i)).toBeVisible()
  })

  test('can send another request after success', async ({ page }) => {
    await page.route('/api/contact', (route) => route.fulfill({
      status: 201,
      body: JSON.stringify({ success: true, id: '123' }),
      headers: { 'Content-Type': 'application/json' },
    }))

    await page.getByPlaceholder(/Funke Yusuf/i).fill('Test User')
    await page.getByPlaceholder(/you@company/i).fill('test@example.com')
    await page.getByPlaceholder(/Tell us about your project/i).fill('Detailed project message here.')

    await page.getByRole('button', { name: /Send Consultation Request/i }).click()
    await expect(page.getByText('Request Received!')).toBeVisible({ timeout: 5000 })

    await page.getByRole('button', { name: /Send another request/i }).click()
    await expect(page.getByText('Book a Consultation')).toBeVisible()
  })
})
