import prismadb from '@/lib/prisma'

import { SubModelForm } from './components/sub-model-form'

const SubModelPage = async ({ params }: { params: { subModelId: string } }) => {
  const submodel = await prismadb.vehicleSubModel.findUnique({
    where: {
      id: params.subModelId
    }
  })

  const models = await prismadb.vehicleModel.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubModelForm initialData={submodel} models={models} />
      </div>
    </div>
  )
}

export default SubModelPage
