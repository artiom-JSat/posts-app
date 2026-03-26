import type { Metadata, NextPage } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LoginModule } from '@/modules/login'

interface IProps {
  params: Promise<{ locale: string }>
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Auth' })

  return {
    title: `${t('loginTab')} & ${t('registerTab')}`,
  }
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  return <LoginModule />
}

export default Page