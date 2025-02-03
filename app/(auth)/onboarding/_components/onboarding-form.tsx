'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { getErrorMessage } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { Textarea } from '@/components/ui/textarea'

import { onboardUser } from '@/actions/user'
import { useToast } from '@/hooks/use-toast'
import { onboardingSchema } from '@/schemas/auth'
import { OnboardingValues } from '@/types/auth'

function OnboardingForm() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: '',
    },
  })

  const mutation = useMutation({
    mutationFn: onboardUser,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Onboarding successful.',
      })
      router.refresh()
      form.reset()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: OnboardingValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center justify-between gap-1">
                <FormLabel>Bio</FormLabel>
                <span className="text-sm text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center justify-between gap-1">
                <FormLabel>Location</FormLabel>
                <span className="text-sm text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Input placeholder="San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUsername"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center justify-between gap-1">
                <FormLabel>Github</FormLabel>
                <span className="text-sm text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Input placeholder="github-username" {...field} />
              </FormControl>
              <FormDescription>
                Enter your GitHub username (without @).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          className="w-full"
          loading={mutation.isPending}
          disabled={!form.formState.isValid}
        >
          Continue
        </LoadingButton>{' '}
      </form>
    </Form>
  )
}

export { OnboardingForm }
