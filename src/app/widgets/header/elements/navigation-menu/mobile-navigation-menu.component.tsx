'use client'

import { LogOut, MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

import { type IMobileNavigationMenu } from '../../header.interface'

// interface
interface IProps extends IMobileNavigationMenu {}

// component
const MobileNavigationMenuComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { items, isAuth, onLogout } = props

  const t = useTranslations('Navigation')

  // return
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='md:hidden' asChild>
        <Button variant='outline' size='icon'>
          <MenuIcon className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href} className='w-full'>
                {t(item.titleKey)}
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {isAuth ? (
            <DropdownMenuItem onClick={onLogout} className='text-destructive cursor-pointer'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>{t('logout')}</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link href='/login' className='text-primary w-full font-bold'>
                {t('login')}
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileNavigationMenuComponent
