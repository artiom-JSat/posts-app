import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { getPostById, getPosts } from '@/entities/api/posts/posts.api'

export const postsQueries = {
  all: ['posts'] as const,
  lists: () => [...postsQueries.all, 'list'] as const,
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postsQueries.lists(), { page, limit }],
      queryFn: () => getPosts({ page, limit }),
      placeholderData: keepPreviousData,
    }),
  details: () => [...postsQueries.all, 'detail'] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...postsQueries.details(), id],
      queryFn: () => getPostById(id),
      staleTime: 5 * 60 * 1000,
    }),
}
