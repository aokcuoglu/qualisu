import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, code, status, failureSourceId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const failure = await prisma.failure.create({
      data: {
        name,
        code,
        status,
        failureSourceId
      }
    })

    return NextResponse.json(failure)
  } catch (error) {
    console.log('[FAILURES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
