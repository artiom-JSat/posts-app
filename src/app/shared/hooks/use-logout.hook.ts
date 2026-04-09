import { authClient } from '@/pkg/auth/client'
import { useRouter } from '@/pkg/locale'

// hook
export const useLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      router.push('/')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error)
      window.location.href = '/'
    }
  }

  // return
  return { handleLogout }
}
