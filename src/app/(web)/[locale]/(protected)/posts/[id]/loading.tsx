import { type FC } from 'react'

import { WrapperComponent } from '@/shared/components/wrapper'

// interface
interface IProps {}

// component
const LoadingPostDetail: FC<Readonly<IProps>> = () => {
  return (
    <WrapperComponent type='main' className='max-w-3xl'>
      <div className='animate-pulse px-4 sm:px-6 lg:px-8'>
        {/* Back button skeleton */}
        <div className='bg-muted mb-8 h-8 w-24 rounded'></div>

        <article className='space-y-6'>
          <div className='space-y-2'>
            {/* Post ID skeleton */}
            <div className='bg-muted h-4 w-32 rounded'></div>
            {/* Title skeleton */}
            <div className='bg-muted h-12 w-full max-w-2xl rounded'></div>
            <div className='bg-muted h-12 w-3/4 max-w-xl rounded'></div>
          </div>

          {/* Image skeleton */}
          <div className='bg-muted relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg'></div>

          {/* Body content skeleton */}
          <div className='space-y-4 pt-4'>
            <div className='bg-muted h-4 w-full rounded'></div>
            <div className='bg-muted h-4 w-11/12 rounded'></div>
            <div className='bg-muted h-4 w-full rounded'></div>
            <div className='bg-muted h-4 w-4/5 rounded'></div>
            <div className='bg-muted h-4 w-full rounded'></div>
            <div className='bg-muted h-4 w-5/6 rounded'></div>
          </div>

          {/* Author skeleton */}
          <div className='pt-10'>
            <div className='bg-muted/50 h-24 rounded-lg border p-6'>
              <div className='bg-muted mb-3 h-5 w-32 rounded'></div>
              <div className='bg-muted h-4 w-48 rounded'></div>
            </div>
          </div>
        </article>
      </div>
    </WrapperComponent>
  )
}

export default LoadingPostDetail
