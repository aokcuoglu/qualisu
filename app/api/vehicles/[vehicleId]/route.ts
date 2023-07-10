import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { subModelId: string } }
) {
  try {
    if (!params.subModelId) {
      return new NextResponse('Submodel id is required', { status: 400 })
    }

    const submodel = await prismadb.vehicleSubModel.findUnique({
      where: {
        id: params.subModelId
      }
    })

    return NextResponse.json(submodel)
  } catch (error) {
    console.log('[SUBMODEL_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subModelId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.subModelId) {
      return new NextResponse('Submodel id is required', { status: 400 })
    }

    const submodel = await prismadb.vehicleSubModel.delete({
      where: {
        id: params.subModelId
      }
    })

    return NextResponse.json(submodel)
  } catch (error) {
    console.log('[SUBMODEL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subModelId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, shortCode, shortVin, status, vehicleModelId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }
    if (!name) {
      return new NextResponse('Model name is required', { status: 400 })
    }
    if (!shortCode) {
      return new NextResponse('Model status is required', { status: 400 })
    }
    if (!shortVin) {
      return new NextResponse('Model status is required', { status: 400 })
    }
    if (!vehicleModelId) {
      return new NextResponse('Vehicle Model type id is required', {
        status: 400
      })
    }

    const submodel = await prismadb.vehicleSubModel.update({
      where: {
        id: params.subModelId
      },
      data: {
        name,
        shortCode,
        shortVin,
        status,
        vehicleModelId
      }
    })
    return NextResponse.json(submodel, { status: 200 })
  } catch (error) {
    console.log('[SUBMODEL_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
