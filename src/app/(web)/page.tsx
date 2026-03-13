import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPosts } from '@/entities/api/post/post.api';
import PostListModule from '@/modules/post-list/post-list.module';

interface IProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PostsPage({ searchParams }: IProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getPosts(currentPage, 6),
  });

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Publications</h1>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostListModule />
      </HydrationBoundary>
    </main>
  );
}