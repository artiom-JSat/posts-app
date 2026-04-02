import { type FC, type ReactNode } from 'react'

import { cn } from '@/pkg/theme/lib/utils'

// interface
interface IProps {
  children: ReactNode
  type?: 'main' | 'section'
  className?: string
}

// component
const WrapperComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { children, type = 'main', className } = props

  // return
  return (
    <>
      {type === 'main' ? (
        <main className={cn('container mx-auto w-full max-w-[1500px] px-4 py-10 pb-20 sm:pt-[88px]', className)}>
          {children}
        </main>
      ) : (
        <section className={cn('container mx-auto w-full max-w-[1500px] px-4', className)}>{children}</section>
      )}
    </>
  )
}

export default WrapperComponent
