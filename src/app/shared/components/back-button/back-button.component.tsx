'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

export const BackButton = ({
  children,
  fallbackHref = '/posts',
}: {
  children: React.ReactNode
  fallbackHref?: string
}) => {
  const router = useRouter()

  const handleBack = () => {
    router.push(fallbackHref)
  }

  return (
    <Button variant="ghost" className="group mb-8 -ml-4" onClick={handleBack}>
      <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5" />
      {children}
    </Button>
  )
}
