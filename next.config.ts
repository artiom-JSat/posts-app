import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// i18n
const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/locale/request.ts',
  experimental: {
    createMessagesDeclaration: './translations/en.json',
  },
})

// config
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
