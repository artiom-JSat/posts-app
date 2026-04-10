'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { authClient } from '@/pkg/auth/client'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Spinner } from '@/pkg/theme/ui/spinner'
import { ControlledFieldComponent } from '@/shared/components/controlled-field'

import { registerFields } from '../../auth.constant'
import { getRegisterSchema, type IRegisterFormValues } from '../../auth.schema'

// interface
interface IProps {}

// component
const RegisterFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)

  const methods = useForm<IRegisterFormValues>({
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

  const onRegisterSubmit = async (data: IRegisterFormValues) => {
    const { name, email, password } = data

    setIsPending(true)

    const { data: res, error } = await authClient.signUp.email({ name, email, password })

    if (res) {
      router.replace('/posts')
    } else {
      const errorMessage = t(`errors.${error}`)

      setError('email', { type: 'manual', message: errorMessage })
      setError('password', { type: 'manual', message: errorMessage })
      setError('confirmPassword', { type: 'manual', message: errorMessage })

      setIsPending(false)
    }
  }

  // return
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onRegisterSubmit)} className='space-y-4 p-4'>
        {registerFields.map((field) => (
          <ControlledFieldComponent
            key={field.id}
            id={field.id}
            name={field.name}
            label={t(field.labelKey)}
            placeholder={t(field.placeholderKey)}
            type={field.type}
          />
        ))}

        <Button type='submit' className='w-full' disabled={isPending}>
          {t('submitRegister')}
          {isPending && <Spinner />}
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegisterFormComponent
