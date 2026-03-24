import { type FC } from 'react'

import { Link } from '@/pkg/locale'

interface IProps {}

const LogoComponent: FC<Readonly<IProps>> = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 font-bold text-xl tracking-tight"
    >
      myBLOG
    </Link>
  )
}

export default LogoComponent
