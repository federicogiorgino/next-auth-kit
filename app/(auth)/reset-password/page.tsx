import { Suspense } from 'react'

import { AuthFormWrapper } from '@/components/auth-form-wrapper'

import { ResetPasswordForm } from '@/app/(auth)/reset-password/_components/reset-password-form'

function ResetPasswordPage() {
  return (
    <div className="flex grow items-center justify-center p-4">
      <AuthFormWrapper>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </AuthFormWrapper>
    </div>
  )
}

export default ResetPasswordPage
