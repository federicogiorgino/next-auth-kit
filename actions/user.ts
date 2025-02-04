'use server'

import { headers } from 'next/headers'

import prisma from '@/lib/prisma'

import { auth } from '@/auth'
import { OnboardingValues } from '@/types/auth'

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session) {
    return { success: false, error: 'Cannot get current logged in user' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,

        onboarded: true,
      },
    })

    return { success: true, data: user }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Cannot get current logged in user' }
  }
}

export async function onboardUser(values: OnboardingValues) {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session) {
    return { success: false, error: 'Cannot get current logged in user' }
  }

  const user = await prisma.user.findUnique({
    where: { username: values.username },
  })

  if (user) {
    return { success: false, error: 'Username already exists' }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...values,
        onboarded: true,
      },
    })

    return { success: true, message: 'User onboarded successfully.' }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Error onboarding user' }
  }
}
