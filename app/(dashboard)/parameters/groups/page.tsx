import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { GroupsClient } from './components/client'
import { GroupsColumn } from './components/columns'

const GroupsPage = async () => {
  const groups = await prismadb.group.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedGroups: GroupsColumn[] = groups.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <GroupsClient data={formattedGroups} />
      </div>
    </div>
  )
}

export default GroupsPage
