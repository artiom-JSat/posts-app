import { envClient } from '@/config/env'
import { ILoginCredentials, IRegisterCredentials, useAuthStore } from '@/shared/store'

// interface
interface AuthResponse {
  data: { success: boolean } | null
  error: string | null
}

// client
export const authClient = {
  // Мы сохраняем baseURL, так как в будущем запросы пойдут сюда
  baseURL: envClient.NEXT_PUBLIC_CLIENT_API_URL,

  /**
   * session — возвращает текущее состояние пользователя.
   * Удобно использовать в защищенных роутах и шапке.
   */
  session: () => {
    const state = useAuthStore.getState()
    return state.isAuth ? { user: state.user } : null
  },

  /**
   * signIn — метод для логина.
   * Возвращает стандартный объект { data, error } для удобной обработки в формах.
   */
  signIn: {
    email: async (credentials: ILoginCredentials): Promise<AuthResponse> => {
      const result = useAuthStore.getState().login(credentials)

      if (!result.success) {
        return {
          data: null,
          error: result.message || 'invalidCredentials',
        }
      }

      return { data: { success: true }, error: null }
    },
  },

  /**
   * signUp — метод для регистрации.
   */
  signUp: {
    email: async (credentials: IRegisterCredentials): Promise<AuthResponse> => {
      const result = useAuthStore.getState().register(credentials)

      if (!result.success) {
        return {
          data: null,
          error: result.message || 'userExists',
        }
      }

      return { data: { success: true }, error: null }
    },
  },

  /**
   * signOut — очистка сессии и редирект.
   */
  signOut: async (): Promise<void> => {
    useAuthStore.getState().logout()
    window.location.href = '/'
  },
}
