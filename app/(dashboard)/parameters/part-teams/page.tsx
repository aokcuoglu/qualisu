import { format } from 'date-fns'
import prismadb from '@/lib/prisma'

import { PartTeamClient } from './components/client'
import { PartTeamColumn } from './components/columns'

const PartTeamPage = async () => {
  const partTeams = await prismadb.partTeam.findMany({
    orderBy: {
      code: 'desc'
    }
  })

  const formattedPartTeams: PartTeamColumn[] = partTeams.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    status: item.status,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <PartTeamClient data={formattedPartTeams} />
      </div>
    </div>
  )
}

export default PartTeamPage
