import { BetterAuthOptions, betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins/admin'

import prisma from '@/lib/prisma'

import { createResetPasswordEmail } from '@/app/(auth)/reset-password/_components/reset-password-email'
import { createVerificationMail } from '@/app/(auth)/sign-up/_components/verification-email'

import { sendEmail } from '@/actions/email'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 10,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        template: createResetPasswordEmail({
          username: user.name,
          confirmationLink: url,
        }),
      })
    },
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
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [admin()],
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session
