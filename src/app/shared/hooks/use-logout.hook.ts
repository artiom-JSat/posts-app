import { useRouter } from '@/pkg/locale'
import { useLogoutAction } from '@/shared/store'

// hook
export const useLogout = () => {
  const router = useRouter()
  const logout = useLogoutAction()

  const handleLogout = () => {
    router.push('/')

    const checkAndLogout = () => {
      const path = window.location.pathname
      const isHomePage = path.length <= 4

      if (isHomePage) {
        logout()
      } else {
        setTimeout(checkAndLogout, 50)
      }
    }

    checkAndLogout()
  }

  // return
  return { handleLogout }
}
