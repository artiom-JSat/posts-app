import { envClient } from '@/config/env'
import { ILoginCredentials, IRegisterCredentials, useAuthStore } from '@/shared/store'

// interface
interface AuthResponse {
  data: { success: boolean } | null
  error: string | null
}

// auth client
export const authClient = {
  baseURL: envClient.NEXT_PUBLIC_CLIENT_API_URL,

  session: () => {
    const state = useAuthStore.getState()
    return state.isAuth ? { user: state.user } : null
  },

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

  signOut: async (): Promise<void> => {
    useAuthStore.getState().logout()
    window.location.href = '/'
  },
}
