import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { authServer } from '@/pkg/auth/server'
import { routing } from '@/pkg/locale'

// middleware
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const i18nRes = createMiddleware(routing)(req)

  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)

  if (pathname.includes('/posts')) {
    const session = await authServer.getCacheSession()

    if (!session.user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (pathname.includes('/login') || pathname.includes('/register')) {
    const session = await authServer.getCacheSession()

    if (session.user) {
      return NextResponse.redirect(new URL('/posts', req.url))
    }
  }

  // return
  return i18nRes
}

// config
export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
