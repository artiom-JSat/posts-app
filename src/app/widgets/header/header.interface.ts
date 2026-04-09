// interface
export interface INavigationItem {
  titleKey: string
  href: string
  isPrivate?: boolean
}

export interface IMobileNavigationMenu {
  items: INavigationItem[]
  isAuth: boolean
  onLogout: () => void
}

export interface IUser {
  email: string
  name?: string
}
