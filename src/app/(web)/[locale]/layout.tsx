import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'
import { AuthProvider } from '@/shared/providers/auth-provider'
import { HeaderWidget } from '@/widgets/header'

import '@/config/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
