import { z } from 'zod'

import { signInSchema } from '@/schemas/auth'

export type SignInValues = z.infer<typeof signInSchema>
