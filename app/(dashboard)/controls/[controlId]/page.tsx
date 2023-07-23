import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const VehiclePage = async ({ params }: { params: { controlId: string } }) => {
  const control = await prismadb.controls.findUnique({
    where: {
      id: params.controlId
    }
  })

  const cPoints = await prismadb.controlPoints.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="flex-1 space-y-4 pt-2 px-4">
      <ControlForm initialData={control} cPoints={cPoints} />
    </div>
  )
}

export default VehiclePage
