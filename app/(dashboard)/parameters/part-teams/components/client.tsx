'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, PartTeamColumn } from './columns'

interface PartTeamClientProps {
  data: PartTeamColumn[]
}

export const PartTeamClient: React.FC<PartTeamClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Heading title="Failure Types" description="Manage failure types." />
        <Button onClick={() => router.push('/parameters/part-team/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
