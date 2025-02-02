import { BetterAuthOptions, betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import prisma from '@/lib/prisma'

import { createResetPasswordEmail } from '@/app/(auth)/reset-password/_components/reset-password-email'

import { sendEmail } from '@/actions/email'
import env from '@/schemas/env'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${env.EMAIL_VERIFICATION_CALLBACK_URL}`

      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        template: createResetPasswordEmail({
          username: user.name,
          confirmationLink: verificationUrl,
        }),
      })
    },
  },
} satisfies BetterAuthOptions)
