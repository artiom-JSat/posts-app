'use client'

import { type ReactNode, useEffect, useState } from 'react'

import { usePathname, useRouter } from '@/pkg/locale'
import { useIsAuth } from '@/shared/store'

// constants
const PUBLIC_ROUTES = ['/', '/login']

// interface
interface IProps {
  children: ReactNode
}

// component
export const AuthProvider = (props: IProps) => {
  const { children } = props

  const pathname = usePathname()
  const router = useRouter()

  const isAuth = useIsAuth()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0)
    return () => clearTimeout(timer)
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

  // return
  return <>{children}</>
}
