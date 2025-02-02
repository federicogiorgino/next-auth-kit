import { z } from 'zod'

import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from '@/schemas/auth'

export type SignUpValues = z.infer<typeof signUpSchema>

export type SignInValues = z.infer<typeof signInSchema>

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
