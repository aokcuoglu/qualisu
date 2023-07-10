import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { fSourceId: string } }
) {
  try {
    if (!params.fSourceId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const fSource = await prismadb.failureSource.findUnique({
      where: {
        id: params.fSourceId
      }
    })

    return NextResponse.json(fSource)
  } catch (error) {
    console.log('[FSOURCE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fSourceId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.fSourceId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const fSource = await prismadb.failureSource.delete({
      where: {
        id: params.fSourceId
      }
    })

    return NextResponse.json(fSource)
  } catch (error) {
    console.log('[CONTROL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { fSourceId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, status } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const fSource = await prisma.failureSource.update({
      where: {
        id: params.fSourceId
      },
      data: {
        name,
        status
      }
    })

    return NextResponse.json(fSource, { status: 200 })
  } catch (error) {
    console.log('[FSOURCE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
