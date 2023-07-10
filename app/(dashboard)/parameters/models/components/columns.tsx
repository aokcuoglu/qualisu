'use client'

import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'
import Image from 'next/image'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type GroupColumn = {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<GroupColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    )
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt=""
        width="30"
        height="30"
        className="rounded-full"
      />
    )
  },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
