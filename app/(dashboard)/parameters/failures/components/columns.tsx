'use client'

import { ColumnDef } from '@tanstack/table-core'
import { CellAction } from './cell-action'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type FailureColumn = {
  id: string
  code: string
  name: string
  partGroupName: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<FailureColumn>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    )
  },
  {
    accessorKey: 'partGroupName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Group" />
    )
  },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
