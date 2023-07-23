import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    const body = await req.json()
    const { shortCode, controlPointsId, status } = body

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    } else {
    }

    const control = await prisma.controls.create({
      data: {
        shortCode,
        username: user.username,
        controlPointsId,
        status,
        vehicleShortCode: shortCode.slice(0, 2)
      }
    })

    return NextResponse.json(control)
  } catch (error) {
    console.log('[CONTROL_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const controls = await prisma.controls.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(controls)
  } catch (error) {
    console.log('[CONTROLS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
