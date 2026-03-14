'use client'

import { useRouter } from '../../../../i18n/navigation'
import { Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'

export const BackButton = ({ children, fallbackHref = '/posts' }: { children: React.ReactNode, fallbackHref?: string }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button variant="ghost" onClick={handleBack} className="mb-8 -ml-4">
      <ChevronLeft className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};