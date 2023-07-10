import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const PartTeamPage = async ({ params }: { params: { ptId: string } }) => {
  const partTeam = await prismadb.partTeam.findUnique({
    where: {
      id: params.ptId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ControlForm initialData={partTeam} />
      </div>
    </div>
  )
}

export default PartTeamPage
