import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IAuthUser {
  email: string
}

interface IAuthState {
  user: IAuthUser | null
  isAuth: boolean
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      login: (email) => set({ user: { email }, isAuth: true }),
      logout: () => set({ user: null, isAuth: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
