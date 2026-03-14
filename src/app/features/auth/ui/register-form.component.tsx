'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Label } from '@/shared/ui'
import { useAuthStore } from '@/shared/store/auth.store'
import { registerSchema, type RegisterFormValues } from '../auth.schema'

export function RegisterForm() {
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmit = (values: RegisterFormValues) => {
    login(values.email)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="reg-name">Name*</Label>
        <Input
          id="reg-name"
          placeholder="Enter your name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email*</Label>
        <Input
          id="reg-email"
          placeholder="Enter your email address"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password*</Label>
        <Input
          id="reg-password"
          placeholder="********"
          type="password"
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-confirm">Confirm password*</Label>
        <Input
          id="reg-confirm"
          placeholder="********"
          type="password"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'border-destructive' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  )
}
