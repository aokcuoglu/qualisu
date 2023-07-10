import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const POST = async (request: Request) => {
  const body = await request.json()
  const { name, status, vType, image } = body

  const vehicle = await prisma.vehicleModel.create({
    data: {
      name: name,
      image: image,
      status: status.id,
      vehicleTypeId: vType.id
    }
  })

  return NextResponse.json(vehicle)
}
