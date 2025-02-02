'use server'

import { Resend } from 'resend'

import { getFromEmail, getToEmail } from '@/lib/utils'

import { SendEmailParams } from '@/types/mail'

export async function sendEmail({ to, subject, template }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined')
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const fromEmail = getFromEmail() as string
    const toEmail = getToEmail(to)

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      react: template,
    })

    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    return { success: false, message: 'Failed to send email' }
  }
}
