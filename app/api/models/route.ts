import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, status, groupId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const group = await prisma.model.create({
      data: {
        name,
        status,
        // image,
        groupId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[MODELS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const models = await prisma.model.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(models)
  } catch (error) {
    console.log('[GROUPS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
