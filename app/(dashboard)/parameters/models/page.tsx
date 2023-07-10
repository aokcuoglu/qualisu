import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { GroupClient } from './components/client'
import { GroupColumn } from './components/columns'

const GroupPage = async () => {
  const groups = await prismadb.vehicleType.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  const formattedGroups: GroupColumn[] = groups.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <GroupClient data={formattedGroups} />
      </div>
    </div>
  )
}

export default GroupPage
