import { Resend } from 'resend'

import env from '@/schemas/env'

export const resend = new Resend(env.RESEND_API_KEY)
