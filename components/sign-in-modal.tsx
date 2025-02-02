'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { SignInForm } from '@/app/(auth)/sign-in/_components/sign-in-form'

import { AuthFormFooter } from './auth-form-footer'
import { AuthFormHeader } from './auth-form-header'
import { AuthFormWrapper } from './auth-form-wrapper'
import { useModalStore } from '@/hooks/use-modal-store'

function SignInModal() {
  const { isOpen, closeModal } = useModalStore()
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal} defaultOpen={isOpen} modal>
      <DialogContent>
        <AuthFormWrapper>
          <AuthFormHeader
            title="Login"
            description="Sign in to your account to continue"
          />
          <SignInForm variant="modal" />
          <div className="text-center text-sm">
            Dont have an account?{' '}
            <span
              className="cursor-pointer font-bold text-primary underline"
              onClick={() => {
                closeModal()
                router.push('/sign-up')
              }}
            >
              Register
            </span>
          </div>
        </AuthFormWrapper>
      </DialogContent>
    </Dialog>
  )
}

export { SignInModal }
