'use client'

import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'

import { status } from '@/lib/data'

import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type VehicleColumn = {
  id: string
  name: string
  shortCode: string
  modelName: string
  shortVin: string
  status: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<VehicleColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    )
  },
  {
    accessorKey: 'modelName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model Name" />
    )
  },
  {
    accessorKey: 'shortCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Code" />
    )
  },
  {
    accessorKey: 'shortVin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short VIN" />
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
  // { accessorKey: 'createdAt', header: 'Created Date' },
  // { accessorKey: 'updatedAt', header: 'Updated Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
