'use client'

import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {}

// component
const NotFoundModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('NotFound')

  // return
  return (
    <div className='relative grid min-h-screen overflow-hidden'>
      <h1 className='absolute inset-0 z-0 flex items-center justify-center text-[25vw] font-bold text-slate-100 select-none sm:text-[20vw]'>
        404
      </h1>

      <div className='z-10 flex flex-col items-center justify-center px-4 py-8 text-center'>
        <h2 className='mb-6 text-5xl font-semibold'>{t('title')}</h2>
        <h3 className='mb-1.5 text-3xl font-semibold'>{t('subtitle')}</h3>
        <p className='text-muted-foreground mb-6 max-w-sm'>{t('description')}</p>
        <Button asChild size='lg' className='rounded-lg text-base'>
          <Link href='/'>{t('button')}</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundModule
