'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

import { POSTS_LIST_PAGINATION } from '@/modules/posts-list'
import { usePathname, useRouter } from '@/pkg/locale'

// interface
interface IProps {
  totalPages?: number
}

// hook
export const usePostsListPagination = ({ totalPages = 0 }: IProps = {}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || POSTS_LIST_PAGINATION.DEFAULT_PAGE,
    [searchParams],
  )
  const limit = POSTS_LIST_PAGINATION.DEFAULT_LIMIT

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)

      if (page <= POSTS_LIST_PAGINATION.DEFAULT_PAGE) {
        params.delete('page')
      } else {
        params.set('page', String(page))
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: true })
    },
    [searchParams, pathname, router],
  )

  useEffect(() => {
    if (currentPage < 1) {
      setPage(1)
    }

    if (totalPages > 0 && currentPage > totalPages) {
      setPage(totalPages)
    }
  }, [currentPage, totalPages, setPage])

  // return
  return {
    currentPage,
    limit,
    setPage,
  }
}
