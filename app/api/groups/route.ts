import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }
    if (!name) {
      return new NextResponse('Group name is required', { status: 400 })
    }

    const group = await prisma.group.create({
      data: {
        name
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[GROUPS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return NextResponse.json(groups)
  } catch (error) {
    console.log('[GROUPS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
