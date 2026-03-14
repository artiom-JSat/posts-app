'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../../i18n/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/entities/api/post/post.api';
import { Button } from '@/shared/ui';
import { PostCard } from './elements/post-card.component';

export default function PostListModule() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getPosts(currentPage, limit),
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">...</div>;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Блок пагинации (shadcn style) */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </Button>
        
        <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}