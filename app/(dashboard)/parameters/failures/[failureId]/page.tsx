import prismadb from '@/lib/prisma'

import { FailureForm } from './components/model-form'

const FailurePage = async ({ params }: { params: { failureId: string } }) => {
  const failure = await prismadb.failure.findUnique({
    where: {
      id: params.failureId
    }
  })

  const partGroups = await prismadb.partGroup.findMany({
    orderBy: {
      code: 'asc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FailureForm initialData={failure} partGroups={partGroups} />
      </div>
    </div>
  )
}

export default FailurePage
