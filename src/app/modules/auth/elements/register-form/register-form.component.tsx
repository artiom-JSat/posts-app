'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { ControlledFieldComponent } from '@/shared/components/controlled-field'
import { useRegisterAction } from '@/shared/store'

import { getRegisterSchema, type RegisterFormValues } from '../../auth.schema'

// interface
interface IProps {}

// component
const RegisterFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()
  const registerUser = useRegisterAction()

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    mode: 'onChange',
  })

  const { handleSubmit, setError } = methods

  const onRegisterSubmit = (values: RegisterFormValues) => {
    const result = registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (result.success) {
      router.push('/posts')
    } else {
      setError('email', { type: 'manual', message: t(`errors.${result.message}`) })
    }
  }

  // return
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onRegisterSubmit)} className='space-y-4 p-4'>
        <ControlledFieldComponent id='reg-name' name='name' label={t('name')} placeholder={t('placeholders.name')} />

        <ControlledFieldComponent
          id='reg-email'
          name='email'
          label={t('email')}
          placeholder={t('placeholders.email')}
          type='email'
        />

        <ControlledFieldComponent
          id='reg-password'
          name='password'
          label={t('password')}
          placeholder={t('placeholders.password')}
          type='password'
        />

        <ControlledFieldComponent
          id='reg-confirm'
          name='confirmPassword'
          label={t('confirmPassword')}
          placeholder={t('placeholders.password')}
          type='password'
        />

        <Button type='submit' className='w-full'>
          {t('submitRegister')}
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegisterFormComponent
