'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { postsQueries } from '@/entities/api/posts'
import { PaginationComponent } from '@/shared/components/pagination'
import { WrapperComponent } from '@/shared/components/wrapper'
import { usePostsListPagination } from '@/shared/hooks'

import { PostCardComponent } from './elements'

// interface
interface IProps {}

// component
const PostsListModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Posts')

  const { currentPage, limit, setPage } = usePostsListPagination()

  const { data: postsData } = useQuery(postsQueries.list(currentPage, limit))
  const { data: posts = [], total = 0 } = postsData || {}

  const totalPages = Math.ceil(total / limit)

  usePostsListPagination({ totalPages })

  // return
  return (
    <WrapperComponent type='main'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-primary text-2xl font-medium uppercase'>{t('title')}</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
