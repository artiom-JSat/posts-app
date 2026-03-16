'use client'

import { MenuIcon, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '../../../../i18n/navigation'
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

interface NavMobileMenuProps {
  items: NavigationItem[]
  isAuth: boolean
  onLogout: () => void
}

export const NavMobileMenu = ({ items, isAuth, onLogout }: NavMobileMenuProps) => {
  const t = useTranslations('Navigation')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden" asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href} className="w-full">
                {t(item.titleKey)}
              </Link>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {isAuth ? (
            <DropdownMenuItem 
              onClick={onLogout} 
              className="text-destructive cursor-pointer"
            >
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
  )
}