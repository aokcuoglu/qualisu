import prismadb from '@/lib/prisma'

import { GroupForm } from './components/group-form'

const GroupPage = async ({ params }: { params: { groupId: string } }) => {
  const group = await prismadb.vehicleType.findUnique({
    where: {
      id: params.groupId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GroupForm initialData={group} />
      </div>
    </div>
  )
}

export default GroupPage
