import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
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

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        shortCode,
        shortVin,
        status,
        modelId
      }
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.log('[VEHICLE_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const vehicle = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.log('[VEHICLE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
