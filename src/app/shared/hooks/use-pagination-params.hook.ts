'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useTransition } from 'react'

import { usePathname, useRouter } from '@/pkg/locale'

// interface
interface IProps {
  defaultPage: number
  defaultLimit: number
}

// hook
export const usePaginationParams = (props: IProps) => {
  const { defaultPage = 1, defaultLimit = 6 } = props

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const currentPage = useMemo(() => Number(searchParams.get('page')) || defaultPage, [searchParams, defaultPage])

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)

      if (page <= defaultPage) {
        params.delete('page')
      } else {
        params.set('page', String(page))
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: true })
      })
    },
    [searchParams, pathname, router, defaultPage],
  )

  // return
  return { currentPage, setPage, isPending, limit: defaultLimit }
}
