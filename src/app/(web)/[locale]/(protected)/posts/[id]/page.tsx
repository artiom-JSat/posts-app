import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPostById } from '@/entities/api'
import { BackButtonComponent } from '@/shared/components/back-button'

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

  const imageUrl = `https://picsum.photos/seed/${post.id}/1200/630`

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <BackButtonComponent>{t('back')}</BackButtonComponent>
      <article className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            {t('postId')}: {post.id}
          </span>

          <h1 className="text-4xl font-extrabold lg:text-5xl capitalize leading-tight">
            {post.title}
          </h1>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
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
