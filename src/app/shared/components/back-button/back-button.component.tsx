'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

interface IBackButtonProps {
  children: React.ReactNode
  fallbackHref?: string
}

const BackButtonComponent = (props: IBackButtonProps) => {
  const { children, fallbackHref = '/posts' } = props
  const router = useRouter()
  const fromPage = useSearchParams().get('page')

  const handleBack = () => {
    const targetHref = fromPage
      ? `${fallbackHref}?page=${fromPage}`
      : fallbackHref

    router.push(targetHref)
  }

  return (
    <Button variant="ghost" className="group mb-8 -ml-4" onClick={handleBack}>
      <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {children}
    </Button>
  )
}

export default BackButtonComponent
