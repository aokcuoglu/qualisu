import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, status, groups } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const control = await prisma.control.create({
      data: {
        name,
        status,
        groups: {
          connect: groups.map((group: string) => ({ id: group }))
        }
      }
    })

    return NextResponse.json(control)
  } catch (error) {
    console.log('[CONTROLS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
