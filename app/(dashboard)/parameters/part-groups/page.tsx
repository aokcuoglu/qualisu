import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { PartGroupClient } from './components/client'
import { PartGroupsColumn } from './components/columns'

const PartGroupsPage = async () => {
  const partGroups = await prismadb.partGroup.findMany({
    orderBy: {
      code: 'asc'
    },
    include: {
      partTeam: true
    }
  })

  const formattedModels: PartGroupsColumn[] = partGroups.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    status: item.status,
    partTeam: item.partTeam.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <PartGroupClient data={formattedModels} />
      </div>
    </div>
  )
}

export default PartGroupsPage
