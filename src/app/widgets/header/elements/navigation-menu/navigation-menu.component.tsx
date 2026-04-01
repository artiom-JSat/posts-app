'use client'

import { LanguagesIcon, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Separator } from '@/pkg/theme/ui/separator'
import { LanguageDropdownComponent } from '@/shared/components/language-dropdown'
import { useLogout } from '@/shared/hooks'
import { useIsAuth, useUser } from '@/shared/store'

import MobileNavigationMenuComponent from './mobile-navigation-menu.component'

import { type INavigationItem } from '../../header.interface'

// interface
interface IProps {
  navigationData: INavigationItem[]
}

// component
const NavigationMenuComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { navigationData } = props

  const t = useTranslations('Navigation')

  const isAuth = useIsAuth()
  const user = useUser()

  const visibleNavigation = navigationData.filter((item) => {
    if (item.isPrivate && !isAuth) return false
    return true
  })

  const { handleLogout } = useLogout()

  // return
  return (
    <nav className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
      <div className='flex flex-1 items-center gap-8'>
        {visibleNavigation.map((item, index) => (
          <div key={index} className='hover:text-primary max-md:hidden'>
            <Link href={item.href}>{t(item.titleKey)}</Link>
          </div>
        ))}
      </div>

      <div className='flex items-center gap-4 lg:gap-6'>
        <LanguageDropdownComponent
          trigger={
            <Button variant='ghost' size='icon'>
              <LanguagesIcon className='h-5 w-5' />
            </Button>
          }
        />

        <MobileNavigationMenuComponent items={visibleNavigation} isAuth={isAuth} onLogout={handleLogout} />

        {isAuth ? (
          <div className='hidden items-center gap-4 md:flex'>
            <span className='text-muted-foreground hidden pr-[10px] text-sm lg:block'>{user?.email}</span>
            <Separator orientation='vertical' className='h-6 data-vertical:self-center' />
            <Button variant='ghost' onClick={handleLogout} className='gap-2'>
              <LogOut className='h-4 w-4' />
              {t('logout')}
            </Button>
          </div>
        ) : (
          <Button asChild size='lg' className='hidden md:inline-flex'>
            <Link href='/login'>{t('login')}</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

export default NavigationMenuComponent
