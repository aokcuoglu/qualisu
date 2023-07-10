import prismadb from '@/lib/prisma'

import { ModelForm } from './components/model-form'

const ModelPage = async ({ params }: { params: { modelId: string } }) => {
  const model = await prismadb.model.findUnique({
    where: {
      id: params.modelId
    }
  })

  const groups = await prismadb.group.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ModelForm initialData={model} groups={groups} />
      </div>
    </div>
  )
}

export default ModelPage
