export type NavigationItem = {
  titleKey: string
  href: string
  isPrivate?: boolean
}

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