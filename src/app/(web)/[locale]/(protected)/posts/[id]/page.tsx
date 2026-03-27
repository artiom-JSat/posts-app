import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getPostById } from '@/entities/api'
import { PostDetailModule } from '@/modules/post-detail'

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

  const { locale } = await params
  setRequestLocale(locale)

  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  // return
  return <PostDetailModule {...post} />
}

export default Page
