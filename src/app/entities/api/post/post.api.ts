import { IPost } from '@/entities/models'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async (): Promise<IPost[]> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Ошибка при получении постов')
  }

  return res.json()
}
