'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, FailureColumn } from './columns'

interface FailureClientProps {
  data: FailureColumn[]
}

export const FailureClient: React.FC<FailureClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Heading title="Failures" description="Manage failures." />
        <Button onClick={() => router.push('/parameters/failures/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
