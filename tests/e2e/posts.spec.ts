import { expect, test } from '@playwright/test'

// base locale
const BASE_LOCALE = '/en'

// test
test.describe('Posts Functionality (via Register Tab)', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept registration API call and mock a successful response
    await page.route(/\/api\/.*\/register/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { id: 101, email: 'new_user@test.com' },
          token: 'fake',
        }),
      })
    })

    // Navigate to the authentication page and switch to the Registration tab
    await page.goto(`${BASE_LOCALE}/login`)
    await page.getByRole('tab', { name: /Register/i }).click()

    // Fill out the registration form
    await page.getByPlaceholder(/Enter your name/i).fill('Test user')
    await page.getByPlaceholder(/email/i).fill('new_user@test.com')

    // Select password and confirm password fields by their common placeholder pattern
    const passwordFields = page.getByPlaceholder(/[\*]{4,}/)
    await passwordFields.first().fill('password123')
    await passwordFields.last().fill('password123')

    // Submit the form and wait for redirect to the feed page
    await page.getByRole('button', { name: /^Register$/i }).click()
    await expect(page).toHaveURL(`${BASE_LOCALE}/posts`, { timeout: 10000 })
  })

  test('should display posts list after successful registration', async ({ page }) => {
    // Check if at least one post card is rendered in the feed
    const postCards = page.locator('article, [data-testid="post-card"]')
    await expect(postCards.first()).toBeVisible()
  })

  test('should navigate to post details page', async ({ page }) => {
    // Get the first post card and extract its title for later verification
    const firstPost = page.locator('article, [data-testid="post-card"]').first()
    const postTitle = await firstPost.locator('h3, h2, .text-xl').first().innerText()

    // Click on the details link and verify the dynamic URL structure
    await firstPost.getByRole('link', { name: /Details/i }).click()
    await expect(page).toHaveURL(new RegExp(`${BASE_LOCALE}/posts/\\d+`))

    // Ensure the detailed view displays the correct post title
    const detailTitle = page.locator('h1')
    await expect(detailTitle).toBeVisible()
    await expect(detailTitle).toContainText(postTitle)
  })

  test('should logout successfully', async ({ page }) => {
    // Verify that the user is currently authorized (user email is visible)
    await expect(page.getByText('new_user@test.com')).toBeVisible()

    // Perform logout action
    const logoutButton = page.getByRole('button', { name: /Logout/i })
    await logoutButton.click()

    // Verify redirect to the landing/home page and state cleanup
    // We use a regex to handle optional trailing slashes on the home route
    await expect(page).toHaveURL(new RegExp(`${BASE_LOCALE}/?$`))
    await expect(page.getByText('new_user@test.com')).not.toBeVisible()

    // Ensure that navigation menu returns to its unauthenticated state (Login link is back)
    const loginLink = page.getByRole('link', { name: /Login/i })
    await expect(loginLink).toBeVisible()
  })
})
