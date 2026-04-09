import { cookies } from 'next/headers'

import 'server-only'

// auth server
export const authServer = {
  // get session
  getSession: async () => {
    try {
      const cookieStore = await cookies()
      const authStorage = cookieStore.get('auth-storage')?.value

      if (!authStorage) return { user: null, session: null }

      const decoded = decodeURIComponent(authStorage)
      const parsed = JSON.parse(decoded)
      const userData = parsed.state?.user

      if (!userData) return { user: null, session: null }

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

  // get cache session
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies()

      const isAuth = cookieStore.get('is_logged_in')?.value === 'true'
      const authStorage = cookieStore.get('auth-storage')?.value

      if (!isAuth || !authStorage) {
        return { user: null, session: null }
      }

      const decoded = decodeURIComponent(authStorage)
      const parsed = JSON.parse(decoded)

      const user = parsed.state?.user
      const token = parsed.state?.token

      return {
        user,
        session: { token },
      }
    } catch {
      return { user: null, session: null }
    }
  },
}
