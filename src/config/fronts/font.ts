import { Geist as FontPrimary, Geist_Mono as FontSecondary } from 'next/font/google'

// primary font
export const fontPrimary = FontPrimary({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

// secondary font
export const fontSecondary = FontSecondary({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
