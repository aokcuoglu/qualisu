import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    if (!params.modelId) {
      return new NextResponse('Model id is required', { status: 400 })
    }

    const model = await prismadb.vehicleModel.findUnique({
      where: {
        id: params.modelId
      }
    })

    return NextResponse.json(model)
  } catch (error) {
    console.log('[MODEL_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.modelId) {
      return new NextResponse('Model id is required', { status: 400 })
    }

    const group = await prismadb.vehicleModel.delete({
      where: {
        id: params.modelId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[MODEL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, status, image, vehicleTypeId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!name) {
      return new NextResponse('Model name is required', { status: 400 })
    }

    if (!status) {
      return new NextResponse('Model status is required', { status: 400 })
    }

    if (!image) {
      return new NextResponse('Model image is required', { status: 400 })
    }

    if (!vehicleTypeId) {
      return new NextResponse('Vehicle type id is required', { status: 400 })
    }

    const model = await prismadb.vehicleModel.update({
      where: {
        id: params.modelId
      },
      data: {
        name,
        status,
        image,
        vehicleTypeId
      }
    })
    return NextResponse.json(model, { status: 200 })
  } catch (error) {
    console.log('[MODEL_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
