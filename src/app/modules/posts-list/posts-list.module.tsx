'use client'

import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from '../../../i18n/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/entities/api/posts/posts.api'
import { PostCard } from './elements/post-card.component'
import { Pagination } from '@/shared/ui/pagination'
import { useTranslations } from 'next-intl'

export default function PostsListModule() {
  const t = useTranslations('Posts')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1
  const limit = 6

  const { data, isLoading } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getPosts(currentPage, limit),
  })

  const totalPages = Math.ceil((data?.total || 0) / limit)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        Loading...
      </div>
    )

  return (
    <section className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h1 className="text-primary text-2xl font-medium uppercase">
          {t('title')}
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}
