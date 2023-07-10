import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    if (!params.vehicleId) {
      return new NextResponse('Vehicle id is required', { status: 400 })
    }

    const vehicle = await prismadb.vehicle.findUnique({
      where: {
        id: params.vehicleId
      }
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.log('[VEHICLE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.vehicleId) {
      return new NextResponse('Vehicle id is required', { status: 400 })
    }

    const submodel = await prismadb.vehicle.delete({
      where: {
        id: params.vehicleId
      }
    })

    return NextResponse.json(submodel)
  } catch (error) {
    console.log('[VEHICLE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { vehicleId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, shortCode, shortVin, status, modelId } = body

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
    if (!modelId) {
      return new NextResponse('Vehicle Model type id is required', {
        status: 400
      })
    }

    const submodel = await prismadb.vehicle.update({
      where: {
        id: params.vehicleId
      },
      data: {
        name,
        shortCode,
        shortVin,
        status,
        modelId
      }
    })
    return NextResponse.json(submodel, { status: 200 })
  } catch (error) {
    console.log('[VEHICLE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
