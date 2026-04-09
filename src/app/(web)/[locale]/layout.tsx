import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { envClient } from '@/config/env'
import { fontPrimary, fontSecondary } from '@/config/fronts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'
import { HeaderWidget } from '@/widgets/header'

import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// static params
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props

  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const title = t('site_name')
  const description = t('description')

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),

    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,

    icons: {
      icon: '/favicon.ico',
    },
  }
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  // return
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontPrimary.variable} ${fontSecondary.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider>
          <RestApiProvider>
            <HeaderWidget />
            {children}
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
