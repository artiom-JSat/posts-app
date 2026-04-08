import { cookies } from 'next/headers'

import 'server-only'

/**
 * AUTH SERVER (Server-side actions)
 * Используется в Server Components и Middleware
 */
export const authServer = {
  /**
   * getSession: Имитация запроса к API
   * В будущем этот метод будет реально стучаться на бэкенд.
   */
  getSession: async () => {
    try {
      // Пока у нас нет реального API /get-session, мы имитируем этот запрос,
      // доставая данные из кук, как будто это сделал сервер.
      const cookieStore = await cookies()
      const authStorage = cookieStore.get('auth-storage')?.value

      if (!authStorage) return { user: null, session: null }

      const decoded = decodeURIComponent(authStorage)
      const parsed = JSON.parse(decoded)
      const userData = parsed.state?.user

      if (!userData) return { user: null, session: null }

      // Возвращаем структуру, к которой стремимся (как в Better Auth)
      return {
        user: {
          id: 'local-id',
          email: userData.email,
          name: userData.name,
        },
        session: {
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        },
      }
    } catch {
      return { user: null, session: null }
    }
  },

  /**
   * getCacheSession: Быстрая проверка сессии через куки.
   * Здесь мы читаем данные напрямую, без запросов к API.
   */
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies()

      // Пытаемся достать либо твою куку из Zustand, либо флаг входа
      const isAuth = cookieStore.get('is_logged_in')?.value === 'true'
      const authStorage = cookieStore.get('auth-storage')?.value

      if (!isAuth || !authStorage) {
        return { user: null, session: null }
      }

      // Парсим Zustand-хранилище из куки
      const decoded = decodeURIComponent(authStorage)
      const parsed = JSON.parse(decoded)

      const user = parsed.state?.user
      const token = parsed.state?.token

      // ВНИМАНИЕ: Здесь должна быть проверка JWT через jose (jwtVerify).
      // Но так как 'fake-jwt' — это не настоящий токен, jose выдаст ошибку.
      // Когда заменишь fake-jwt на реальный, раскомментируй код с jose ниже.

      /*
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token || '', secret)
      return payload 
      */

      // Пока просто возвращаем данные, имитируя успешную проверку
      return {
        user,
        session: { token },
      }
    } catch {
      return { user: null, session: null }
    }
  },
}
