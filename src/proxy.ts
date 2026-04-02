import createMiddleware from 'next-intl/middleware'
import { routing } from 'pkg/locale'

// middleware
export default createMiddleware(routing)

// config
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
