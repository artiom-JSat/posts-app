import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { IPost } from '@/entities/models'
import { BackButtonComponent } from '@/shared/components/back-button'

const PostDetailModule = (post: IPost) => {
  const { id, title, body, userId } = post
  const t = useTranslations('PostDetail')
  const imageUrl = `https://picsum.photos/seed/${id}/1200/630`

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <BackButtonComponent baseUrl="/posts">{t('back')}</BackButtonComponent>
      <article className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            {t('postId')}: {id}
          </span>

          <h1 className="text-4xl font-extrabold lg:text-5xl capitalize leading-tight">
            {title}
          </h1>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-foreground/90">{body}</p>
          <p className="text-muted-foreground mt-4">
            {body} {body}
          </p>
        </div>
        <div className="pt-10">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">{t('author.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('author.description', { id: userId })}
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}

export default PostDetailModule
