import { type FC } from 'react'

import { NavigationMenuComponent } from './elements'
import { navigationData } from './header.constant'
import { LogoComponent } from '@/shared/components/logo'
import { WrapperComponent } from '@/shared/components/wrapper'

interface IProps {}

const HeaderComponent: FC<Readonly<IProps>> = () => {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <WrapperComponent
        type="section"
        className="container mx-auto flex items-center justify-between gap-16 px-4 sm:px-6 lg:px-8 py-7 "
      >
        <LogoComponent />
        <NavigationMenuComponent navigationData={navigationData} />
      </WrapperComponent>
    </header>
  )
}

export default HeaderComponent
