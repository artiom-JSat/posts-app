import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { authServer } from '@/pkg/auth/server'
import { routing } from '@/pkg/locale'

// middleware
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. Пропускаем API запросы без обработки локализацией
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // 2. Инициализируем i18n ответ (локализация)
  const i18nRes = createMiddleware(routing)(req)

  // 3. Работа с гео-данными (Cloudflare / Cloudfront / Custom)
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)

  // 4. Защита приватных роутов
  // Если пользователь пытается зайти в /posts, но он не авторизован
  if (pathname.includes('/posts')) {
    const session = await authServer.getCacheSession()

    if (!session.user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // 5. Редирект авторизованных пользователей со страниц входа/регистрации
  if (pathname.includes('/login') || pathname.includes('/register')) {
    const session = await authServer.getCacheSession()

    if (session.user) {
      return NextResponse.redirect(new URL('/posts', req.url))
    }
  }

  return i18nRes
}

// config
export const config = {
  matcher: [
    // Исключаем все статические файлы, Next.js служебные пути и картинки
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}

// import { type NextRequest, NextResponse } from 'next/server'
// import createMiddleware from 'next-intl/middleware'
// import { routing } from 'pkg/locale'

// const intlMiddleware = createMiddleware(routing)

// // proxy
// export default function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   const isAuth = request.cookies.get('is_logged_in')?.value === 'true'

//   const isPublicPage =
//     ['/login', '/register'].some((path) => pathname.endsWith(path)) ||
//     pathname === '/' ||
//     routing.locales.some((locale) => pathname === `/${locale}` || pathname === `/${locale}/`)

//   if (!isAuth && !isPublicPage) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   if (isAuth && (pathname.includes('/login') || pathname.includes('/register'))) {
//     return NextResponse.redirect(new URL('/posts', request.url))
//   }

//   return intlMiddleware(request)
// }

// // config
// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
// }
