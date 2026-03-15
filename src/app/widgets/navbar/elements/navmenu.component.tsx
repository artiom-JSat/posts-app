'use client'

import { LanguagesIcon, MenuIcon } from 'lucide-react'
import { Link } from '../../../../i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui'
import { NavigationItem } from '../navbar.constant'
import { LanguageDropdown } from './language-dropdown.component'

export const NavMenu = ({
  navigationData,
}: {
  navigationData: NavigationItem[]
}) => {
  const t = useTranslations('Navigation')

  return (
    <nav className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
      <div className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
        {navigationData.map((item, index) => (
          <div key={index} className="hover:text-primary max-md:hidden">
            <Link href={item.href}>{t(item.titleKey)}</Link>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <LanguageDropdown
          trigger={
            <Button variant="ghost" size="icon">
              <LanguagesIcon />
            </Button>
          }
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden" asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
              <span className="sr-only">{t('menu')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              {navigationData.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.href}>{t(item.titleKey)}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full font-bold text-primary">
                  {t('login')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild size="lg" className="hidden md:inline-flex">
          <Link href="/login">{t('login')}</Link>
        </Button>
      </div>
    </nav>
  )
}
