import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  EMAIL_VERIFICATION_CALLBACK_URL: z.string().url(),
  EMAIL_SENDER: z.string().email(),
  RESEND_API_KEY: z.string(),
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('testing'),
      z.literal('production'),
    ])

    .default('development'),
})

const env = envSchema.parse(process.env)

export default env
