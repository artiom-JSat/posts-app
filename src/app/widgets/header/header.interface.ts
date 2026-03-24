export type NavigationItem = {
  titleKey: string
  href: string
  isPrivate?: boolean
}

export interface IMobileNavigationMenu {
  items: NavigationItem[]
  isAuth: boolean
  onLogout: () => void
}