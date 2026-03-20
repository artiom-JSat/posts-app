import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPosts } from '@/entities/api/posts/posts.api'
import PostsListModule from '@/modules/posts-list/posts-list.module'

interface IProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: IProps) {
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
        <PostsListModule />
      </HydrationBoundary>
    </main>
  )
}
