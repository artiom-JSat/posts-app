'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { ControlledFieldComponent } from '@/shared/components/controlled-field'
import { useLoginAction } from '@/shared/store'

import { getLoginSchema, type LoginFormValues } from '../../auth.schema'

// interface
interface IProps {}

// component
const LoginFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()
  const login = useLoginAction()

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, setError } = methods

  const onLoginSubmit = (values: LoginFormValues) => {
    const result = login(values.email, values.password)

    if (result.success) {
      router.push('/posts')
    } else {
      setError('email', { type: 'manual', message: t(`errors.${result.message}`) })
      setError('password', { type: 'manual', message: t(`errors.${result.message}`) })
    }
  }

  // return
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onLoginSubmit)} className='space-y-4 p-4'>
        <ControlledFieldComponent
          id='login-email'
          name='email'
          label={t('email')}
          placeholder={t('placeholders.email')}
          type='email'
        />

        <ControlledFieldComponent
          id='login-password'
          name='password'
          label={t('password')}
          placeholder={t('placeholders.password')}
          type='password'
        />

        <Button type='submit' className='w-full'>
          {t('submitLogin')}
        </Button>
      </form>
    </FormProvider>
  )
}

export default LoginFormComponent
