import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { failureId: string } }
) {
  try {
    if (!params.failureId) {
      return new NextResponse('Failure id is required', { status: 400 })
    }

    const model = await prismadb.failure.findUnique({
      where: {
        id: params.failureId
      }
    })

    return NextResponse.json(model)
  } catch (error) {
    console.log('[FAILURE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { failureId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.failureId) {
      return new NextResponse('Failure id is required', { status: 400 })
    }

    const group = await prismadb.failure.delete({
      where: {
        id: params.failureId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[FAILURE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { failureId: string } }
) {
  try {
    const body = await req.json()
    const { code, name, partGroupId } = body

    const model = await prismadb.failure.update({
      where: {
        id: params.failureId
      },
      data: {
        code,
        name,
        partGroupId
      }
    })
    return NextResponse.json(model, { status: 200 })
  } catch (error) {
    console.log('[FAILURE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
