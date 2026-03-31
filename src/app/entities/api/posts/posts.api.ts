import { IGetPostsParams, IPost, IPostsResponse } from '@/entities/models'
import { POSTS_LIST_PAGINATION } from '@/modules/posts-list'
import { restApiFetcher } from '@/pkg/rest-api/fetcher'

// api
export const getPosts = async ({
  page = POSTS_LIST_PAGINATION.DEFAULT_PAGE,
  limit = POSTS_LIST_PAGINATION.DEFAULT_LIMIT,
}: IGetPostsParams): Promise<IPostsResponse> => {
  const response = await restApiFetcher.get('posts', {
    searchParams: {
      _page: page,
      _limit: limit,
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  const total = Number(response.headers.get('x-total-count')) || 0
  const data = await response.json<IPost[]>()

  return { data, total }
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  const response = await restApiFetcher.get(`posts/${id}`, {
    next: { revalidate: 3600 },
    cache: 'force-cache',
  })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  return response.json<IPost>()
}
