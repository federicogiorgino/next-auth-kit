import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

async function EmailVerifiedPage() {
  return (
    <div className="flex grow flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold text-primary">Email Verified!</h1>
      <p className="mb-4 text-muted-foreground">
        Your email has been successfully verified.
      </p>
      <Link
        href="/"
        className={buttonVariants({
          variant: 'default',
        })}
      >
        Go to home
      </Link>
    </div>
  )
}

export default EmailVerifiedPage
