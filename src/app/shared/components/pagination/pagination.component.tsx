'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/pkg/theme/ui/button'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PaginationComponent = (props: IPaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props

  const t = useTranslations('Pagination')

  if (totalPages <= 1) return null

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
