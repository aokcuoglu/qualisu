'use client'

import Image from 'next/image'
import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type GroupsColumn = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<GroupsColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    )
  },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
