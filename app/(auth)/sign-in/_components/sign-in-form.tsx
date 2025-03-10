'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorContext } from 'better-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'

import { authClient } from '@/auth-client'
import { useModalStore } from '@/hooks/use-modal-store'
import { useToast } from '@/hooks/use-toast'
import { signInSchema } from '@/schemas/auth'
import { SignInValues } from '@/types/auth'

type SignInFormProps = {
  variant?: 'default' | 'modal'
}

function SignInForm({ variant = 'default' }: SignInFormProps) {
  const { closeModal } = useModalStore()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const router = useRouter()
  const [pending, setPending] = useState<boolean>(false)
  const [pendingGithub, setPendingGithub] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)
  const { toast } = useToast()

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignInWithGithub = async () => {
    await authClient.signIn.social(
      {
        provider: 'github',
      },
      {
        onRequest: () => {
          setPendingGithub(true)
        },
        onSuccess: async () => {
          if (variant === 'modal') {
            closeModal()
            router.refresh()
          } else {
            router.push('/')
            router.refresh()
          }
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          })
        },
      }
    )
    setPendingGithub(false)
  }
  const onSubmit = async (values: SignInValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPending(true)
        },
        onSuccess: async () => {
          if (variant === 'modal') {
            closeModal()
            router.refresh()
          } else {
            router.push('/')
            router.refresh()
          }
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          })
        },
      }
    )
    setPending(false)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <div className="text-right text-sm">
                    <p
                      className="cursor-pointer font-medium text-primary underline"
                      onClick={() => {
                        if ((variant = 'modal')) {
                          closeModal()
                          router.push('/forgot-password')
                        } else {
                          router.push('/forgot-password')
                        }
                      }}
                    >
                      Forgot password?
                    </p>
                  </div>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pe-9"
                      placeholder="*********"
                      type={isVisible ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
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
            Login
          </LoadingButton>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <LoadingButton
            variant="outline"
            className="flex w-full items-center gap-2"
            onClick={handleSignInWithGithub}
            loading={pendingGithub}
          >
            <Icons.github className="h-5 w-5" />
            Login with GitHub
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export { SignInForm }
