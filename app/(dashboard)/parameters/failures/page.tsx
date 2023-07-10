import { format } from 'date-fns'

import prismadb from '@/lib/prisma'

import { FailureClient } from './components/client'
import { FailureColumn } from './components/columns'

const FailuresPage = async () => {
  const failures = await prismadb.failure.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      partGroup: true
    }
  })

  const formattedFailures: FailureColumn[] = failures.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    partGroupName: item.partGroup.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
  }))
  return (
    <div className="flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex">
        <FailureClient data={formattedFailures} />
      </div>
    </div>
  )
}

export default FailuresPage
