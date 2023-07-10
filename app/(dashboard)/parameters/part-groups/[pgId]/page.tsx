import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const FailureSourcePage = async ({
  params
}: {
  params: { fSourceId: string }
}) => {
  const fSources = await prismadb.failureSource.findUnique({
    where: {
      id: params.fSourceId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ControlForm initialData={fSources} />
      </div>
    </div>
  )
}

export default FailureSourcePage
