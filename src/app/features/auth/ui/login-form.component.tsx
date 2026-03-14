'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Button, Input, Label } from '@/shared/ui'
import { useAuthStore } from '@/shared/store/auth.store'
import { getLoginSchema, type LoginFormValues } from '../auth.schema'

export function LoginForm() {
  const t = useTranslations('Auth')
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values.email)
    router.push('/posts')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">{t('email')}</Label>
        <Input
          id="login-email"
          placeholder={t('placeholders.email')}
          type="email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">{t('password')}</Label>
        <Input
          id="login-password"
          placeholder={t('placeholders.password')}
          type="password"
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {t('submitLogin')}
      </Button>
    </form>
  )
}
