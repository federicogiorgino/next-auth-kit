import { AuthFormFooter } from '@/components/auth-form-footer'
import { AuthFormHeader } from '@/components/auth-form-header'

import { SignInForm } from '@/app/(auth)/sign-in/_components/sign-in-form'

function SignInPage() {
  return (
    <div className="flex grow items-center justify-center p-4">
      <div className="flex flex-col gap-6">
        <AuthFormHeader
          title="Login"
          description="Enter your credentials below to login to your account."
        />

        <SignInForm />

        <AuthFormFooter
          link="/sign-up"
          linkText="Register"
          text="Don't have an account"
        />
      </div>
    </div>
  )
}

export default SignInPage
