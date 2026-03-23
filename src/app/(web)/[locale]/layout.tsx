import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from 'pkg/locale'
import QueryProvider from '@/shared/providers/query-provider'
import { AuthProvider } from '@/shared/providers/auth-provider'
import { Navbar } from '@/widgets/navbar'

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
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
