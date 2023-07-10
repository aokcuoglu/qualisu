import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { SubModelClient } from './components/client'
import { SubModelColumn } from './components/columns'

const SubModelPage = async () => {
  const submodels = await prismadb.vehicleSubModel.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      VehicleModel: true
    }
  })

  const formattedModels: SubModelColumn[] = submodels.map((item) => ({
    id: item.id,
    name: item.name,
    shortCode: item.shortCode,
    shortVin: item.shortVin,
    status: item.status,
    modelName: item.VehicleModel.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <SubModelClient data={formattedModels} />
      </div>
    </div>
  )
}

export default SubModelPage
