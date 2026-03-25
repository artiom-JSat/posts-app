import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LoginModule } from '@/modules/login'

export const metadata = {
  title: 'Login | Register',
}

interface IProps {
  params: Promise<{ locale: string }>
}

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  return <LoginModule />
}

export default Page