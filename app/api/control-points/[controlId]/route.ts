import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { controlId: string } }
) {
  try {
    if (!params.controlId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const control = await prismadb.controlPoints.findUnique({
      where: {
        id: params.controlId
      }
    })

    return NextResponse.json(control)
  } catch (error) {
    console.log('[CONTROL_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { controlId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.controlId) {
      return new NextResponse('Control id is required', { status: 400 })
    }

    const control = await prismadb.controlPoints.delete({
      where: {
        id: params.controlId
      }
    })

    return NextResponse.json(control)
  } catch (error) {
    console.log('[CONTROL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { controlId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, status, groups } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const control = await prisma.controlPoints.update({
      where: {
        id: params.controlId
      },
      data: {
        name,
        status,
        groups: {
          set: [],
          connect: groups.map((group: string) => ({ id: group }))
        }
      }
    })

    return NextResponse.json(control, { status: 200 })
  } catch (error) {
    console.log('[CONTROL_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
