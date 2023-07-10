'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, SubModelColumn } from './columns'

interface SubModelClientProps {
  data: SubModelColumn[]
}

export const SubModelClient: React.FC<SubModelClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Vehicle Models"
          description="Manage vehicle sub models."
        />
        <Button onClick={() => router.push('/parameters/submodels/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
