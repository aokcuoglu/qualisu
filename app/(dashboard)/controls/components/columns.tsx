'use client'

import { ColumnDef } from '@tanstack/table-core'

import { CellAction } from './cell-action'

import { cStatus, cPoint } from '@/lib/data'

import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'

export type ControlColumn = {
  id: string
  vin: string
  shortCode: string
  cPoint: string
  status: string
  vehicleName: string
  cUser: string
  createdAt: string
}

export const columns: ColumnDef<ControlColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'vin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
    cell: ({ row }) => {
      const label = cPoint.find((label) => label.label === row.original.cPoint)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('vin')}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'shortCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Code" />
    )
  },
  {
    accessorKey: 'vehicleName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Name" />
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const label = cStatus.find((label) => label.value === row.original.status)

      return (
        <div className="flex space-x-2">
          {label && (
            <Badge
              variant={label.label === 'Completed' ? 'destructive' : 'outline'}
            >
              {label.label}
            </Badge>
          )}
        </div>
      )
    }
  },
  { accessorKey: 'cUser', header: 'User' },
  { accessorKey: 'createdAt', header: 'Control Date' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
]
