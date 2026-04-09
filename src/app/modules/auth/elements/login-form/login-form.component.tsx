'use client'

import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { authClient } from '@/pkg/auth/client'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Spinner } from '@/pkg/theme/ui/spinner'
import { ControlledFieldComponent } from '@/shared/components/controlled-field'

import { loginFields } from '../../auth.constant'
import { getLoginSchema, type ILoginFormValues } from '../../auth.schema'

// interface
interface IProps {}

// component
const LoginFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)

  const methods = useForm<ILoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, setError } = methods

  const onLoginSubmit = async (data: ILoginFormValues) => {
    const { email, password } = data

    setIsPending(true)

    const { data: res, error } = await authClient.signIn.email({ email, password })

    if (res) {
      router.push('/posts')
    } else {
      const errorMessage = t(`errors.${error}`)

      setError('email', { type: 'manual', message: errorMessage })
      setError('password', { type: 'manual', message: errorMessage })

      setIsPending(false)
    }
  }

  // return
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onLoginSubmit)} className='space-y-4 p-4'>
        {loginFields.map((field) => (
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
          {t('submitLogin')}
          {isPending && <Spinner />}
        </Button>
      </form>
    </FormProvider>
  )
}

export default LoginFormComponent
