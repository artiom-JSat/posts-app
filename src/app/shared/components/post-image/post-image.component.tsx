'use client'

import Image, { type ImageProps } from 'next/image'
import { type FC, useState } from 'react'

import { cn } from '@/pkg/theme/lib/utils'

// interface
interface IProps extends Omit<ImageProps, 'src' | 'alt' | 'id'> {
  postId: string | number
  title: string
  aspectRatio?: 'video' | 'card' | 'square'
}

// component
const PostImageComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { postId, title, aspectRatio = 'video', className, ...rest } = props

  const [loadStatus, setLoadStatus] = useState<false | 'instant' | 'fade'>(false)

  const width = aspectRatio === 'video' ? 1200 : 600
  const height = aspectRatio === 'video' ? 630 : 400
  const originalUrl = `https://picsum.photos/seed/${postId}/${width}/${height}`
  const placeholderUrl = `https://picsum.photos/seed/${postId}/32/20`

  const aspectClasses = {
    video: 'aspect-video',
    card: 'aspect-[3/2]',
    square: 'aspect-square',
  }

  // return
  return (
    <div
      className={cn('bg-muted relative w-full overflow-hidden transition-all', aspectClasses[aspectRatio], className)}
    >
      <Image
        src={placeholderUrl}
        alt=''
        fill
        className={cn(
          'scale-110 object-cover blur-2xl',
          loadStatus === 'instant' ? 'opacity-0' : 'transition-opacity duration-700',
          loadStatus ? 'opacity-0' : 'opacity-100',
        )}
        priority
        unoptimized
      />

      <Image
        src={originalUrl}
        alt={title}
        fill
        className={cn(
          'object-cover',
          loadStatus === 'fade' && 'transition-opacity duration-700',
          loadStatus ? 'opacity-100' : 'opacity-0',
        )}
        ref={(img) => {
          if (img?.complete && !loadStatus) {
            setLoadStatus('instant')
          }
        }}
        onLoad={() => {
          if (!loadStatus) setLoadStatus('fade')
        }}
        {...rest}
      />
    </div>
  )
}

export default PostImageComponent
