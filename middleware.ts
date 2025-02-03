import { betterFetch } from '@better-fetch/fetch'
import { type NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/actions/user'
import type { Session } from '@/auth'

const authRoutes = ['/sign-in', '/sign-up']
const passwordRoutes = ['/reset-password', '/forgot-password']
const adminRoutes = ['/admin']
const restrictedRoutes = ['/restricted']

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const isAuthRoute = authRoutes.includes(pathName)
  const isPasswordRoute = passwordRoutes.includes(pathName)
  const isAdminRoute = adminRoutes.includes(pathName)
  const isRestrictedRoute = restrictedRoutes.includes(pathName)

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get('cookie') || '',
      },
    }
  )

  //   const { data: user } = await getCurrentUser()

  // 1. If user is logged in and tries to access auth routes, redirect to home
  if (session && (isAuthRoute || isPasswordRoute)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. Allow access to all routes when not logged in, except restricted ones
  if (!session) {
    if (isRestrictedRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
  }

  // 3. If user is logged in and is not onboarded, redirect to onboarding
  //   if (session && !user?.onboarded) {
  //     return NextResponse.redirect(new URL('/onboarding', request.url))
  //   }

  // Additional check for admin routes (keeping existing functionality)
  if (isAdminRoute && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
