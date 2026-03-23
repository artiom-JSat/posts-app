'use client'

import { LanguagesIcon, LogOut } from 'lucide-react'
import { Link } from 'pkg/locale'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui'
import { NavigationItem } from '../navbar.constant'
import { useIsAuth, useUser } from '@/shared/store'
import { LanguageDropdown } from './language-dropdown.component'
import { NavMobileMenu } from './nav-mobile-menu.component'
import { useLogout } from '@/shared/hooks'

export const NavMenu = ({
  navigationData,
}: {
  navigationData: NavigationItem[]
}) => {
  const t = useTranslations('Navigation')

  const isAuth = useIsAuth()
  const user = useUser()

  const visibleNavigation = navigationData.filter((item) => {
    if (item.isPrivate && !isAuth) return false
    return true
  })

  const { handleLogout } = useLogout()

  return (
    <nav className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
      <div className="flex flex-1 items-center gap-8">
        {visibleNavigation.map((item, index) => (
          <div key={index} className="hover:text-primary max-md:hidden">
            <Link href={item.href}>{t(item.titleKey)}</Link>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <LanguageDropdown
          trigger={
            <Button variant="ghost" size="icon">
              <LanguagesIcon className="h-5 w-5" />
            </Button>
          }
        />

        <NavMobileMenu
          items={visibleNavigation}
          isAuth={isAuth}
          onLogout={handleLogout}
        />

        {isAuth ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground border-r pr-4 hidden lg:block">
              {user?.email}
            </span>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </Button>
          </div>
        ) : (
          <Button asChild size="lg" className="hidden md:inline-flex">
            <Link href="/login">{t('login')}</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
