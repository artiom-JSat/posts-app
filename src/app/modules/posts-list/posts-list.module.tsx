'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from '@/pkg/locale'
import { useTranslations } from 'next-intl'
import { getPosts } from '@/entities/api/posts/posts.api'
import { PaginationComponent } from '@/shared/components/pagination'
import { PostCardComponent } from './elements'

const PostsListModule = () => {
  const t = useTranslations('Posts')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1
  const limit = 6

  const { data } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getPosts(currentPage, limit),
  })

  const totalPages = Math.ceil((data?.total || 0) / limit)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <section className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h1 className="text-primary text-2xl font-medium uppercase">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((post) => (
            <PostCardComponent
              key={post.id}
              post={post}
              fromPage={currentPage}
              data-testid="post-card"
            />
          ))}
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}

export default PostsListModule
