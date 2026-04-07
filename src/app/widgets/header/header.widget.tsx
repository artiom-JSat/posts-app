import { cookies } from 'next/headers'
import { type FC } from 'react'

import { LogoComponent } from '@/shared/components/logo'
import { WrapperComponent } from '@/shared/components/wrapper'

import { NavigationMenuComponent } from './elements'
import { navigationData } from './header.constant'

// interface
interface IProps {}

// component
const HeaderWidget: FC<Readonly<IProps>> = async () => {
  const cookieStore = await cookies()
  // Сервер видит куку и понимает: рисовать "Login" или "Logout"
  const isAuthServer = cookieStore.get('is_logged_in')?.value === 'true'

  const authStorage = cookieStore.get('auth-storage')?.value
  let initialEmail = ''

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage)
      initialEmail = parsed.state?.user?.email || ''
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to parse auth-storage:', e)
    }
  }

  // return
  return (
    <header className='bg-background sticky top-0 z-50 border-b'>
      <WrapperComponent
        type='section'
        className='container mx-auto flex items-center justify-between gap-16 px-4 py-7 sm:px-6 lg:px-8'
      >
        <LogoComponent />

        <NavigationMenuComponent
          navigationData={navigationData}
          initialIsAuth={isAuthServer}
          initialEmail={initialEmail}
        />
      </WrapperComponent>
    </header>
  )
}

export default HeaderWidget
