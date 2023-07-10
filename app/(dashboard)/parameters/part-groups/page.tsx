import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { FailureClient } from './components/client'
import { FailureSourcesColumn } from './components/columns'

const FSourcesPage = async () => {
  const fsources = await prismadb.failureSource.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const formattedModels: FailureSourcesColumn[] = fsources.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <FailureClient data={formattedModels} />
      </div>
    </div>
  )
}

export default FSourcesPage
