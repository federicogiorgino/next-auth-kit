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

export function getInitials(fullName: string): string {
  const nameParts = fullName.split(' ')

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials
}
