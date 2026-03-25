'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/pkg/theme/ui/button'
import { redirect } from '@/pkg/locale'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PaginationComponent = (props: IPaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props

  const t = useTranslations('Pagination')
  const locale = useLocale()
  
  if (totalPages > 0 && currentPage > totalPages) {
    redirect({
      href: {
        pathname: '/posts',
        query: { page: totalPages },
      },
      locale: locale,
    })
  }

  if (currentPage < 1) {
    redirect({
      href: {
        pathname: '/posts',
        query: { page: 1 },
      },
      locale: locale,
    })
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t('back')}
      </Button>

      <div className="text-sm font-medium">
        {t('info', { current: currentPage, total: totalPages })}
      </div>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t('next')}
      </Button>
    </div>
  )
}

export default PaginationComponent
