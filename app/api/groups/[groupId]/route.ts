import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body = await request.json()
  const { name, image } = body

  const vehicleType = await prisma.vehicleType.update({
    where: {
      id: params.id
    },
    data: {
      name: name,
      image: image
    }
  })
  return NextResponse.json(vehicleType, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const vehicleType = await prisma.vehicleType.delete({
    where: {
      id: params.id
    }
  })
  return NextResponse.json(vehicleType, { status: 200 })
}
