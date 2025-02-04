import { headers } from 'next/headers'
import Link from 'next/link'

import { SignInModalButton } from '@/components/sign-in-modal-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Icons } from '@/components/ui/icons'
import { UserDropdown } from '@/components/user-dropdown'

import { auth } from '@/auth'

async function Navbar() {
  const session = await auth.api.getSession({ headers: headers() })
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-7 w-7 text-primary" />
            <span className="select-none text-lg font-bold">
              NEXT<span className="text-primary">AUTH</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <>
                <UserDropdown
                  user={session.user}
                  isAdmin={session.user.role === 'admin'}
                />
              </>
            ) : (
              <SignInModalButton />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export { Navbar }
