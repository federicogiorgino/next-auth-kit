import { AuthFormWrapper } from '@/components/auth-form-wrapper'

import { ResetPasswordForm } from './_components/reset-password-form'

function ResetPasswordPage() {
  return (
    <div className="flex grow items-center justify-center p-4">
      <AuthFormWrapper>
        <ResetPasswordForm />
      </AuthFormWrapper>
    </div>
  )
}

export default ResetPasswordPage
