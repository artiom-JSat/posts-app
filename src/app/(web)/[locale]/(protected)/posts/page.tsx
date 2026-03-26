import { type NextPage } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/pkg/rest-api'
import { getPosts } from '@/entities/api/posts/posts.api'
import PostsListModule from '@/modules/posts/posts-list.module'
import { setRequestLocale } from 'next-intl/server'
import { POSTS_LIST_PAGINATION } from '@/modules/posts'

interface IProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params, searchParams } = props

  const { locale } = await params
  setRequestLocale(locale)

  const { page } = await searchParams
  const currentPage = Number(page) || POSTS_LIST_PAGINATION.DEFAULT_PAGE
  const limit = POSTS_LIST_PAGINATION.DEFAULT_LIMIT
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts', { page: currentPage, limit, locale }],
    queryFn: () => getPosts({ page: currentPage, limit }),
  })

  return (
    <main className="container mx-auto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsListModule />
      </HydrationBoundary>
    </main>
  )
}

export default Page
