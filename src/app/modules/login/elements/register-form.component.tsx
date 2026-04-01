'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'
import { useRegisterAction } from '@/shared/store'

import { getRegisterSchema, type RegisterFormValues } from '../auth.schema'

// interface
interface IProps {}

// component
const RegisterFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterSchema(t)),
    mode: 'onChange',
  })

  const registerUser = useRegisterAction()

  const onSubmit = (values: RegisterFormValues) => {
    const result = registerUser({
      email: values.email,
      password: values.password,
      name: values.name,
    })

    if (result.success) {
      router.push('/posts')
    } else {
      setError('email', {
        type: 'manual',
        message: t(`errors.${result.message}`),
      })
    }
  }

  // return
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4'>
      <div className='space-y-2'>
        <Label htmlFor='reg-name'>{t('name')}</Label>
        <Input
          id='reg-name'
          placeholder={t('placeholders.name')}
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className='text-destructive text-sm'>{errors.name.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='reg-email'>{t('email')}</Label>
        <Input
          id='reg-email'
          placeholder={t('placeholders.email')}
          type='email'
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='reg-password'>Password*</Label>
        <Input
          id='reg-password'
          placeholder='********'
          type='password'
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='reg-confirm'>{t('confirmPassword')}</Label>
        <Input
          id='reg-confirm'
          placeholder='********'
          type='password'
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'border-destructive' : ''}
        />
        {errors.confirmPassword && <p className='text-destructive text-sm'>{errors.confirmPassword.message}</p>}
      </div>

      <Button type='submit' className='w-full'>
        {t('submitRegister')}
      </Button>
    </form>
  )
}

export default RegisterFormComponent
