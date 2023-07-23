'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'
import { Plus, ShieldCheck } from 'lucide-react'

import { CalendarDateRangePicker } from '@/components/data-range-picker'
import { Button } from '@/components/ui/button'

const Heading = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-1">
          <ShieldCheck />
          <h2 className="text-2xl font-bold">Controls</h2>
        </div>
        <p className="text-muted-foreground">Create and check controls</p>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarDateRangePicker />
        <Button>Download</Button>
        <Button onClick={() => router.push('/controls/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
    </div>
  )
}

export default Heading
