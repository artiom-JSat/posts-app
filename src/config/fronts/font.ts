import { Geist as FontPrimary, Geist_Mono as FontSecondary } from 'next/font/google'

export const fontPrimary = FontPrimary({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const fontSecondary = FontSecondary({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})