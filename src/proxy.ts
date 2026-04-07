import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from 'pkg/locale'

// middleware
const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuth = request.cookies.get('is_logged_in')?.value === 'true'

  const isPublicPage =
    ['/login', '/register'].some((path) => pathname.endsWith(path)) ||
    pathname === '/' ||
    routing.locales.some((locale) => pathname === `/${locale}` || pathname === `/${locale}/`)

  if (!isAuth && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuth && (pathname.includes('/login') || pathname.includes('/register'))) {
    return NextResponse.redirect(new URL('/posts', request.url))
  }

  return intlMiddleware(request)
}

// config
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
