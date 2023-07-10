import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { code, name, status, partTeamSlug } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const partGroup = await prisma.partGroup.create({
      data: {
        code,
        name,
        status,
        partTeamSlug
      }
    })

    return NextResponse.json(partGroup)
  } catch (error) {
    console.log('[PGROUPS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
