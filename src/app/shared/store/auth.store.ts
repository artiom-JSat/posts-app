import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { safePersistStorage } from './persist-storage'

interface IAuthUser {
  email: string
  password?: string
  name?: string
}

interface IAuthState {
  user: IAuthUser | null
  token: string | null
  isAuth: boolean
  registeredUsers: IAuthUser[]

  register: (user: IAuthUser) => { success: boolean; message?: string }
  login: (
    email: string,
    password: string,
  ) => { success: boolean; message?: string }
  logout: () => void
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      registeredUsers: [],

      register: (newUser) => {
        const currentUsers = get().registeredUsers || []

        const exists = currentUsers.find((u) => u.email === newUser.email)
        if (exists) {
          return { success: false, message: 'userExists' }
        }

        const updatedUsers = [...currentUsers, newUser]

        set({
          registeredUsers: updatedUsers,
          user: { email: newUser.email, name: newUser.name },
          isAuth: true,
          token: 'fake-jwt',
        })

        return { success: true }
      },

      login: (email, password) => {
        const users = get().registeredUsers || []

        const foundUser = users.find(
          (u) => u.email === email && u.password === password,
        )

        if (!foundUser) {
          return { success: false, message: 'invalidCredentials' }
        }

        set({
          user: { email: foundUser.email, name: foundUser.name },
          isAuth: true,
          token: 'fake-jwt',
        })

        return { success: true }
      },

      logout: () => set({ user: null, token: null, isAuth: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => safePersistStorage),
    },
  ),
)

export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuth = () => useAuthStore((state) => state.isAuth)
export const useLoginAction = () => useAuthStore((state) => state.login)
export const useRegisterAction = () => useAuthStore((state) => state.register)
export const useLogoutAction = () => useAuthStore((state) => state.logout)