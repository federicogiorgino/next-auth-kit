'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthFormHeader } from '@/components/auth-form-header'
import { buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'

import { resetPasswordSchema } from '@/schemas/auth'
import { ResetPasswordValues } from '@/types/auth'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [pending, setPending] = useState(false)

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordValues) => {}

  if (error === 'INVALID_TOKEN') {
    return (
      <>
        <div className="text-center">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="mb-4 text-2xl font-bold">Invalid or Expired Link</h1>
        </div>
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            The password reset link you clicked is invalid or has expired.
          </p>
          <p className="text-sm text-muted-foreground">
            Please request a new link to reset your password.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/forgot-password"
            className={buttonVariants({
              variant: 'default',
            })}
          >
            Request Password Reset
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: 'outline',
            })}
          >
            Return to Login
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <AuthFormHeader
        description="Enter your new password below."
        title="Reset Password"
      />
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={'*************'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={'*************'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={pending}
              disabled={!form.formState.isValid}
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  )
}

export { ResetPasswordForm }
