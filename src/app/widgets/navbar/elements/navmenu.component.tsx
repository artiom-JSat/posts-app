'use client'

import { LanguagesIcon, MenuIcon, LogOut } from 'lucide-react'
import { Link, useRouter } from '../../../../i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/ui'
import { NavigationItem } from '../navbar.constant'
import { useAuthStore } from '@/shared/store/auth.store' // Импортируем стор
import { LanguageDropdown } from './language-dropdown.component'

export const NavMenu = ({
  navigationData,
}: {
  navigationData: NavigationItem[]
}) => {
  const t = useTranslations('Navigation')
  const router = useRouter()
  
  const { isAuth, logout, user } = useAuthStore()

  const visibleNavigation = navigationData.filter((item) => {
    if (item.isPrivate && !isAuth) return false
    return true
  })

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
      {/* Десктопные ссылки */}
      <div className="flex flex-1 items-center gap-8 md:justify-center lg:gap-16">
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

        {/* Мобильное меню */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden" asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              {visibleNavigation.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href} className="w-full">
                    {t(item.titleKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              {isAuth ? (
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full font-bold text-primary">
                    {t('login')}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Кнопка на десктопе */}
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