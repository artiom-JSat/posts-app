import { type FC, type ReactNode } from 'react'

// interface
interface IProps {
  children: ReactNode
}

// component
const RootLayout: FC<Readonly<IProps>> = (props: IProps) => {
  const { children } = props

  // return
  return children
}

export default RootLayout
