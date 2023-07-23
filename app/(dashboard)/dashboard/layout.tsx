import * as React from 'react'

import { Button } from '@/components/ui/button'
import { CalendarDateRangePicker } from '@/components/data-range-picker'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'
import { LineChart } from 'lucide-react'

interface DashboardProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className="hidden h-full flex-1 flex-colspace-y-8 p-8 md:block">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-1">
            <LineChart />
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <p className="text-muted-foreground">Follow everything</p>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </div>
  )
}
