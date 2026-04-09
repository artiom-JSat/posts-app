import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { safePersistStorage } from './persist-storage'

// interface
interface IAuthUser {
  email: string
  name?: string
  password?: string
}

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IRegisterCredentials extends ILoginCredentials {
  name: string
  confirmPassword?: string
}

interface IAuthState {
  user: IAuthUser | null
  token: string | null
  isAuth: boolean
  registeredUsers: IAuthUser[]

  register: (credentials: IRegisterCredentials) => { success: boolean; message?: string }
  login: (credentials: ILoginCredentials) => { success: boolean; message?: string }
  logout: () => void
}

// store
export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      registeredUsers: [],

      register: (credentials) => {
        const currentUsers = get().registeredUsers || []

        const exists = currentUsers.find((u) => u.email === credentials.email)
        if (exists) {
          return { success: false, message: 'userExists' }
        }

        const { email, name, password } = credentials
        const userToSave: IAuthUser = { email, name, password }

        const updatedUsers = [...currentUsers, userToSave]

        Cookies.set('is_logged_in', 'true', { expires: 7, path: '/' })

        set({
          registeredUsers: updatedUsers,
          user: { email, name },
          isAuth: true,
          token: 'fake-jwt',
        })

        return { success: true }
      },

      login: (credentials) => {
        const users = get().registeredUsers || []

        const foundUser = users.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (!foundUser) {
          return { success: false, message: 'invalidCredentials' }
        }

        Cookies.set('is_logged_in', 'true', { expires: 7, path: '/' })

        set({
          user: { email: foundUser.email, name: foundUser.name },
          isAuth: true,
          token: 'fake-jwt',
        })

        return { success: true }
      },

      logout: () => {
        Cookies.remove('is_logged_in', { path: '/' })
        set({ user: null, token: null, isAuth: false })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => safePersistStorage),
    },
  ),
)

// selectors
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuth = () => useAuthStore((state) => state.isAuth)
