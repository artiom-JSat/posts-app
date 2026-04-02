import { type ILoginFormValues, type IRegisterFormValues } from './auth.schema'

// interface
interface IAuthField<T> {
  id: string
  name: keyof T
  labelKey: string
  placeholderKey: string
  type?: string
}

type IRegisterField = IAuthField<IRegisterFormValues>
type ILoginField = IAuthField<ILoginFormValues>

// constant
export const registerFields: IRegisterField[] = [
  {
    id: 'reg-name',
    name: 'name',
    labelKey: 'name',
    placeholderKey: 'placeholders.name',
    type: 'text',
  },
  {
    id: 'reg-email',
    name: 'email',
    labelKey: 'email',
    placeholderKey: 'placeholders.email',
    type: 'email',
  },
  {
    id: 'reg-password',
    name: 'password',
    labelKey: 'password',
    placeholderKey: 'placeholders.password',
    type: 'password',
  },
  {
    id: 'reg-confirm',
    name: 'confirmPassword',
    labelKey: 'confirmPassword',
    placeholderKey: 'placeholders.password',
    type: 'password',
  },
] as const

export const loginFields: ILoginField[] = [
  {
    id: 'login-email',
    name: 'email',
    labelKey: 'email',
    placeholderKey: 'placeholders.email',
    type: 'email',
  },
  {
    id: 'login-password',
    name: 'password',
    labelKey: 'password',
    placeholderKey: 'placeholders.password',
    type: 'password',
  },
] as const
