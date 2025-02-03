import { redirect } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Navbar } from '@/components/navbar'

import { getCurrentUser } from '@/actions/user'

async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { success, data } = await getCurrentUser()

  if (data && !data.onboarded) {
    redirect('/onboarding')
  }

  return (
    <>
      <NuqsAdapter>
        <Navbar />
        {children}
      </NuqsAdapter>
    </>
  )
}

export default AppLayout
