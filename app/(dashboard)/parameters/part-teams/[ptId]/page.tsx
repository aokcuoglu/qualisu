import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const GroupPage = async ({ params }: { params: { failureId: string } }) => {
  const control = await prismadb.failure.findUnique({
    where: {
      id: params.failureId
    }
  })

  const fSources = await prismadb.failureSource.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ControlForm initialData={control} fSources={fSources} />
      </div>
    </div>
  )
}

export default GroupPage
