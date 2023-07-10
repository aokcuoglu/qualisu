import { Separator } from '@/components/ui/separator'
import { CalendarDateRangePicker } from '@/app/(dashboard)/dashboard/components/data-range-picker'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface DashboardProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </div>
  )
}
