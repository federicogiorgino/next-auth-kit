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

export const getErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'An unexpected error occurred'
  }

  return message
}
