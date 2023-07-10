import prismadb from '@/lib/prisma'

import { ControlForm } from './components/control-form'

const GroupPage = async ({ params }: { params: { controlId: string } }) => {
  const control = await prismadb.control.findUnique({
    where: {
      id: params.controlId
    },
    include: {
      groups: true
    }
  })

  const groups = await prismadb.group.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ControlForm initialData={control} groups={groups} />
      </div>
    </div>
  )
}

export default GroupPage
