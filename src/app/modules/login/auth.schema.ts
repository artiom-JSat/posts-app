import * as z from 'zod'

// type
type TFunction = (key: string) => string

// schema
export const getLoginSchema = (t: TFunction) =>
  z.object({
    email: z.string().min(1, t('errors.emailRequired')).email(t('errors.invalidEmail')),
    password: z.string().min(8, t('errors.shortPassword')),
  })

// schema
export const getRegisterSchema = (t: TFunction) =>
  getLoginSchema(t)
    .extend({
      name: z.string().min(2, t('errors.nameRequired')),
      confirmPassword: z.string().min(1, t('errors.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.match'),
      path: ['confirmPassword'],
    })

// interface
export interface LoginFormValues extends z.infer<ReturnType<typeof getLoginSchema>> {}
export interface RegisterFormValues extends z.infer<ReturnType<typeof getRegisterSchema>> {}
