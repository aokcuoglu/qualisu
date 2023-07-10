import { auth, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'

export async function Navbar() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div
      className="supports-backdrop-blur:bg-background/60
      sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur"
    >
      <div className="px-10 flex h-14 items-center">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
