'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { type FC, type ReactNode } from 'react'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {
  children: ReactNode
  baseUrl: string
  className?: string
}

// component
const BackButtonComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { children, baseUrl, className } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const fromPage = searchParams.get('page')

  const handleBack = () => {
    const params = new URLSearchParams()

    if (fromPage) {
      params.set('page', fromPage)
    }

    const queryString = params.toString()
    const targetHref = queryString ? `${baseUrl}?${queryString}` : baseUrl

    router.push(targetHref)
  }

  // return
  return (
    <Button variant='ghost' className={`group mb-8 -ml-4 ${className}`} onClick={handleBack}>
      <ArrowLeftIcon className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5' />
      {children}
    </Button>
  )
}

export default BackButtonComponent
