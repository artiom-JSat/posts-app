'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { postsQueries } from '@/entities/api/posts'
import { PaginationComponent } from '@/shared/components/pagination'
import { PostsListSkeleton } from '@/shared/components/skeletons'
import { WrapperComponent } from '@/shared/components/wrapper'
import { usePaginationGuard, usePaginationParams } from '@/shared/hooks'

import { PostCardComponent } from './elements'
import { POSTS_LIST_PAGINATION } from './posts-list.constant'

// interface
interface IProps {}

// component
const PostsListModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Posts')

  const { currentPage, limit, setPage, isPending } = usePaginationParams({
    defaultPage: POSTS_LIST_PAGINATION.DEFAULT_PAGE,
    defaultLimit: POSTS_LIST_PAGINATION.DEFAULT_LIMIT,
  })

  const { data: postsData, isFetching } = useQuery(postsQueries.list(currentPage, limit))
  const { data: posts = [], total = 0 } = postsData || {}

  const totalPages = Math.ceil(total / limit)

  usePaginationGuard({ currentPage, totalPages, setPage })

  if (!isFetching && posts.length === 0) return <PostsListSkeleton />

  // return
  return (
    <WrapperComponent type='main'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-primary text-2xl font-medium uppercase'>{t('title')}</h1>

        <div
          className={`grid grid-cols-1 gap-6 transition-opacity duration-300 md:grid-cols-2 lg:grid-cols-3 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
        >
          {posts.map((post) => (
            <PostCardComponent key={post.id} post={post} fromPage={currentPage} data-testid='post-card' />
          ))}
        </div>

        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </WrapperComponent>
  )
}

export default PostsListModule
