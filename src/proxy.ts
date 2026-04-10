import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { authServer } from '@/pkg/auth/server'
import { routing } from '@/pkg/locale'

// middleware
const i18nMiddleware = createMiddleware(routing)

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  const response = i18nMiddleware(req)

  const isAuthPage = pathname.match(/\/(login|register)$/)
  const isProtectedPage = pathname.includes('/posts')

  if (isAuthPage || isProtectedPage) {
    const session = await authServer.getCacheSession()
    const locale = req.nextUrl.locale || 'en'

    if (isAuthPage && session.user) {
      return NextResponse.redirect(new URL(`/${locale}/posts`, req.url))
    }
    if (isProtectedPage && !session.user) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }
  }

  // return
  return response
}

// config
export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
