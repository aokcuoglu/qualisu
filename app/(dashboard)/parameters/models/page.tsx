import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { ModelClient } from './components/client'
import { ModelColumn } from './components/columns'

const ModelPage = async () => {
  const models = await prismadb.model.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      group: true
    }
  })

  const formattedModels: ModelColumn[] = models.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    status: item.status,
    group: item.group.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <ModelClient data={formattedModels} />
      </div>
    </div>
  )
}

export default ModelPage
