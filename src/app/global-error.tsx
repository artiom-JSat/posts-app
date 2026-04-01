'use client'

import { type NextPage } from 'next'
import Error from 'next/error'
import { useEffect } from 'react'

// interface
interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

// component
const Page: NextPage<Readonly<IProps>> = (props: IProps) => {
  const { error, reset } = props

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  // return
  return (
    <html>
      <body className='flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center'>
        <h1 className='text-4xl font-bold text-slate-900'>Critical system error</h1>

        <p className='mt-4 max-w-md text-slate-600'>
          A serious system failure has occurred. We have already been notified of the problem.
        </p>

        <button
          onClick={() => reset()}
          className='bg-primary hover:bg-primary/90 mt-6 rounded-lg px-6 py-2 text-white transition-colors'
        >
          Try again
        </button>
      </body>
    </html>
  )
}

export default Page
