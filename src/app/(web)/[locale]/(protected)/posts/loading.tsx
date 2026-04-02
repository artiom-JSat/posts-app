import { type FC } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/pkg/theme/ui/card'
import { WrapperComponent } from '@/shared/components/wrapper'

// interface
interface IProps {}

// component
const LoadingPosts: FC<Readonly<IProps>> = () => {
  return (
    <WrapperComponent type='main'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        {/* Title skeleton */}
        <div className='bg-muted h-8 w-48 animate-pulse rounded'></div>

        {/* Grid of skeletons */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className='flex h-full animate-pulse flex-col pt-0 shadow-none'>
              <CardContent className='bg-muted relative aspect-video w-full overflow-hidden rounded-t-xl px-0'></CardContent>

              <CardHeader className='mb-2 gap-3 pb-2'>
                <div className='bg-muted h-6 w-3/4 rounded'></div>
                <div className='bg-muted mt-2 h-4 w-full rounded'></div>
                <div className='bg-muted h-4 w-5/6 rounded'></div>
                <div className='bg-muted h-4 w-4/6 rounded'></div>
              </CardHeader>

              <div className='grow' />

              <CardFooter className='border-none bg-transparent p-5 pt-0'>
                <div className='bg-muted h-10 w-32 rounded-lg'></div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className='mt-4 flex justify-center'>
          <div className='bg-muted h-10 w-64 animate-pulse rounded-lg'></div>
        </div>
      </div>
    </WrapperComponent>
  )
}

export default LoadingPosts
