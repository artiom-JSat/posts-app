import Cookies from 'js-cookie'

// interface
interface IProps {
  getItem: (name: string) => string | null
  setItem: (name: string, value: string) => void
  removeItem: (name: string) => void
}

// storage
export const safePersistStorage: IProps = {
  getItem: (name) => {
    return Cookies.get(name) || null
  },
  setItem: (name, value) => {
    Cookies.set(name, value, { expires: 7, path: '/' })
  },
  removeItem: (name) => {
    Cookies.remove(name)
  },
}
