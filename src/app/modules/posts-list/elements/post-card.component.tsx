'use client'

import Image from 'next/image'
import { Link } from 'pkg/locale'
import { IPost } from '@/entities/models'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'pkg/theme/ui/card'
import { Button } from 'pkg/theme/ui/button'

export const PostCard = ({ post, ...props }: { post: IPost }) => {
  const imageUrl = `https://picsum.photos/seed/${post.id}/600/400`
  const t = useTranslations('Posts')

  return (
    <Card
      className="pt-0 shadow-none flex flex-col h-full"
      key={post.id}
      {...props}
    >
      <CardContent className="px-0 relative aspect-video w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>
      <CardHeader className="mb-2 gap-3">
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="text-base">{post.body}</CardDescription>
      </CardHeader>
      <div className="grow" />
      <CardFooter className="bg-transparent border-none p-5 pt-0">
        <Button
          className="group rounded-lg text-base has-[>svg]:px-6"
          size="lg"
          asChild
        >
          <Link href={`/posts/${post.id}`}>
            {t('details')}
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
