'use client';

import { getPosts } from '@/entities/api';
import { useQuery } from '@tanstack/react-query';
import { PostCard } from './elements';

export default function PostListModule() {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.slice(0, 12).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}