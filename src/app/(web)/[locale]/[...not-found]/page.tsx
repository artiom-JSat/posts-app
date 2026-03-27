import { notFound } from 'next/navigation'

// metadata
export const metadata = {
  title: '404',
}

// component
export default function NotFoundCatchAll() {
  notFound()
}
