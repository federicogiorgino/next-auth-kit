import { AuthFormHeader } from '@/components/auth-form-header'
import { AuthFormWrapper } from '@/components/auth-form-wrapper'

import { ForgotPasswordForm } from '@/app/(auth)/forgot-password/_components/forgot-password-form'

function ForgotPasswordPage() {
  return (
    <div className="flex grow items-center justify-center p-4">
      <AuthFormWrapper>
        <AuthFormHeader
          description="Enter your email below to reset your password."
          title="Forgot Password"
        />
        <ForgotPasswordForm />
      </AuthFormWrapper>
    </div>
  )
}

export default ForgotPasswordPage
