import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { fontPrimary, fontSecondary } from '@/config/fronts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'
import { AuthProvider } from '@/shared/providers/auth-provider'
import { HeaderWidget } from '@/widgets/header'

import '@/config/styles/globals.css'

interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'myBLOG',
  description: 'myBLOG - posts application',
}

const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
            <RestApiProvider>
              <AuthProvider>
                <HeaderWidget />
                {children}
              </AuthProvider>
            </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
