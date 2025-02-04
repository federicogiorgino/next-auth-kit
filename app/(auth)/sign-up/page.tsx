import { AuthFormFooter } from '@/components/auth-form-footer'
import { AuthFormHeader } from '@/components/auth-form-header'
import { AuthFormWrapper } from '@/components/auth-form-wrapper'

import { SignUpForm } from '@/app/(auth)/sign-up/_components/sign-up-form'

function SignUpPage() {
  return (
    <div className="flex grow items-center justify-center p-4">
      <AuthFormWrapper>
        <AuthFormHeader
          title="Register"
          description="Create an account to get started."
        />
        <SignUpForm />
        <AuthFormFooter
          link="/sign-in"
          linkText="Login"
          text="Already have an account?"
        />
      </AuthFormWrapper>
    </div>
  )
}

export default SignUpPage
