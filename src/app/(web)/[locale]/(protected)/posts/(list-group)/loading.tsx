import { type FC } from 'react'

import { PostsListSkeleton } from '@/shared/components/skeletons'

// interface
interface IProps {}

// component
const Loading: FC<Readonly<IProps>> = () => {
  // return
  return <PostsListSkeleton />
}

export default Loading
