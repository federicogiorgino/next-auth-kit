import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthFormHeader } from '@/components/auth-form-header'
import { AuthFormWrapper } from '@/components/auth-form-wrapper'

import { OnboardingForm } from '@/app/(auth)/onboarding/_components/onboarding-form'

import { getCurrentUser } from '@/actions/user'
import { auth } from '@/auth'

async function OnboardingPage() {
  const session = await auth.api.getSession({ headers: headers() })

  if (!session) {
    redirect('/sign-in')
  }
  const { data } = await getCurrentUser()

  if (data && data.onboarded) {
    redirect('/')
  }

  return (
    <div className="flex grow items-center justify-center p-4">
      <AuthFormWrapper>
        <AuthFormHeader
          description="Complete your profile to get started."
          title="Onboarding"
        />
        <OnboardingForm />
      </AuthFormWrapper>
    </div>
  )
}

export default OnboardingPage
