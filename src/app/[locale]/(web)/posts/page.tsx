import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getTranslations } from 'next-intl/server'
import { getPosts } from '@/entities/api/post/post.api'
import PostListModule from '@/modules/posts-list/posts-list.module'

interface IProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: IProps) {
  const t = await getTranslations('Posts')
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getPosts(currentPage, 6),
  })

  return (
    <main className="container mx-auto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostListModule />
      </HydrationBoundary>
    </main>
  )
}
