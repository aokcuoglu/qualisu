import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { ControlColumn } from './components/columns'
import { ControlClient } from './components/client'

export default async function ControlsPage() {
  const controls = await prismadb.controls.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      vehicle: true,
      controlPoints: true
    }
  })

  const formattedControls: ControlColumn[] = controls.map((item) => ({
    id: item.id,
    vin: item.vehicle.shortVin.concat('', item.shortCode.slice(3, 9)),
    shortCode: item.shortCode,
    cPoint: item.controlPoints.name,
    status: item.status,
    vehicleName: item.vehicle.name,
    cUser: item.username,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))
  return <ControlClient data={formattedControls} />
}
