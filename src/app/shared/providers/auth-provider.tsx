'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from '../../../i18n/navigation'
import { useAuthStore } from '@/shared/store/auth.store'

const PUBLIC_ROUTES = ['/', '/login']

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()

  const isAuth = useAuthStore((state) => state.isAuth)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const isPublic = PUBLIC_ROUTES.includes(pathname)

    if (!isPublic && !isAuth) {
      router.replace('/login')
    }
  }, [isAuth, isHydrated, pathname, router])

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (!isHydrated) return null

  if (!isPublic && !isAuth) {
    return null
  }

  return <>{children}</>
}
