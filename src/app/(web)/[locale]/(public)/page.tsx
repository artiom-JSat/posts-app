import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { MainComponent } from '@/modules/main'

interface IProps {
  params: Promise<{ locale: string }>
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  return <MainComponent />
}

export default Page