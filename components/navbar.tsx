import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Icons } from '@/components/ui/icons'

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-background/70">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="select-none text-lg font-bold">
              tut<span className="text-primary">opia</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
export { Navbar }
