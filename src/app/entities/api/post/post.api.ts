import { IPost } from '@/entities/models'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ data: IPost[]; total: number }> => {
  const res = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error('Failed to fetch posts')

  const total = Number(res.headers.get('x-total-count')) || 100
  const data = await res.json()

  return { data, total }
}
