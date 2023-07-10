import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, code, status } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const partTeams = await prisma.partTeam.create({
      data: {
        name,
        code,
        status
      }
    })

    return NextResponse.json(partTeams)
  } catch (error) {
    console.log('[PTEAMS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
