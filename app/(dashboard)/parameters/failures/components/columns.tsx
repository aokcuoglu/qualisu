'use client'

import Image from 'next/image'
import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'

import { status } from '@/lib/data'

import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type ModelColumn = {
  id: string
  name: string
  image: string
  group: string
  status: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<ModelColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    )
  },
  {
    accessorKey: 'group',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    )
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="relative w-8 h-8">
        <Image
          src={row.original.image}
          alt=""
          fill
          className="border-2 border-white object-cover rounded-full"
        />
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const label = status.find((label) => label.value === row.original.status)

      return (
        <div className="flex space-x-2">
          {label && (
            <Badge
              variant={label.label === 'Passive' ? 'destructive' : 'outline'}
            >
              {label.label}
            </Badge>
          )}
        </div>
      )
    }
  },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
