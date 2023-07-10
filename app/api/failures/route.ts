import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { code, name, status, partGroupId } = body

    const group = await prisma.failure.create({
      data: {
        code,
        name,
        partGroupId
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.log('[FAILURES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const models = await prisma.failure.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(models)
  } catch (error) {
    console.log('[FAILURES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
