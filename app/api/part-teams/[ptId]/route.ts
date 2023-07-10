import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { failureId: string } }
) {
  try {
    if (!params.failureId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const failure = await prismadb.failure.findUnique({
      where: {
        id: params.failureId
      }
    })

    return NextResponse.json(failure)
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
      return new NextResponse('Control id is required', { status: 400 })
    }

    const failure = await prismadb.failure.delete({
      where: {
        id: params.failureId
      }
    })

    return NextResponse.json(failure)
  } catch (error) {
    console.log('[CONTROL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { failureId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, code, status, failureSourceId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const failure = await prisma.failure.update({
      where: {
        id: params.failureId
      },
      data: {
        name,
        code,
        status,
        failureSourceId
      }
    })

    return NextResponse.json(failure, { status: 200 })
  } catch (error) {
    console.log('[FAILURE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
