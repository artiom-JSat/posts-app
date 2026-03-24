import { type NavigationItem } from './header.interface'

export const navigationData: NavigationItem[] = [
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