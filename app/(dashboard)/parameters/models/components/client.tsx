'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { GroupColumn, columns } from './columns'

interface GroupClientProps {
  data: GroupColumn[]
}

export const GroupClient: React.FC<GroupClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Heading title="Vehicle Groups" description="Manage vehicle groups." />
        <Button onClick={() => router.push('/parameters/groups/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
