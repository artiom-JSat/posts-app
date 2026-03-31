import { type Metadata, type NextPage } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postsQueries } from '@/entities/api/posts'
import { POSTS_LIST_PAGINATION } from '@/modules/posts-list'
import PostsListModule from '@/modules/posts-list/posts-list.module'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props

  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Posts' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params, searchParams } = props

  const { locale } = await params
  setRequestLocale(locale)

  const { page } = await searchParams
  const currentPage = Number(page) || POSTS_LIST_PAGINATION.DEFAULT_PAGE
  const limit = POSTS_LIST_PAGINATION.DEFAULT_LIMIT

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(postsQueries.list(currentPage, limit))

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsListModule />
    </HydrationBoundary>
  )
}

export default Page
