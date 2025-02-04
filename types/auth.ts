import { z } from 'zod'

import {
  forgotPasswordSchema,
  onboardingSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from '@/schemas/auth'

export type SignUpValues = z.infer<typeof signUpSchema>

export type SignInValues = z.infer<typeof signInSchema>

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export type OnboardingValues = z.infer<typeof onboardingSchema>
