import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, status } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const fSources = await prisma.failureSource.create({
      data: {
        name,
        status
      }
    })

    return NextResponse.json(fSources)
  } catch (error) {
    console.log('[FSOURCES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
