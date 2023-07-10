import { auth, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { MainNav } from '@/app/components/main-nav'
import { ThemeToggle } from '@/app/components/theme-toggle'

const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="border-b">
      <div className="flex h-12 items-center">
        <MainNav />
        <div className="ml-auto flex items-center">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
