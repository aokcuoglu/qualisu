import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    if (!params.groupId) {
      return new NextResponse('Group id is required', { status: 400 })
    }

    const group = await prismadb.group.findUnique({
      where: {
        id: params.groupId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[GROUP_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }
    if (!params.groupId) {
      return new NextResponse('Group id is required', { status: 400 })
    }

    const group = await prismadb.group.delete({
      where: {
        id: params.groupId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[GROUP_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }
    if (!name) {
      return new NextResponse('Group name is required', { status: 400 })
    }

    const group = await prismadb.group.update({
      where: {
        id: params.groupId
      },
      data: {
        name
      }
    })
    return NextResponse.json(group, { status: 200 })
  } catch (error) {
    console.log('[GROUP_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
