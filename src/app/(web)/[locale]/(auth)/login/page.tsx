import { type Metadata, type NextPage } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { AuthModule } from '@/modules/auth'

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props

  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Auth' })

  return {
    title: t('loginTab'),
  }
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  // return
  return <AuthModule variant='login' />
}

export default Page
