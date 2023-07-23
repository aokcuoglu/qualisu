import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { ControlClient } from './components/client'
import { ControlColumn } from './components/columns'

const ControlPage = async () => {
  const controls = await prismadb.controlPoints.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      groups: true
    }
  })

  const formattedModels: ControlColumn[] = controls.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    groupName: item.groups.map((group) => group.name),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <ControlClient data={formattedModels} />
      </div>
    </div>
  )
}

export default ControlPage
