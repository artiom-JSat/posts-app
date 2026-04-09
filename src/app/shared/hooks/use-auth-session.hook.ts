import { useSyncExternalStore } from 'react'

import { useIsAuth, useUser } from '@/shared/store'
import { type IUser } from '@/widgets/header/header.interface'

// interface
interface IProps {
  initialUser: IUser | null
}

// subscribe
const emptySubscribe = () => () => {}

// hook
export const useAuthSession = (props: IProps) => {
  const { initialUser } = props

  const isAuthStore = useIsAuth()
  const storeUser = useUser()

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const isAuth = isClient ? isAuthStore : !!initialUser
  const user = isClient ? storeUser : initialUser

  // return
  return {
    isAuth,
    user,
    isClient,
    displayEmail: user?.email || '',
  }
}
