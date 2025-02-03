'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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

import { authClient } from '@/auth-client'
import { useToast } from '@/hooks/use-toast'
import { forgotPasswordSchema } from '@/schemas/auth'
import { ForgotPasswordValues } from '@/types/auth'

function ForgotPasswordForm() {
  const [pending, setPending] = useState(false)
  const { toast } = useToast()
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordValues) => {
    setPending(true)
    const { error } = await authClient.forgetPassword({
      email: data.email,
      redirectTo: '/reset-password',
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description:
          'If an account exists with this email, you will receive a password reset link.',
      })
    }
    setPending(false)
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
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
  )
}

export { ForgotPasswordForm }
