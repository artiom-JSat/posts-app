'use client'

import { useEffect } from 'react'

// interface
interface IProps {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

// hook
export const usePaginationGuard = (props: IProps) => {
  const { currentPage, totalPages, setPage } = props

  useEffect(() => {
    if (totalPages === 0) return

    if (currentPage < 1) {
      setPage(1)
    } else if (currentPage > totalPages) {
      setPage(totalPages)
    }
  }, [currentPage, totalPages, setPage])
}
