import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getPostById } from '@/entities/api'
import { postsQueries } from '@/entities/api/posts'
import { IPost } from '@/entities/models'
import { PostDetailModule } from '@/modules/post-detail'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {
  params: Promise<{ id: string; locale: string }>
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props

  const { id } = await params
  const post = await getPostById(id)
  const t = await getTranslations('PostDetail')

  if (!post) return { title: t('notFound') }

  return {
    title: `${post.title}`,
    description: post.body,
  }
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { id, locale } = await params
  setRequestLocale(locale)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(postsQueries.detail(id))

  const post = queryClient.getQueryData<IPost>(postsQueries.detail(id).queryKey)

  if (!post) notFound()

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModule postId={id} />
    </HydrationBoundary>
  )
}

export default Page
