import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import env from '@/schemas/env'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFromEmail() {
  return env.NODE_ENV === 'development'
    ? 'onboarding@resend.dev'
    : env.EMAIL_SENDER
}

export function getToEmail(to: string) {
  return env.NODE_ENV === 'development' ? 'delivered@resend.dev' : to
}
