'use client'

import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'

export type GroupColumn = {
  id: number
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<GroupColumn>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
