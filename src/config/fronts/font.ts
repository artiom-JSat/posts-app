import { Geist as FontPrimary, Geist_Mono as FontSecondary } from 'next/font/google'

// primary font
export const fontPrimary = FontPrimary({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})

// secondary font
export const fontSecondary = FontSecondary({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})
