'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// component
const PaginationComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { currentPage, totalPages, onPageChange } = props

  const t = useTranslations('Pagination')

  if (totalPages <= 1) return null

  // return
  return (
    <div className='flex items-center justify-center space-x-2 py-4'>
      <Button variant='outline' disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        {t('back')}
      </Button>

      <div className='text-sm font-medium'>{t('info', { current: currentPage, total: totalPages })}</div>

      <Button variant='outline' disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
        {t('next')}
      </Button>
    </div>
  )
}

export default PaginationComponent
