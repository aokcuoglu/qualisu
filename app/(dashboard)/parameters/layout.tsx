import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nax'

const sidebarNavItems = [
  {
    title: 'Groups',
    href: '/dashboard/parameters'
  },
  {
    title: 'Models',
    href: '/examples/forms/account'
  },
  {
    title: 'Sub Models',
    href: '/examples/forms/appearance'
  },
  {
    title: 'Control Points',
    href: '/examples/forms/notifications'
  },
  {
    title: 'DPU Targets',
    href: '/examples/forms/display'
  }
]

interface ParametersLayoutProps {
  children: React.ReactNode
}

export default function ParametersLayout({ children }: ParametersLayoutProps) {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
        <p className="text-muted-foreground">Manage your parameters.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  )
}
