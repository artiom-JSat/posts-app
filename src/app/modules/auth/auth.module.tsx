'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useRouter } from '@/pkg/locale'
import { Card } from '@/pkg/theme/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pkg/theme/ui/tabs'
import { WrapperComponent } from '@/shared/components/wrapper'

import { LoginFormComponent, RegisterFormComponent } from './elements'

// interface
interface IProps {
  variant: 'login' | 'register'
}

// component
const LoginModule: FC<Readonly<IProps>> = (props) => {
  const { variant } = props
  const t = useTranslations('Auth')
  const router = useRouter()

  const handleTabChange = (value: string) => {
    router.push(`/${value}`)
  }

  // return
  return (
    <WrapperComponent type='main' className='flex min-h-[80vh] items-center justify-center px-4'>
      <Card className='w-full max-w-[450px] p-2'>
        <Tabs defaultValue={variant} onValueChange={handleTabChange}>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='login'>{t('loginTab')}</TabsTrigger>
            <TabsTrigger value='register'>{t('registerTab')}</TabsTrigger>
          </TabsList>

          <TabsContent value='login'>
            <LoginFormComponent />
          </TabsContent>

          <TabsContent value='register'>
            <RegisterFormComponent />
          </TabsContent>
        </Tabs>
      </Card>
    </WrapperComponent>
  )
}

export default LoginModule
