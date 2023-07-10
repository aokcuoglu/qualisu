'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, ControlColumn } from './columns'

interface ControlClientProps {
  data: ControlColumn[]
}

export const ControlClient: React.FC<ControlClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Heading title="Control Points" description="Manage control points." />
        <Button onClick={() => router.push('/parameters/controls/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
