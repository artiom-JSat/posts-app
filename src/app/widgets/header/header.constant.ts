import { type INavigationItem } from './header.interface'

export const navigationData: INavigationItem[] = [
  {
    titleKey: 'home',
    href: '/'
  },
  {
    titleKey: 'posts',
    href: '/posts',
    isPrivate: true
  }
]