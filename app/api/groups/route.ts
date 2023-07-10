import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prisma'

export const POST = async (request: Request) => {
  const body = await request.json()
  const { name, status, vType, imageSrc } = body

  const vehicle = await prisma.vehicleModel.create({
    data: {
      name: name,
      image: imageSrc,
      status: status.id,
      vehicleTypeId: vType.id
    }
  })

  return NextResponse.json(vehicle)
}
