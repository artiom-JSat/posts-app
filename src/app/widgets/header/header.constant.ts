import { type INavigationItem } from './header.interface'

// constants
export const navigationData: INavigationItem[] = [
  {
    titleKey: 'home',
    href: '/',
  },
  {
    titleKey: 'posts',
    href: '/posts',
    isPrivate: true,
  },
]
