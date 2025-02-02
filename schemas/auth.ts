import * as z from 'zod'

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be atleast 8 characters')
  .max(32, 'Password can not exceed 32 characters')

export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .min(1, 'Email is required')
  .email('Invalid email')

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
