import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { VehicleClient } from './components/client'
import { VehicleColumn } from './components/columns'

export default async function VehiclesPage() {
  const vehicles = await prismadb.vehicle.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      model: true
    }
  })

  const formattedVehicles: VehicleColumn[] = vehicles.map((item) => ({
    id: item.id,
    name: item.name,
    shortCode: item.shortCode,
    shortVin: item.shortVin,
    status: item.status,
    modelName: item.model.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <VehicleClient data={formattedVehicles} />
      </div>
    </div>
  )
}
