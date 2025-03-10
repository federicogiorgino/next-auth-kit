import * as z from 'zod'

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be atleast 8 characters')
  .max(32, 'Password can not exceed 32 characters')

export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .min(1, 'Email is required')
  .email('Invalid email')

export const nameSchema = z
  .string({ required_error: 'Name is required' })
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters')

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })

export const onboardingSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  bio: z.string().max(160).optional(),
  location: z.string().max(100).optional(),
  githubUsername: z.string().max(39).optional(),
})
