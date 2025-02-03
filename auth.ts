import { BetterAuthOptions, betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import prisma from '@/lib/prisma'

import { createVerificationMail } from './app/(auth)/sign-up/_components/verification-email'
import { sendEmail } from '@/actions/email'

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
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`

      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        template: createVerificationMail({
          username: user.name,
          confirmationLink: verificationUrl,
        }),
      })
    },
  },
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session
