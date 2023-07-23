'use client'

import * as React from 'react'

import { DataTable } from '@/components/ui/data-table'

import { columns, ControlColumn } from './columns'

interface ControlClientProps {
  data: ControlColumn[]
}

export const ControlClient: React.FC<ControlClientProps> = ({ data }) => {
  return <DataTable searchKey="vin" columns={columns} data={data} />
}
