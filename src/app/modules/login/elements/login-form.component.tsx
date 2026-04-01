'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'
import { useLoginAction } from '@/shared/store'

import { getLoginSchema, type LoginFormValues } from '../auth.schema'

// interface
interface IProps {}

// component
const LoginFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const login = useLoginAction()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
  })

  const onSubmit = (values: LoginFormValues) => {
    const result = login(values.email, values.password)

    if (result.success) {
      router.push('/posts')
    } else {
      setError('email', {
        type: 'manual',
        message: t(`errors.${result.message}`),
      })

      setError('password', {
        type: 'manual',
        message: t(`errors.${result.message}`),
      })
    }
  }

  // return
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4'>
      <div className='space-y-2'>
        <Label htmlFor='login-email'>{t('email')}</Label>
        <Input
          id='login-email'
          placeholder={t('placeholders.email')}
          type='email'
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='login-password'>{t('password')}</Label>
        <Input
          id='login-password'
          placeholder={t('placeholders.password')}
          type='password'
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      <Button type='submit' className='w-full'>
        {t('submitLogin')}
      </Button>
    </form>
  )
}

export default LoginFormComponent
