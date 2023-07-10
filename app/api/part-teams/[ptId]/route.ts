import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { ptId: string } }
) {
  try {
    if (!params.ptId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const failure = await prismadb.partTeam.findUnique({
      where: {
        id: params.ptId
      }
    })

    return NextResponse.json(failure)
  } catch (error) {
    console.log('[PTEAM_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ptId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.ptId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const failure = await prismadb.partTeam.delete({
      where: {
        id: params.ptId
      }
    })

    return NextResponse.json(failure)
  } catch (error) {
    console.log('[PTTEAM_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { ptId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, code, status, failureSourceId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const failure = await prisma.partTeam.update({
      where: {
        id: params.ptId
      },
      data: {
        name,
        code,
        status
      }
    })

    return NextResponse.json(failure, { status: 200 })
  } catch (error) {
    console.log('[PTEAM_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
