import { type Metadata, type NextPage } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getQueryClient } from '@/pkg/rest-api'
import { getPosts } from '@/entities/api/posts/posts.api'
import { POSTS_LIST_PAGINATION } from '@/modules/posts-list'
import PostsListModule from '@/modules/posts-list/posts-list.module'

interface IProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Posts' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params, searchParams } = props

  const { locale } = await params
  setRequestLocale(locale)

  const { page } = await searchParams
  const currentPage = Number(page) || POSTS_LIST_PAGINATION.DEFAULT_PAGE
  const limit = POSTS_LIST_PAGINATION.DEFAULT_LIMIT

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts', { page: currentPage, limit, locale }],
    queryFn: () => getPosts({ page: currentPage, limit }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsListModule />
    </HydrationBoundary>
  )
}

export default Page
