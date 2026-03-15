export type NavigationItem = {
  titleKey: string
  href: string
}

export const navigationData: NavigationItem[] = [
  {
    titleKey: 'home',
    href: '/'
  },
  {
    titleKey: 'posts',
    href: '/posts'
  }
]