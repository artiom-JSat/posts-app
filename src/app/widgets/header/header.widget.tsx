import { type FC } from 'react'

import { authServer } from '@/pkg/auth/server'
import { LogoComponent } from '@/shared/components/logo'
import { WrapperComponent } from '@/shared/components/wrapper'

import { NavigationMenuComponent } from './elements'
import { navigationData } from './header.constant'

// interface
interface IProps {}

// component
const HeaderWidget: FC<Readonly<IProps>> = async () => {
  const { user } = await authServer.getSession()

  // return
  return (
    <header className='bg-background sticky top-0 z-50 border-b'>
      <WrapperComponent
        type='section'
        className='container mx-auto flex items-center justify-between gap-16 px-4 py-7 sm:px-6 lg:px-8'
      >
        <LogoComponent />

        <NavigationMenuComponent navigationData={navigationData} initialUser={user} />
      </WrapperComponent>
    </header>
  )
}

export default HeaderWidget
