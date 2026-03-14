import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { BackButton, Separator } from '@/shared/ui'
import { getPostById } from '@/entities/api'

interface IProps {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostById(id)
  const t = await getTranslations('PostDetail')

  if (!post) return { title: t('notFound') }

  return {
    title: `${post.title} | Blog`,
    description: post.body,
  }
}

export default async function PostDetailPage({ params }: IProps) {
  const { id } = await params
  const post = await getPostById(id)
  const t = await getTranslations('PostDetail')

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <BackButton>
        {t('back')}
      </BackButton>

      <article className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            {t('postId')}: {post.id}
          </span>
          <h1 className="text-4xl font-extrabold lg:text-5xl capitalize leading-tight">
            {post.title}
          </h1>
        </div>

        <Separator />

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-foreground/90">
            {post.body}
          </p>
          <p className="text-muted-foreground mt-4">
            {post.body} {post.body}
          </p>
        </div>

        <div className="pt-10">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">{t('author.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('author.description', { id: post.userId })}
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
