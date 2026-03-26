import { IPost } from '@/entities/models'
import { restApiFetcher } from '@/pkg/rest-api/fetcher'

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ data: IPost[]; total: number }> => {
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

  const total = Number(response.headers.get('x-total-count')) || 100
  const data = await response.json<IPost[]>()

  return { data, total }
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  const response = await restApiFetcher.get(`posts/${id}`)

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  return response.json<IPost>()
}
