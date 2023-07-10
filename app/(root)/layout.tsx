import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function SetupLayout() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  } else {
    redirect('/dashboard')
  }
}
