import { type FC } from 'react'

import { Link } from '@/pkg/locale'

// interface
interface IProps {}

// component
const LogoComponent: FC<Readonly<IProps>> = () => {
  // return
  return (
    <Link href='/' className='flex items-center space-x-2 text-xl font-bold tracking-tight'>
      myBLOG
    </Link>
  )
}

export default LogoComponent
