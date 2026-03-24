'use client'

import { ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { useIsAuth } from '@/shared/store'
import { GalleryComponent } from '@/shared/components/gallery'
import { WrapperComponent } from '@/shared/components/wrapper'

const MainComponent = () => {
  const t = useTranslations('Hero')
  const isAuth = useIsAuth()
  const destination = isAuth ? '/posts' : '/login'

  return (
    <WrapperComponent type="main">
      <section className="flex flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
            {t('title')}
            <br />
            <span className="relative">{t('subtitle')}</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl">{t('description')}</p>

          <Button size="lg" asChild className="group text-lg has-[>svg]:px-6">
            <Link href={destination}>
              {t('button')}
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <GalleryComponent />
      </section>
    </WrapperComponent>
  )
}

export default MainComponent
