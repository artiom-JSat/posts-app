import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password minimum 8 characters'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name minimum 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password minimum 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
