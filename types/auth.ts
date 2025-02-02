import { z } from 'zod'

import { signInSchema, signUpSchema } from '@/schemas/auth'

export type SignUpValues = z.infer<typeof signUpSchema>

export type SignInValues = z.infer<typeof signInSchema>
