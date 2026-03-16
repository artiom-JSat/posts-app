import { test, expect } from '@playwright/test'

const BASE_LOCALE = '/en'

test.describe('Posts Functionality (via Register Tab)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.route(/\/api\/.*\/register/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: { id: 101, email: 'new_user@test.com' }, token: 'fake' }),
      });
    });

    await page.goto(`${BASE_LOCALE}/login`)

    // Переходим на вкладку регистрации
    await page.getByRole('tab', { name: /Register/i }).click()

    // 1. ЗАПОЛНЯЕМ ИМЯ
    await page.getByPlaceholder(/Enter your name/i).fill('Artiom Test')

    // 2. ЗАПОЛНЯЕМ EMAIL
    await page.getByPlaceholder(/email/i).fill('new_user@test.com')
    
    // 3. ЗАПОЛНЯЕМ ПАРОЛЬ И ПОДТВЕРЖДЕНИЕ
    // Используем .first() для Password и .last() для Confirm Password
    const passwordFields = page.getByPlaceholder(/[\*]{4,}/)
    await passwordFields.first().fill('password123')
    await passwordFields.last().fill('password123') // Теперь заполняем оба поля!

    // 4. НАЖАТИЕ КНОПКИ
    await page.getByRole('button', { name: /^Register$/i }).click()

    // 5. Ждем редиректа
    await expect(page).toHaveURL(`${BASE_LOCALE}/posts`, { timeout: 10000 })
  })

  test('should display posts list after successful registration', async ({ page }) => {
    const postCards = page.locator('article, [data-testid="post-card"]')
    await expect(postCards.first()).toBeVisible()
  })

  // Сценарий 2: Навигация к деталям
  test('should navigate to post details page', async ({ page }) => {
    // 1. Находим первую карточку
    const firstPost = page.locator('article, [data-testid="post-card"]').first()
    
    // Получаем текст заголовка из карточки, чтобы сравнить его потом на странице деталей
    const postTitle = await firstPost.locator('h3, h2, .text-xl').first().innerText()

    // 2. Кликаем на ссылку "Details" внутри карточки
    await firstPost.getByRole('link', { name: /Details/i }).click()

    // 3. Проверяем URL (что он соответствует паттерну /posts/[id])
    await expect(page).toHaveURL(new RegExp(`${BASE_LOCALE}/posts/\\d+`))

    // 4. Проверяем заголовок на странице деталей
    const detailTitle = page.locator('h1')
    await expect(detailTitle).toBeVisible()
    
    // Проверяем, что заголовок на новой странице содержит текст из карточки
    await expect(detailTitle).toContainText(postTitle)
  })

  // Сценарий 3: Выход из системы
  test('should logout successfully', async ({ page }) => {
    // 1. Проверяем, что мы авторизованы (видим email пользователя в хедере)
    await expect(page.getByText('new_user@test.com')).toBeVisible();

    // 2. Нажимаем кнопку Logout
    const logoutButton = page.getByRole('button', { name: /Logout/i });
    await logoutButton.click();

    // 3. Ждем редиректа на страницу логина (или ту, куда редиректит ваше приложение)
    await expect(page).toHaveURL(`${BASE_LOCALE}/login`);

    // 4. Проверяем, что email пользователя больше не отображается
    await expect(page.getByText('new_user@test.com')).not.toBeVisible();

    // 5. Проверяем, что форма логина снова доступна
    await expect(page.getByRole('tab', { name: /Login/i })).toBeVisible();
  });
})