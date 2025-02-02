'use server'

import { resend } from '@/lib/resend'
import { getFromEmail, getToEmail } from '@/lib/utils'

import { SendEmailParams } from '@/types/mail'

export async function sendEmail({ to, subject, template }: SendEmailParams) {
  try {
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
