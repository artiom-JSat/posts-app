import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { type IPost } from '@/entities/models'
import { BackButtonComponent } from '@/shared/components/back-button'
import { WrapperComponent } from '@/shared/components/wrapper'

// interface
interface IProps extends IPost {}

// component
const PostDetailModule: FC<Readonly<IProps>> = (props: IProps) => {
  const { id, title, body, userId } = props

  const t = useTranslations('PostDetail')
  const imageUrl = `https://picsum.photos/seed/${id}/1200/630`

  // return
  return (
    <WrapperComponent type='main' className='max-w-3xl'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <BackButtonComponent baseUrl='/posts'>{t('back')}</BackButtonComponent>
        <article className='space-y-6'>
          <div className='space-y-2'>
            <span className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
              {t('postId')}: {id}
            </span>

            <h1 className='text-4xl leading-tight font-extrabold capitalize lg:text-5xl'>{title}</h1>
          </div>
          <div className='bg-muted relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg'>
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 800px'
            />
          </div>
          <div className='prose prose-slate dark:prose-invert max-w-none'>
            <p className='text-foreground/90 text-xl leading-relaxed'>{body}</p>
            <p className='text-muted-foreground mt-4'>
              {body} {body}
            </p>
          </div>
          <div className='pt-10'>
            <div className='bg-card rounded-lg border p-6 shadow-sm'>
              <h3 className='mb-2 font-semibold'>{t('author.title')}</h3>
              <p className='text-muted-foreground text-sm'>{t('author.description', { id: userId })}</p>
            </div>
          </div>
        </article>
      </div>
    </WrapperComponent>
  )
}

export default PostDetailModule
