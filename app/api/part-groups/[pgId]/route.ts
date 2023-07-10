import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { pgId: string } }
) {
  try {
    if (!params.pgId) {
      return new NextResponse('part group id is required', { status: 400 })
    }

    const partGroup = await prismadb.partGroup.findUnique({
      where: {
        id: params.pgId
      }
    })

    return NextResponse.json(partGroup)
  } catch (error) {
    console.log('[PGROUP_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { pgId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.pgId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const partGroup = await prismadb.partGroup.delete({
      where: {
        id: params.pgId
      }
    })

    return NextResponse.json(partGroup)
  } catch (error) {
    console.log('[PGROUP_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { pgId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { code, name, status, partTeamSlug } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const fSource = await prisma.partGroup.update({
      where: {
        id: params.pgId
      },
      data: {
        name,
        status,
        code,
        partTeamSlug
      }
    })

    return NextResponse.json(fSource, { status: 200 })
  } catch (error) {
    console.log('[PGROUP_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
