'use client'

import { Button } from '@/components/ui/button'

import { useModalStore } from '@/hooks/use-modal-store'

function SignInModalButton() {
  const { openModal } = useModalStore()
  return <Button onClick={openModal}>Login</Button>
}
export { SignInModalButton }
