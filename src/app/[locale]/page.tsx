'use client'

import { useTranslations } from 'next-intl'
import { Link } from '../../i18n/navigation'
import { ArrowRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui'

export default function HomePage() {
  const t = useTranslations('Home')

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
          {t('title')}
          <br />
          <span className="relative">{t('subtitle')}</span>
        </h1>

        <p className="text-muted-foreground max-w-2xl">{t('description')}</p>

        <Button size="lg" asChild className="group">
          <Link href="/posts">
            {t('button')}
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <img
        src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-19.png"
        alt="Dishes"
        className="min-h-64 w-full object-cover lg:h-[400px]"
      />
    </section>
  )
}
