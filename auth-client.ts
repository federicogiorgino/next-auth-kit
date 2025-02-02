import { createAuthClient } from 'better-auth/react'

import env from '@/schemas/env'

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
})
