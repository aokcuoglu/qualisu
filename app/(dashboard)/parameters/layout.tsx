import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'
import { FolderCog } from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Groups',
    href: '/parameters/groups'
  },
  {
    title: 'Models',
    href: '/parameters/models'
  },
  {
    title: 'Vehicles',
    href: '/parameters/vehicles'
  },
  {
    title: 'Controls',
    href: '/parameters/control-points'
  },
  {
    title: 'Part Team',
    href: '/parameters/part-teams'
  },
  {
    title: 'Part Group',
    href: '/parameters/part-groups'
  },
  {
    title: 'Failures',
    href: '/parameters/failures'
  },
  {
    title: 'Customers',
    href: '/parameters/customers'
  },
  {
    title: 'DPU',
    href: '/parameters/dpu'
  }
]

interface ParametersLayoutProps {
  children: React.ReactNode
}

export default function ParametersLayout({ children }: ParametersLayoutProps) {
  return (
    <div className="hidden h-full flex-1 flex-colspace-y-8 p-8 md:block">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-1">
          <FolderCog />
          <h2 className="text-2xl font-bold">Parameters</h2>
        </div>
        <p className="text-muted-foreground">Manage parameters</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </div>
  )
}
