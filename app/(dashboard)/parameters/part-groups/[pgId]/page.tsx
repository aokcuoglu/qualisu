import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const PartGroupPage = async ({ params }: { params: { pgId: string } }) => {
  const partGroup = await prismadb.partGroup.findUnique({
    where: {
      id: params.pgId
    }
  })

  const partTeams = await prismadb.partTeam.findMany({
    orderBy: {
      code: 'asc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ControlForm initialData={partGroup} partTeams={partTeams} />
      </div>
    </div>
  )
}

export default PartGroupPage
