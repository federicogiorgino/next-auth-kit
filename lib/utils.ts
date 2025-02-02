import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFromEmail() {
  return process.env.NODE_ENV === 'development'
    ? 'onboarding@resend.dev'
    : process.env.EMAIL_SENDER
}

export function getToEmail(to: string) {
  return process.env.NODE_ENV === 'development' ? 'delivered@resend.dev' : to
}
