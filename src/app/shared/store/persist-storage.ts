// interface
interface IProps {
  getItem: (name: string) => string | null
  setItem: (name: string, value: string) => void
  removeItem: (name: string) => void
}

// storage
export const safePersistStorage: IProps = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
  },
  setItem: (name, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value)
    }
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name)
    }
  },
}
