'use client'

import { type NextPage } from 'next'
import Error from 'next/error'
import { useEffect } from 'react'

interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Page: NextPage<Readonly<IProps>> = (props) => {
  const { error, reset } = props

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Critical system error
        </h1>
        <p className="mt-4 text-slate-600 max-w-md">
          A serious system failure has occurred. We have already been notified
          of the problem.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      </body>
    </html>
  )
}

export default Page
