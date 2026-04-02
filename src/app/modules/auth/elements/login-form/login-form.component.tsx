'use client'

import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Spinner } from '@/pkg/theme/ui/spinner'
import { ControlledFieldComponent } from '@/shared/components/controlled-field'
import { useLoginAction } from '@/shared/store'

import { loginFields } from '../../auth.constant'
import { getLoginSchema, type ILoginFormValues } from '../../auth.schema'

// interface
interface IProps {}

// component
const LoginFormComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Auth')
  const router = useRouter()
  const loginUser = useLoginAction()

  const [isRedirecting, setIsRedirecting] = useState(false)

  const methods = useForm<ILoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, setError } = methods

  const onLoginSubmit = (values: ILoginFormValues) => {
    const result = loginUser({
      email: values.email,
      password: values.password,
    })

    if (result.success) {
      setIsRedirecting(true)
      router.push('/posts')
    } else {
      const errorMessage = t(`errors.${result.message}`)

      setError('email', { type: 'manual', message: errorMessage })
      setError('password', { type: 'manual', message: errorMessage })

      setIsRedirecting(false)
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

        <Button type='submit' className='w-full' disabled={isRedirecting}>
          {t('submitLogin')}
          {isRedirecting && <Spinner />}
        </Button>
      </form>
    </FormProvider>
  )
}

export default LoginFormComponent
