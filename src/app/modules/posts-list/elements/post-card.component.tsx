'use client'

import { ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { type IPost } from '@/entities/models'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/pkg/theme/ui/card'
import { PostImageComponent } from '@/shared/components/post-image'

// interface
interface IProps {
  post: IPost
  fromPage: number
}

// component
const PostCardComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { post, fromPage, ...rest } = props
  const { id, title, body } = post

  const t = useTranslations('Posts')

  // return
  return (
    <Card key={id} {...rest} className='flex h-full flex-col pt-0 shadow-none'>
      <CardContent className='relative aspect-video w-full overflow-hidden px-0'>
        <PostImageComponent
          postId={id}
          title={title}
          preload={true}
          aspectRatio='card'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </CardContent>

      <CardHeader className='mb-2 gap-3'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription className='text-base'>{body}</CardDescription>
      </CardHeader>

      <div className='grow' />

      <CardFooter className='border-none bg-transparent p-5 pt-0'>
        <Button className='group rounded-lg text-base has-[>svg]:px-6' size='lg' asChild>
          <Link href={`/posts/${id}?page=${fromPage}`}>
            {t('details')}
            <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PostCardComponent
