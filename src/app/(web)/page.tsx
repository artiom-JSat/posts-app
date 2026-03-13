import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPosts } from '@/entities/api/post/post.api';
import PostListModule from '@/modules/post-list/post-list.module';

export default async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Наши публикации</h1>
        <p className="text-muted-foreground text-lg">
          Интересные статьи, полученные через ISR (обновление каждый час).
        </p>
      </div>

      {/* Передаем состояние кэша с сервера на клиент */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostListModule />
      </HydrationBoundary>
    </main>
  );
}