import type { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPostById } from '@/entities/api'
import { PostDetailModule } from '@/modules/post-detail'

interface IProps {
  params: Promise<{ id: string; locale: string }>
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params
  const post = await getPostById(id)
  const t = await getTranslations('PostDetail')

  if (!post) return { title: t('notFound') }

  return {
    title: `${post.title}`,
    description: post.body,
  }
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostDetailModule {...post} />
}

export default Page