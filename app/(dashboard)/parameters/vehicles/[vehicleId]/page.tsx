import prismadb from '@/lib/prisma'

import { SubModelForm } from './components/sub-model-form'

const VehiclePage = async ({ params }: { params: { vehicleId: string } }) => {
  const vehicle = await prismadb.vehicle.findUnique({
    where: {
      id: params.vehicleId
    }
  })

  const models = await prismadb.model.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubModelForm initialData={vehicle} models={models} />
      </div>
    </div>
  )
}

export default VehiclePage
